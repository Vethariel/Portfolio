# Arte y feel

Dirección visual del portafolio. **Discusión en curso** — no assets finales.

Complementa [mundo.md](./mundo.md) y [experiencia.md](./experiencia.md).

## Acordado (borrador fuerte)

| Eje | Dirección |
|-----|-----------|
| Vista | Top-down |
| Técnica de look | **2D ilustrado** (no pixel art; no 3D top-down como base) |
| Personajes | **Avatares animales con ropa y color** |
| Jugador | Gato/perro/oso/ave/reptil + top/bottom; 1ª visita; `localStorage`; cambiable |
| Base del mundo | **Negro casi puro** + juego de luces |
| Atmósfera | **Crepuscular** — umbral entre día y noche; no neon cyber, no oficina blanca |
| Acentos | **Vinotinto / rojo vino** como acento principal; **violeta** como secundario / magia / umbral |

## Lectura de la paleta

```text
Negro (vacío, pasillo, silencio)
    + luces puntuales (faroles, ojos, portales, UI)
        → vinotinto (sangre fría, tela, sellos, peligro contenido)
        → violeta (umbral, Imoogi, Stitch, lo “en devenir”)
```

Crepuscular aquí significa: **poco se ve, lo que se ve importa**. El negro no es “dark mode SaaS”; es escenario. Las luces guían exploración y jerarquía (dónde mirar, qué es interactuable).

### Vinotinto vs violeta

- **Vinotinto** — ancla emocional y material (ropa, banners, sangre de arena, sellos en el Este). Más raro en “AI landings”; conviene que sea el acento que más se note.
- **Violeta** — reservarlo a lo liminal (Imoogi, nodos del grafo, Stitch, portales). Si satura todo, se parece al default púrpura genérico; si es **escaso y brillante sobre negro**, es crepúsculo, no template.

Evitar: gradientes púrpura→índigo sobre blanco/crema; glow morado tipo startup.

## Avatares animales + ropa

Encaja con tono anti-corporativo (no trajes de stock photo) y con hospitalidad de Stitch (apariencia leve al usuario).

Usos tentativos:

| Quién | Forma |
|-------|--------|
| Jugador | Una de **5 especies** + ropa/color en creación breve |
| NPCs / habitantes | Animales vestidos; indumentaria por rol/zona |
| Imoogi | Serpiente **negra**, cara de **dragón**, **cuernos** — otra silueta/escala que el reptil jugable |
| Agente Stitch | Puede ser animal-tutor o figura de marco; distinto del Imoogi |
| Grafo Quién soy | **Blanco** (arte de referencia ya definido en imagen aparte) |

**Especies (cerradas):**

| # | Especie | Notas de silueta (top-down) |
|---|---------|------------------------------|
| 1 | Gato | Compacto, cola legible |
| 2 | Perro | Similar escala al gato; hocico / orejas |
| 3 | Oso | Más volumen; lectura “tanque” amable |
| 4 | Ave | Bipedal / pico; silueta distinta en planta |
| 5 | Reptil | Baja o alargada; contraste con mamíferos y ave |

Imoogi **no** es la opción “reptil” del jugador: el reptil jugable es avatar vestido; el Imoogi es criatura mítica de otra escala.

### Ropa (slots)

Independiente de la especie (todas pueden combinar top + bottom).

| Slot | Opciones |
|------|----------|
| **Top** | Camisa, traje, tank top, hoodie |
| **Bottom** | Pantalón corto, pantalón largo, falda |

Color: **grid** compartido (abajo). Capas **por separado**: cuerpo (piel/pelaje/pluma) + top + bottom — cada una elige una celda del mismo grid.

### Color (grid) — set cerrado

UI: grid **10 filas (colores) × 4 columnas (tonos)** → 40 swatches.

**Tonos** (columnas, de más oscuro a más claro):

