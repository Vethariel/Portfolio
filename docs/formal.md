# Sitio formal (pista activa)

La experiencia-juego queda **pausada** (docs de mundo/minijuegos/arte-juego siguen como referencia futura).  
Pista actual: **portafolio formal** con firma visual = **piel de serpiente procedural en movimiento**.

## Firma visual

- Textura **procedural** (no foto/tile estático): escamas tipo serpiente.
- **Animada**: flujo / deslizamiento suave (Imoogi / identidad, sin ser el juego).
- Encaje formal: fondo o plano dominante; tipografía y contenido legibles encima (contraste, overlay, blur local si hace falta).

## Stack recomendado

| Capa | Elección | Por qué |
|------|----------|---------|
| App | **Vite + React + TypeScript** | Pista de prueba activa |
| 3D / shader | **React Three Fiber** (+ Three.js) | Fullscreen quad + `ShaderMaterial` |
| Shaders | **GLSL** (Worley/Voronoi + flujo) | Escamas procedurales en movimiento |
| Estilos | CSS nativo + variables | Formal, sin UI kit genérico |
| Deploy | `vite build` → estático en **VPS** | Como la arquitectura general |

Prototipo en el repo: `npm run dev` → fondo snake skin + shell formal mínimo.

### Alternativa (si el formal debe ser más estático)

**Astro** + isla Three.js — menos JS por defecto; se puede migrar el shader después.

### Qué no meter (en esta pista)

- Phaser (es para la pista juego, pausada)
- Pedir API keys al visitante
- CMS pesado

## Forma del shader (orientación)

Fullscreen triangle/quad; fragment shader:

1. Dominio UV + **domain warp** lento en el tiempo  
2. **Rombos intercalados** (rejilla escalonada + SDF de rombo redondeado) — no Voronoi  
3. Trellis de rombos grandes (bordes oscuros) + sombreado por escama  
4. Paleta de referencia: verdes lima/musgo + negro (ajustable)  

Ref. visual: `docs/refs/dragon-scales-ref.png`.  

Opcional: `prefers-reduced-motion` → textura estática o animación mínima.

## Contenido formal (borrador de secciones)

Una composición clara (no dashboard): marca/nombre, breve quién eres, proyectos (del inventario), contacto.  
La serpiente es atmósfera; no compite con el copy.

Inventario de proyectos: [proyectos.md](./proyectos.md).

## Relación con la pista juego

| Pista juego (pausada) | Pista formal (ahora) |
|-----------------------|----------------------|
| Phaser, hub, Hilo, arena… | Astro + Three shader |
| Docs mundo/minijuegos… | Este doc + decisiones formales |

Se puede retomar el juego después sin tirar el formal (rutas distintas o subdominio más adelante).
