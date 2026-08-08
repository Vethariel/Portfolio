# Decisiones

Registro de lo acordado. Si algo cambia, actualizar este archivo y anotar el “por qué” en una línea.

## Acordado

| Tema | Decisión | Motivo breve |
|------|----------|--------------|
| Dónde vive el portafolio | VPS + dominio propio | Marca, control, HTTPS, stats propias |
| Dónde viven los demos | Pages para estáticos; **Cadence + PixelGen en vivo en VPS** | Ajustar esos dos repos |
| Unificar demos + portafolio en un solo sitio | No, por ahora | El portafolio es hub; enlaza demo + repo |
| Analítica | Self-hosted (candidato: Umami) | Stats de visitas/uso sin Google Analytics |
| Forma del portafolio | Experiencia visual de videojuego | Anti “empresa de esclavos corporativos” |
| Vista / arte | Top-down **2D ilustrado** (no pixel); base negra crepuscular | Ver [arte.md](./arte.md) |
| Paleta | Negro + luces; acento **vinotinto**; **violeta** liminal/secundario | Crepúsculo ≠ purple SaaS |
| Personajes | 5 especies; tops/bottoms; color **10×4** en capas cuerpo/top/bottom por separado | Set en [arte.md](./arte.md); `localStorage` |
| Imoogi | Serpiente negra, cara dragón, cuernos | Distinto del reptil jugable |
| Grafo Quién soy | Blanco (ref. imagen existente) | No reabrir arte del árbol aquí |
| Tipografía | Dirección **manual** / hecha a mano | Historia + relación; familias al tener nombre |
| Vibe | Contar historia y **relación** con el visitante | No CV; el pasillo regala abalorio de dash |
| Hábitats | Elven forest = **centro del cluster** (puente a Quién soy); otros 4 en **anillo** conexos | Importancia Stitch Code |
| Layout mapa | Quién soy centro; hábitats **izquierda**; Arena **norte**; Stitch **derecha** | Todo radial al árbol+Imoogi |
| Minijuegos | FNF; Arcade; Deep dark; Scifi kanji vs IA; **Elven = cita Hilo → companion** | [minijuegos.md](./minijuegos.md) |
| Hilo en el hub | Cita: aprender algo (p. ej. **Woven**); memoria no-quiz; si fallas el cierre, Hilo triste y no acompaña | Unlock = **lore detrás de cada proyecto** |
| API keys visitante | **No** pedir keys (Gemini u otras) en el portafolio VPS | Ops + UX; contenido scripted |
| Zona Stitch (visión) | Demo del marco **scripted**; Hilo profundiza si es companion | Sin LLM del visitante |
| Motor | **Phaser** | Suficiente para top-down 2D + escenas |
| Nombre / callsign | **Aún no** | Se decide después |
| Fan clones en el hub | Incluir con **disclaimer** fan/educativo visible | Demo técnica ≠ IP propia |
| Alcance / ritmo | Cuatro regiones en alcance; ventana ~1 mes + Cursor | Prioridad a cerrar diseño (arte/feel después); no recortar zonas por miedo a scope |
| Migrar demos al VPS | No en esta etapa | No aporta si son estáticos |

## Explícitamente fuera (por ahora)

- Pedir API keys (Gemini u otras) al visitante del portafolio
- Scaffold / código de la app (aún en fase docs / diseño)
- Migrar proyectos de Pages al VPS (salvo Cadence/PixelGen demos vivas)
- Multijugador, inventarios tipo MMO, quests largas de RPG abierto
- CMS o blog
- Google Analytics u otros trackers corporativos
- Fan clones presentados como producto original (sin disclaimer)