| id | Nombre | Rol |
|----|--------|-----|
| `t0` | Sombra | Casi negro cromático; se funde con el crepúsculo |
| `t1` | Baja | Oscuro legible sobre negro del mapa |
| `t2` | Media | Lectura principal en top-down |
| `t3` | Clara | Highlight / contraste (no blanco puro salvo Hueso) |

**Colores** (filas) — elegidos para el mundo negro/vinotinto/violeta, sin neones de juguete:

| id | Nombre | Familia | Hex de referencia (`t2` Media) | Notas |
|----|--------|---------|--------------------------------|-------|
| `ink` | Tinta | Neutro frío | `#1A1A1F` | Cuerpo “sombra”; ropa stealth |
| `ash` | Ceniza | Gris | `#6B6560` | Neutro cálido |
| `bone` | Hueso | Claro | `#E6DCC8` | Contraste fuerte sobre negro |
| `wine` | Vinotinto | Acento mundo | `#6B1E2E` | Acento de marca del portafolio |
| `ember` | Ascua | Rojo-naranja | `#A33B2A` | Más cálido que vinotinto; arena |
| `ochre` | Ocre | Amarillo tierra | `#B08A3C` | Crepúsculo; no amarillo candy |
| `moss` | Musgo | Verde apagado | `#3D5C45` | Hábitats / calma |
| `dusk` | Anochecer | Azul noche | `#2F3F5C` | Pasillo, frío |
| `violet` | Violeta | Liminal | `#5C3D6E` | Imoogi / Stitch / umbral |
| `teal` | Teal humo | Verde-azul | `#2F4F4F` | Quinto cromático distinto; evita arcoíris infantil |

Hex de `t0`–`t3` por fila: al implementar, derivar de `t2` (oscurecer / desaturar → `t0`–`t1`; aclarar con cuidado → `t3`). La tabla de Media es la ancla.

**Capas tintables (separadas):**

| Capa | Qué pinta |
|------|-----------|
| Cuerpo | Piel / pelaje / pluma / escamas de la especie |
| Top | Camisa, traje, tank top o hoodie |
| Bottom | Corto, largo o falda |

Cada capa = `{ colorId, toneId }` en `localStorage`.

### Flujo de avatar

1. **Primera visita** → especie + top + bottom + color de **cuerpo**, **top** y **bottom** (grid 10×4).
2. Persistencia en **`localStorage`** (sin cuenta).
3. **Cambiar después** (espejo / guardarropa en hub u overlay de pausa).
4. Revisitas: saltar creador si ya hay avatar guardado.

## Luces (feel de gameplay)

Sobre negro:

- Pasillo: poucos haces, frases casi susurradas en luz.
- Centro: grafo **blanco** + Imoogi (serpiente negra, cara dragón, cuernos) como presencia.
- Izquierda: **Elven forest** (hub) + anillo Arcade / Deep dark / Tropical techno / Scifi neon.
- Arena: vinotinto más agresivo; patrones del jefe = lectura de luces/ataques.
- Stitch / con Hilo: más luz y detalle; sin Hilo: legible pero más “indicativo”.

## Tipografía

Dirección: **manual / hecha a mano** (display con trazo humano; UI puede ser la misma familia o una pareja legible, no geométrica fría).  
Encaje con vibe: historia + relación, no dashboard.  
Familias concretas: cuando haya **nombre/callsign** (aún abierto).

## Qué falta cerrar en arte

- [x] Render: **2D ilustrado**
- [x] Jugador: especies + tops + bottoms + **grid 10×4**; capas **cuerpo / top / bottom** por separado
- [x] Set de colores avatar (10×4)
- [x] Imoogi: serpiente negra, cara dragón, cuernos
- [x] Grafo Quién soy: blanco (ref. externa)
- [x] Tipografía: vibe **manual** (familias al tener nombre)
- [ ] UI exacta del grid y del “cambiar después”
- [ ] HUD: material
- [ ] Moodboard / referencias de hábitats (arcade / deep dark / tropical techno / scifi neon / elven forest)
- [ ] Tabla hex completa t0–t3 por color (al prototipar)
- [ ] Nombre / callsign (bloquea display type final)
