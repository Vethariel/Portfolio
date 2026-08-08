# Mundo y sentimiento

Visión del espacio jugable del portafolio. **Documentación / discusión** — no implementación.

Complementa [experiencia.md](./experiencia.md) y se apoya en [proyectos.md](./proyectos.md).

## Sentimiento buscado

- Exploración **top-down**, atmósfera más que pitch.
- **2D ilustrado** (no pixel art) — ver [arte.md](./arte.md).
- Entrada **oscura y ritual**: negro + luces crepusculares; no lobby corporativo.
- Anti “empresa de esclavos”: el mundo no vende productividad; invita a caminar, mirar y elegir.
- **Vibe central:** contar una **historia** y **establecer relación** con el visitante (no exhibir un CV). El pasillo ya regala vínculo (abalorio de dash).

Motivo narrativo fuerte: **Imoogi** (serpiente negra con cara de dragón y cuernos) en “quién soy”.  
Motivo de visión: **Stitch** (marco) ≠ **Stitch Code** (un producto construido bajo ese marco).

## Arco de llegada

```text
Spawn (hub oscuro) + creación de avatar (1ª visita)
    → al entrar al pasillo: reciben abalorio de dash
    → pasillo (frases + música — textos para después)
        → umbral
            → zona principal (cuatro regiones)
```

El pasillo es el “primer viewport” emocional: marca/atmósfera y **primer regalo de relación**.  
Textos del pasillo: **aplazados** (se definen en otro paso).

## Zona principal — layout

```text
                         [ Arena — Norte ]
                                │
                                │
    [ cluster hábitats ] ── [ Quién soy ] ── [ Stitch visión — Derecha ]
         (izquierda)        árbol blanco
                            + Imoogi
```

| Dirección desde Quién soy | Región |
|---------------------------|--------|
| **Centro** | Árbol/grafo blanco + Imoogi |
| **Izquierda** | Cluster de hábitats (Qué he hecho) |
| **Norte** | Arena |
| **Derecha** | Stitch (visión / marco) |

Arena y Stitch conectan al **centro** (árbol + Imoogi).  
El pasillo/umbral desemboca en Quién soy (detalle de spawn exacto: abierto).

### Cluster de hábitats (izquierda)

**Elven forest** es un hábitat, pero **especial**: es el **centro del cluster** (importancia de Stitch Code).  
Es el **único** que conecta **directamente** a Quién soy.

Los otros cuatro viven **alrededor** de Elven forest en anillo, con caminos entre sí y hacia el forest:

```text
                    [ Arcade ]
                       ╱    ╲
        [ Deep dark ] ── [ Elven forest ] ── [ Scifi neon ]
                       ╲    ╱         │
              [ Tropical techno ]     │
                                      └──► Quién soy (única salida del cluster al centro)
```

(Orden angular exacto del anillo: ajustable; lo fijo es **anillo + hub Elven forest → Quién soy**.)

| Región | Rol | Qué responde |
|--------|-----|--------------|
| **Centro — Quién soy** | Grafo + Imoogi | ¿Quién eres (en lo visible)? |
| **Izquierda — Hábitats** | Trofeos / minijuegos | ¿Qué construiste? |
| **Norte — Arena** | Jefe en vivo | ¿Qué se siente indagar? |
| **Derecha — Stitch** | Demo del marco | ¿Hacia dónde apuntas? |

Lectura en bloque: Hecho / Soy / Arena=experiencia / Stitch=visión.

### 1) Centro — Quién soy

- **Árbol/grafo blanco** (arte de referencia ya definido — no reabrir aquí).
- **Imoogi:** serpiente **negra**, cara de **dragón**, **cuernos**; dialoga poco, **sin oversharing**.
- Espejo parcial: lo no dicho también es diseño.
- Nodos de conexión: pasillo/umbral, Arena (N), Stitch (E), Elven forest (O).

### 2) Hábitats — Qué he hecho (izquierda)

- Interacciones: **1 minijuego por hábitat** en modal — [minijuegos.md](./minijuegos.md). Trofeos siguen siendo fichas demo/repo por proyecto.
- **Elven forest** = hábitat hub + vitrina de **Stitch Code** (producto).
- **Zona Stitch** (derecha) = marco/visión; no mezclar con Elven forest.

| Hábitat | Rol en el grafo | Proyectos |
|---------|-----------------|-----------|
| **Elven forest** | Centro del cluster; puente a Quién soy | Stitch Code |
| **Arcade** | Anillo | Angry Birds, Super Bomberman 4 |
| **Deep dark** | Anillo | Uncover, Pathway |
| **Tropical techno** | Anillo | BeachHouse, DinoJam, Cadence |
| **Scifi neon** | Anillo | Kanji CNN, PixelGen |

Inventario: [proyectos.md](./proyectos.md).

### 3) Arena — Norte (experiencia)

