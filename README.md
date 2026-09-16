# Daniel Gracia · Vethariel

Formal portfolio surface: a **live procedural snake skin** (GLSL) behind work that centers on creative and interactive systems — teaching tools, real-time graphics, and software people can inhabit.

**Live:** [vethariel.github.io/Portfolio](https://vethariel.github.io/Portfolio/)

## Featured

| Project | What | Links |
|:--|:--|:--|
| **Stitch Code** | Educational IDE around Woven (Python / Java / C++ convergence), text · blocks · verbose | [Repo](https://github.com/Vethariel/StitchCode) · [Live](https://vethariel.github.io/StitchCode/) |
| **DinoJam** | Interactive T-Rex show: clips, shader themes, audio-synced cues | [Repo](https://github.com/Vethariel/DinoJam) · [Live](https://vethariel.github.io/DinoJam/) |

The page skin is the same impulse as those pieces: procedural, real-time, meant to be felt.

## Stack

- **App:** Vite · React · TypeScript  
- **Skin:** React Three Fiber · Three.js · custom fragment shader  
- **Deploy:** GitHub Actions → GitHub Pages  

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://127.0.0.1:5173`). Local `base` is `/` (no `/Portfolio` prefix).

```bash
npm run build    # typecheck + production build
npm run preview  # serve dist locally
```

Pages builds set `GITHUB_PAGES=true` so asset paths use `/Portfolio/`.

## Deploy (GitHub Pages)

Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)

1. Push to `main` (or run **Actions → Deploy GitHub Pages → Run workflow**).  
2. Repo **Settings → Pages → Source:** GitHub Actions.  
3. Site: `https://vethariel.github.io/Portfolio/`

## Contact

- [GitHub](https://github.com/Vethariel)  
- [LinkedIn](https://www.linkedin.com/in/vethariel/)  
- dagraciap@unal.edu.co  

---

*Precision builds structure. Propagation builds impact. Persistence builds meaning.*
