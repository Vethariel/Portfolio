import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import './App.css'

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uReducedMotion;
uniform float uScroll;

varying vec2 vUv;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// ~N(0,1) from two uniform hashes (Box–Muller)
float gaussianHash(vec2 p) {
  float u1 = max(hash21(p), 1e-6);
  float u2 = hash21(p + vec2(19.19, 47.47));
  return sqrt(-2.0 * log(u1)) * cos(6.2831853 * u2);
}

// Spatially smooth field: Gaussian samples on a lattice, hermite-interpolated
float gaussianNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = gaussianHash(i);
  float b = gaussianHash(i + vec2(1.0, 0.0));
  float c = gaussianHash(i + vec2(0.0, 1.0));
  float d = gaussianHash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float patchField(vec2 p) {
  // 2 octaves; values are ~Gaussian so remap to [0,1] patches
  float n = gaussianNoise(p) * 0.7 + gaussianNoise(p * 2.15 + 3.1) * 0.3;
  float amt = clamp(n * 0.45 + 0.5, 0.0, 1.0);
  // Lower thresholds = more scales painted, same spatial frequency
  return smoothstep(0.28, 0.62, amt);
}

void main() {
  // Sticky viewport: offset UV with scroll so skin moves up with the page
  float minDim = min(uResolution.x, uResolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / minDim;
  uv.y -= uScroll / minDim;

  float cellW = 0.050;
  float cellH = 0.028;
  float stagger = 0.5;

  vec2 grid = vec2(uv.x / cellW, uv.y / cellH);
  float rowGuess = floor(grid.y);
  float colGuess = floor(grid.x - rowGuess * stagger);

  float hw = 0.5;
  float hh = 2.0;

  float chosenMd = 1e5;
  float chosenRow = -1e9;
  float chosenCol = 0.0;
  bool hit = false;

  float anim = uTime * mix(0.40, 0.0, uReducedMotion);
  float rowPhase = 0.28;
  float colPhase = 0.12;

  float hwUV = hw * cellW;
  float hhUV = hh * cellH;

  for (int j = -3; j <= 3; j++) {
    for (int i = -2; i <= 2; i++) {
      float row = rowGuess + float(j);
      float col = colGuess + float(i);
      vec2 center = vec2((col + 0.5) + row * stagger, row + 0.5);
      float phase = row * rowPhase + col * colPhase;
      float wave = sin(anim + phase);
      // Ligera traslación en UV (misma fase que la rotación)
      vec2 driftUV = vec2(0.006 * wave, 0.0035 * sin(anim * 0.85 + phase + 1.1));
      vec2 local = grid - center;
      vec2 localUV = vec2(local.x * cellW, local.y * cellH) - driftUV;
      float ang = radians(15.0) * wave;
      float ca = cos(ang);
      float sa = sin(ang);
      vec2 lr = vec2(localUV.x * ca - localUV.y * sa, localUV.x * sa + localUV.y * ca);

      float md = pow(abs(lr.x) / hwUV, 1.35) + pow(abs(lr.y) / hhUV, 1.35);
      if (md <= 1.0) {
        if (!hit || row > chosenRow || (row == chosenRow && md < chosenMd)) {
          hit = true;
          chosenRow = row;
          chosenCol = col;
          chosenMd = md;
        }
      }
    }
  }

  float inside = float(hit);
  float bulge = max(0.0, 1.0 - chosenMd);

  // One tone per scale; patch field drifts slowly so clusters migrate over time
  vec2 scaleCenterUV = vec2(
    ((chosenCol + 0.5) + chosenRow * stagger) * cellW,
    (chosenRow + 0.5) * cellH
  );
  vec2 patchUv = scaleCenterUV * 6.5 + vec2(anim * 0.16, anim * 0.11);
  float patchAmt = patchField(patchUv);
  float scaleRnd = hash21(vec2(chosenCol, chosenRow));
  float wineAmt = clamp(patchAmt * 0.95 + scaleRnd * 0.2 - 0.05, 0.0, 1.0);
  wineAmt = smoothstep(0.08, 0.75, wineAmt);

  vec3 voidCol = vec3(0.04, 0.035, 0.035);
  vec3 black = vec3(0.02, 0.015, 0.015);
  // Patch fill (darker); border keeps the previous wine
  vec3 patchDeep = vec3(0.08, 0.018, 0.03);
  vec3 patchBright = vec3(0.18, 0.035, 0.055);
  vec3 wine = vec3(0.48, 0.08, 0.14);
  vec3 wineBright = vec3(0.62, 0.12, 0.18);

  // Flat fill: single average tone for the whole rhombus
  vec3 fillWine = mix(patchDeep, patchBright, wineAmt);
  vec3 fill = mix(black, fillWine, wineAmt);

  float border = inside * (1.0 - smoothstep(0.0, 0.1, bulge));
  vec3 borderCol = mix(wine, wineBright, wineAmt * 0.55);

  vec3 col = voidCol;
  col = mix(col, fill, inside);
  col = mix(col, borderCol, border);

  gl_FragColor = vec4(col, 1.0);
}
`

function SnakeSkinBackground({ reducedMotion }: { reducedMotion: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
      uScroll: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state) => {
    const mat = materialRef.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
    mat.uniforms.uScroll.value = window.scrollY * state.viewport.dpr
    mat.uniforms.uResolution.value.set(
      size.width * state.viewport.dpr,
      size.height * state.viewport.dpr,
    )
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

function canCreateWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false })
    return Boolean(gl)
  } catch {
    return false
  }
}

function FallbackSkin() {
  return <div className="bg-fallback" aria-hidden />
}

function BackgroundCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const [webglOk, setWebglOk] = useState(() =>
    typeof document === 'undefined' ? true : canCreateWebGL(),
  )

  if (!webglOk) return <FallbackSkin />

  return (
    <div className="bg-canvas" aria-hidden>
      <div className="bg-canvas-view">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
          onCreated={() => setWebglOk(true)}
          fallback={<FallbackSkin />}
        >
          <SnakeSkinBackground reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </div>
  )
}

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [webglOk] = useState(() =>
    typeof document === 'undefined' ? true : canCreateWebGL(),
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <div className="app">
      <BackgroundCanvas reducedMotion={reducedMotion} />
      <div className="read-scrim" aria-hidden />
      <main className="shell">
        <nav className="site-nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <header className="hero">
          <p className="eyebrow">UNAL · Systems Engineering · Open to opportunities</p>
          <h1>Daniel Gracia</h1>
          <p className="alias">Vethariel</p>
          <p className="lede">
            Systems engineer and generalist builder. I care about interfaces people
            can inhabit — learning tools, real-time graphics, procedural atmospheres,
            and software that stays clear when it meets a human.
          </p>
          <p className="skin-note">
            The moving scales behind this page are live GLSL — the same creative,
            interactive impulse as the work below.
          </p>
          <p className="cta-row">
            <a href="#work">See work</a>
            <a href="https://github.com/Vethariel" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/vethariel/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:dagraciap@unal.edu.co">Email</a>
          </p>
        </header>

        <section className="section section--work" id="work" aria-labelledby="featured">
          <h2 id="featured">Featured</h2>
          <p className="section-lede">
            Interactive pieces where code becomes presence — learning environments
            and real-time 3D, kin to the skin that frames this site.
          </p>
          <div className="featured">
            <article className="featured-item">
              <a
                className="featured-media"
                href="https://github.com/Vethariel/StitchCode"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${import.meta.env.BASE_URL}projects/stitchcode.png`}
                  alt="Stitch Code editor with Woven language tutorial"
                  width={1280}
                  height={720}
                  loading="lazy"
                />
              </a>
              <div className="featured-copy">
                <p className="case-label">Case · Education · Interaction</p>
                <h3>
                  <a
                    href="https://github.com/Vethariel/StitchCode"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Stitch Code
                  </a>
                </h3>
                <p className="case-line">
                  <strong>Problem.</strong> First-year programmers drown in syntax
                  differences across Python, Java, and C++.
                </p>
                <p className="case-line">
                  <strong>Built.</strong> An educational IDE around Woven — a
                  convergence language — with text, blocks, and verbose views, plus
                  a guided learning panel and AI tutoring hooks.
                </p>
                <p className="stack">ANTLR4 · Python · Woven · Pyodide · AI tutoring</p>
                <p className="cta-row case-cta">
                  <a
                    href="https://github.com/Vethariel/StitchCode"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repo
                  </a>
                  <a
                    href="https://vethariel.github.io/StitchCode/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </a>
                </p>
              </div>
            </article>

            <article className="featured-item">
              <a
                className="featured-media"
                href="https://github.com/Vethariel/DinoJam"
                target="_blank"
                rel="noreferrer"
              >
                <video
                  key={reducedMotion ? 'still' : 'play'}
                  src={`${import.meta.env.BASE_URL}projects/dinojam.mp4`}
                  autoPlay={!reducedMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={reducedMotion}
                  aria-label="DinoJam T-Rex viewer short clip"
                />
              </a>
              <div className="featured-copy">
                <p className="case-label">Case · Real-time 3D · Shaders</p>
                <h3>
                  <a
                    href="https://github.com/Vethariel/DinoJam"
                    target="_blank"
                    rel="noreferrer"
                  >
                    DinoJam
                  </a>
                </h3>
                <p className="case-line">
                  <strong>Problem.</strong> Static model viewers rarely feel like a
                  show — no timing, no material play, no soundtrack.
                </p>
                <p className="case-line">
                  <strong>Built.</strong> A browser T-Rex experience with animation
                  clips, shader themes, and a cue sequence locked to the music —
                  the same real-time craft as this page’s living skin.
                </p>
                <p className="stack">Three.js · GLSL · Web Audio</p>
                <p className="cta-row case-cta">
                  <a
                    href="https://github.com/Vethariel/DinoJam"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repo
                  </a>
                  <a
                    href="https://vethariel.github.io/DinoJam/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </a>
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section section--about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <p className="section-lede">
            Those pieces show the center of gravity: creative and interactive systems
            — if someone cannot feel the structure, the structure is unfinished.
          </p>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I study systems engineering at Universidad Nacional de Colombia.
                The profile is generalist by design: languages and teaching surfaces,
                real-time 3D and shaders, games, automation, and whatever craft a
                problem needs — always asking how it lands on the person inside it.
              </p>
              <p>
                ML and data work appear when they serve that aim, not as the brand.
                What stays constant is presence: procedural skins like the one
                behind this copy, tools you can play, systems you can follow.
              </p>
            </div>
            <aside className="about-aside" aria-label="Work philosophy">
              <blockquote>
                <span>Precision builds structure.</span>
                <span>Propagation builds impact.</span>
                <span>Persistence builds meaning.</span>
              </blockquote>
              <p className="aside-note">
                The triad behind Stitch Code, DinoJam, and the rest of the craft
                below.
              </p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="projects">
          <h2 id="projects">More projects</h2>
          <p className="section-lede">
            More of the same interests: playable worlds, teaching and ops software,
            and selected experiments where generation or analysis supports the
            experience — not the other way around.
          </p>
          <div className="projects-board">
            <div className="project-group">
              <h3>Interactive &amp; playable</h3>
              <p className="group-lede">
                Games, real-time scenes, and tools where timing and atmosphere
                matter as much as correctness.
              </p>
              <ul className="project-list">
                <li>
                  <a
                    className="name"
                    href="https://github.com/Vethariel/Uncover2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Uncover
                  </a>
                  <span className="desc">
                    Nordic mine Bomberman-like: lantern, bombs, forge, story —
                    atmosphere as gameplay.
                  </span>
                  <span className="stack">Phaser 3 · Vite</span>
                </li>
                <li>
                  <a
                    className="name"
                    href="https://github.com/Vethariel/Pathway"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pathway
                  </a>
                  <span className="desc">
                    Horror FPS corridor with fog and pursuit — real-time presence
                    in the same family as DinoJam.
                  </span>
                  <span className="stack">Three.js · Vite</span>
                </li>
                <li>
                  <a
                    className="name"
                    href="https://github.com/Vethariel/Cadence"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cadence
                  </a>
                  <span className="desc">
                    An agent that composes game music into .rsong — creative
                    tooling with a playable output.
                  </span>
                  <span className="stack">FastAPI · LangGraph · React</span>
                </li>
                <li>
                  <span className="name">SAFE</span>
                  <span className="desc">
                    Learning paths and certifications — institutional memory made
                    navigable, kin to Stitch Code’s teaching surface.
                  </span>
                  <span className="stack">Django · PostgreSQL</span>
                </li>
                <li>
                  <span className="name">Core Talent Genesis</span>
                  <span className="desc">
                    Recruitment automation and personnel analytics — process design
                    with people in the loop.
                  </span>
                  <span className="stack">AppSheet · Apps Script</span>
                </li>
              </ul>
            </div>
            <div className="project-group">
              <h3>Selected experiments</h3>
              <p className="group-lede">
                Occasional ML, NLP, and spatial work when the problem asks for it —
                kept in the toolkit, not on the masthead.
              </p>
              <ul className="project-list">
                <li>
                  <a
                    className="name"
                    href="https://github.com/Vethariel/MLDS6_Diffusion_Project"
                    target="_blank"
                    rel="noreferrer"
                  >
                    PixelGen
                  </a>
                  <span className="desc">
                    Diffusion for pixel art under scarce data — generative craft
                    as experiment.
                  </span>
                  <span className="stack">Keras · Diffusion · Gradio</span>
                </li>
                <li>
                  <span className="name">Steam Review Analysis</span>
                  <span className="desc">
                    NLP on ~500K reviews — structure in noisy player voice.
                  </span>
                  <span className="stack">Gensim · Scikit-learn · t-SNE</span>
                </li>
                <li>
                  <span className="name">Urban Park Accessibility — Bogotá</span>
                  <span className="desc">
                    Geospatial reading of environmental inequality in the city.
                  </span>
                  <span className="stack">GeoPandas · Folium · QGIS</span>
                </li>
                <li>
                  <span className="name">Employee Retention Prediction</span>
                  <span className="desc">
                    Turnover forecasting framed as an organizational story.
                  </span>
                  <span className="stack">Scikit-learn · Keras · Pandas</span>
                </li>
                <li>
                  <a
                    className="name"
                    href="https://github.com/Vethariel/MLDS5_Kanji_Recognition_CNN"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kanji CNN
                  </a>
                  <span className="desc">
                    Recognizing written form with CNNs — perception of symbols.
                  </span>
                  <span className="stack">Python · CNN · Notebook</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section section--meta" aria-labelledby="stack">
          <div className="meta-col">
            <h2 id="stack">Technical stack</h2>
            <p className="section-lede meta-lede">
              A generalist kit: real-time and interaction first, then languages,
              systems, and whatever analysis a brief needs.
            </p>
            <div className="stack-groups">
              <p>
                <strong>Interactive</strong>
                Three.js · R3F · GLSL · Phaser · Web Audio · ANTLR
              </p>
              <p>
                <strong>Languages</strong>
                Python · JavaScript · SQL
              </p>
              <p>
                <strong>Systems</strong>
                Flask · Django · Apps Script · GitHub Actions · Git
              </p>
              <p>
                <strong>Also used</strong>
                Pandas · Scikit-learn · Keras · PyTorch · GeoPandas · Plotly
              </p>
            </div>
          </div>
          <div className="meta-col">
            <h2 id="certs">Certifications</h2>
            <p className="section-lede meta-lede">
              Supporting credentials — useful depth, not the definition of the
              profile.
            </p>
            <ul className="cert-list">
              <li>
                <strong>IBM AI Engineering Professional Certificate</strong>
                <span className="meta">Coursera / IBM · Feb 2026</span>
                <span className="detail">
                  ML · Deep Learning · Generative AI · LLMs · Transformers · RAG ·
                  LangChain
                </span>
              </li>
              <li>
                <strong>Google Cloud Fundamentals: Core Infrastructure</strong>
                <span className="meta">Coursera / Google Cloud · Dec 2025</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p className="section-lede">
            If you want a generalist who builds toward presence — teaching tools,
            real-time pieces, procedural surfaces, clear systems — or a walkthrough
            of Stitch Code, DinoJam, and this page’s skin, write.
          </p>
          <p className="cta-row">
            <a href="mailto:dagraciap@unal.edu.co">dagraciap@unal.edu.co</a>
            <a href="https://github.com/Vethariel" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/vethariel/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
          {!webglOk && (
            <p className="hint">
              WebGL unavailable here — open in Chrome/Firefox to see the live skin
              that opens this story.
            </p>
          )}
        </section>

        <footer className="site-footer">
          <p>Daniel Gracia · Vethariel · {new Date().getFullYear()}</p>
          <p className="footer-note">
            From scales to systems: procedural skin in GLSL · Vite · R3F — the
            same line as the work above.
          </p>
        </footer>
      </main>
    </div>
  )
}