Premio a quien **indaga e interactúa más**:

1. Exploración → **armadura y abalorios** (defensa / pasivas / look). El **abalorio de dash** se otorga **solo por entrar al pasillo** (primer vínculo).
2. Al pelear → **elección de arma**; poder ligado a biomas/minijuegos tocados.
3. El jefe se vuelve **más rico en patrones y comportamientos** cuanto más se indagó — no solo “más HP / más daño”.

Simbólicamente: indagar no es grind de XP; es **densidad de experiencia**. Quien solo mira de pasada puede pelear algo legible; quien recorrió hábitats ve un oponente más interesante.

Sigue siendo razonable tratarla como **opcional** para quien solo quiere ver proyectos, pero el diseño premia claramente la curiosidad.

### 4) Stitch — Derecha (visión / marco)

No es Elven forest. Es la **demo del marco Stitch**, conectada al centro (árbol + Imoogi).  
Stitch Code (producto) + rito de Hilo están en **Elven forest**.

Piezas deseadas (scripted, sin LLM del visitante):

| Pieza | Rol |
|-------|-----|
| **Árbol de notas** | Crece con la exploración / uso de herramientas |
| **Edificios = herramientas** | Potencian el grafo (ej. forja = combinar nodos) |
| **Hilo companion** | Si desbloqueado en Elven, **acompaña y profundiza** el recorrido (más lore/tips). Sin Hilo: zona **cercana pero indicativa** |
| **Apariencia leve** | Acoger al usuario (look), sin pedir keys |

### Sin API keys en el portafolio

- En el VPS **no** se pide Gemini ni ninguna API key al visitante.
- Hilo / Stitch / diálogos = **contenido propio / scripted** (playthrough único vía `localStorage`).
- La demo pública de Stitch Code en Pages puede seguir siendo otra cosa; el **hub** no depende de keys ajenas.

Metáfora de profundidad (ej. hornear pan): mismo lugar; sin Hilo solo lo indicativo; con Hilo, el oficio se entiende mejor. Ver [minijuegos.md](./minijuegos.md).

Relación con el semestre: zona = visión de IA en educación autónoma, jugable sin infra de keys.

Riesgos / acotes:

- No clonar Stitch Code completo.
- Diferenciar grafo **blanco** (Quién soy) vs árbol de notas Stitch.
- Balance: sin Hilo el portafolio debe valer la pena; con Hilo, **más denso**, no obligatorio para “ver proyectos”.

## Companion Hilo (sistema global)

```text
Elven forest (cita / conversación)
    → aprendes algo con Hilo (p. ej. sobre Woven)
    → al final demuestras lo aprendido (memoria, no quiz rígido; te puedes equivocar antes)
        → bien: Hilo companion ON → lore del detrás de cada proyecto
        → mal: Hilo triste → sin acompañamiento
```

| Sin Hilo | Con Hilo |
|----------|----------|
| Recorrido cercano pero **indicativo** | Mismas zonas + **lore** (detrás de cada proyecto) |

Woven = lenguaje de Stitch Code (convergencia Python + otros). Detalle cita: [minijuegos.md](./minijuegos.md).

## Alcance (postura)

Cuatro regiones en alcance. No se recorta por miedo a scope: hay ventana ~1 mes + Cursor.  
El riesgo real a vigilar en construcción es **orden** (arte/feel y bloques jugables), no “hacer menos zonas”.

## Equipamiento (borrador)

| Tipo | Dónde | Efecto tentativo |
|------|-------|------------------|
| **Abalorio de dash** | Al **entrar al pasillo** | Movimiento dash; primer gesto de relación |
| Otras armaduras / abalorios | Hábitats, rincones | Defensa, pasivas, look |
| Arma | Elección al entrar a la Arena | Poder según biomas |
| (Stitch) nodos / notas | Solo dentro de la zona Visión | No son loot de combate; son conocimiento del árbol |

## Relación con profundidad B–C

Exploración + diálogos + minijuegos + jefe con patrones + micro-demo de visión.  
Sigue sin ser un RPG abierto: un mapa, cuatro roles claros, pelea y demo acotadas.  
Motor contemplado: **Phaser**.

## Pendiente de sentimiento / diseño

- [x] Layout; hábitats; demos vivas Cadence/PixelGen
- [x] Minijuegos biomas + Elven = cita Hilo → companion
- [x] Sin API keys del visitante
- [x] Cita: aprender (p. ej. Woven); memoria no-quiz; fallo → Hilo triste; unlock = lore por proyecto
- [ ] Guion de la cita; lore-lines por proyecto
- [ ] Textos del pasillo (**después**)
- [ ] Rewards Arena / skip / chart FNF
- [ ] Arena: entrada libre vs tras umbral
- [ ] Nombre / callsign (**aún no**)
- [ ] Orden angular del anillo (opcional)
- [ ] Reintento de cita