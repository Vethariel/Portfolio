# Inventario de proyectos presentables

Lista candidata para el hub del portafolio. Orden de la tabla = orden en que los pasaste; **el orden del hub sigue abierto**.

Leyenda **demo**:

| Valor | Significado |
|-------|-------------|
| Pages (confirmado en README) | URL de GitHub Pages documentada en el repo |
| Pages (probable) | Hay `index.html` / build estático; URL convencional `vethariel.github.io/<repo>/` — verificar |
| Repo / local | No hay demo web pública útil; se muestra repo (y notebook/app local si aplica) |
| Backend | No es solo estático; hace falta API/servidor (no encaja solo con “enlazar Pages”) |

Leyenda **nota**:

- **Fan / IP** — clon o assets de IP ajena; presentable como demo técnica + disclaimer, no como producto propio.
- **Original** — concepto/código propio (aunque use assets CC de terceros).
- **Académico** — entrega de diplomado / curso.

---

## Tabla

| # | Proyecto | Blurb corto | Stack | Demo | Repo | Tipo | Nota |
|---|----------|-------------|-------|------|------|------|------|
| 1 | Angry Birds (fan) | Clon educativo: honda, física 2D, materiales, niveles | p5.js, Matter.js, ES modules | Pages / CNAME en repo — **verificar URL** | [Angry_Birds](https://github.com/Vethariel/Angry_Birds) | Juego | Fan / IP (Rovio) |
| 2 | Uncover | Mina nórdica tipo Bomberman: linterna, bombas, pico, forja, historia | Phaser 3, Vite, Vitest | [Play](https://vethariel.github.io/Uncover2/) | [Uncover2](https://github.com/Vethariel/Uncover2) | Juego | Original |
| 3 | Super Bomberman 4 Clone | Clon web SB4: 2 niveles, BT de enemigos, power-ups | p5.js, Tiled, ES modules | [Play](https://vethariel.github.io/SuperBomberman4Clone/) | [SuperBomberman4Clone](https://github.com/Vethariel/SuperBomberman4Clone) | Juego | Fan / IP (Konami) |
| 4 | BeachHouse | Casa de playa 3D modular: catálogo, fases de construcción, visor web | Three.js, Python/uv (pipeline) | Pages (probable) | [BeachHouse](https://github.com/Vethariel/BeachHouse) | Visor 3D / tooling | Original |
| 5 | Stitch Code | IDE educativo: lenguaje Woven, bloques/texto, tutor Hilo (Gemini), Pyodide | ANTLR, Pyodide, JS | Pages (probable) | [StitchCode](https://github.com/Vethariel/StitchCode) | Edu / lenguaje | Original |
| 6 | Cadence | Composición musical para juegos: agente LangGraph → `.rsong` + UI React | FastAPI, LangGraph, React | **Demo en vivo (VPS)** — a ajustar | [Cadence](https://github.com/Vethariel/Cadence) | Tooling / AI | Original |
| 7 | Pathway | Horror FPS: pasillo infinito, niebla, linterna, persecución | Three.js, Vite | [Play](https://vethariel.github.io/Pathway/) | [Pathway](https://github.com/Vethariel/Pathway) | Juego | Original (+ assets CC) |
| 8 | DinoJam | Visor T-Rex interactivo: clips, temas shader, show con audio | Three.js | Pages (probable) | [DinoJam](https://github.com/Vethariel/DinoJam) | Visor 3D | Original (+ modelo CC BY) |
| 9 | Kanji CNN | Reconocimiento de kanji con CNN (entrega MLDS5) | Notebook / ML | Repo / notebook | [MLDS5_Kanji…](https://github.com/Vethariel/MLDS5_Kanji_Recognition_CNN) | ML | Académico; sin demo web |
| 10 | PixelGen (Diffusion) | Difusión DDPM para pixel art 16×16; AD3 vs AD6 + Gradio | Python, DDPM, Gradio, DVC | **Demo en vivo (VPS)** — a ajustar | [MLDS6_Diffusion…](https://github.com/Vethariel/MLDS6_Diffusion_Project) | ML | Académico (mayoritariamente propio); demo en vivo prevista |

---

## Por encaje con la arquitectura actual

Arquitectura acordada: portafolio en VPS enlaza demos en **GitHub Pages** cuando son estáticas. Ver [arquitectura.md](./arquitectura.md).

### Encajan bien como hotspot → demo Pages

- Uncover2, SuperBomberman4Clone, Pathway, Angry_Birds (URL a confirmar), BeachHouse, DinoJam, Stitch Code (Pages probable)

### Demos en vivo en VPS (a ajustar)

- Cadence (Tropical techno)
- PixelGen / MLDS6 (Scifi neon)

### Solo repo / notebook por ahora

- MLDS5 Kanji (salvo que más adelante haya demo)
### Cuidado al presentar en el hub

- **Angry Birds** y **Super Bomberman 4**: **incluir** en el hub con disclaimer fan/educativo visible; no venderlos como IP propia.  
- **MLDS6 / PixelGen**: no hace falta acreditar equipo en el hub; el trabajo es mayoritariamente tuyo (commits del repo). El README upstream puede seguir listando nombres de curso — eso no obliga crédito en el portafolio.  
- **Stitch Code** (Pages): puede pedir Gemini en *su* demo; el **portafolio hub no pide keys**. Hilo en el hub es companion scripted tras la cita en Elven forest.

---

## Agrupación por hábitats del Este

| Hábitat | Proyectos |
|---------|-----------|
| **Arcade** | Angry Birds, Super Bomberman 4 |
| **Deep dark** | Uncover, Pathway |
| **Tropical techno** | BeachHouse, DinoJam, Cadence |
| **Scifi neon** | Kanji CNN, PixelGen (MLDS6) |
| **Elven forest** | Centro del cluster de hábitats; puente a Quién soy | **Stitch Code** |

**Elven forest** = hábitat hub + vitrina del producto Stitch Code.  
**Zona Stitch** (derecha del mapa) = marco/visión. Layout: [mundo.md](./mundo.md).

### Demos en vivo (VPS)

| Proyecto | Destino |
|----------|---------|
| Cadence | Ajustar para **demo en vivo** en VPS |
| PixelGen (MLDS6) | Ajustar para **demo en vivo** en VPS |

El resto de demos jugables/estáticos pueden seguir en GitHub Pages salvo decisión contraria. Ver [arquitectura.md](./arquitectura.md).

---

## Pendiente sobre este inventario

- [ ] Confirmar URLs live de Angry_Birds (CNAME), BeachHouse, StitchCode, DinoJam  
- [x] Mapear proyectos → hábitats (+ Elven forest hub)  
- [x] Cadence + MLDS6 → demos en vivo (ajustar)  
- [ ] Blurb / lore in-game por proyecto  
- [x] Fan clones: incluir con disclaimer  
- [ ] Detalle de deploy Cadence / PixelGen en el VPS (paths, deps, GPU si aplica)
