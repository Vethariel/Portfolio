# Arquitectura (contemplada)

Vista lógica de piezas. No implica que ya estén desplegadas.

## Diagrama

```text
  Visitante
      │
      ▼
  Dominio propio ──► VPS (reverse proxy)
                        │
                        ├── Portafolio (Phaser / hub juego)
                        │         │
                        │         ├── enlaces ──► GitHub Pages (demos estáticos)
                        │         ├── enlaces ──► demos en vivo en el mismo VPS
                        │         │                 (Cadence, PixelGen/MLDS6, …)
                        │         └── eventos ──► Analítica self-hosted (ej. Umami)
                        │
                        ├── Cadence (API + UI) — demo en vivo
                        ├── PixelGen / MLDS6 (p. ej. Gradio) — demo en vivo
                        └── stats.dominio o path /umami
```

## Piezas

### Portafolio (VPS)

- Sitio principal bajo el dominio.
- Experiencia Phaser (exploración / juego).
- Fichas de proyecto: `demoUrl` + `repoUrl` (Pages o subdominio VPS según proyecto).

### Demos estáticos (GitHub Pages)

- Siguen en Pages: Angry Birds, Bomberman, Uncover, Pathway, BeachHouse, DinoJam, Stitch Code, etc. (salvo que se decida otra cosa).
- El hub solo enlaza.

### Demos en vivo (VPS) — decisión

Se **ajustarán** para demo en vivo (no solo repo / local):

| Proyecto | Hábitat | Notas |
|----------|---------|--------|
| **Cadence** | Tropical techno | Backend + UI; subdominio o path en el VPS |
| **PixelGen (MLDS6)** | Scifi neon | App tipo Gradio u otra UI de inferencia en el VPS |

Implica trabajo en esos repos (empaquetado, env, reverse proxy) además del portafolio.

### Analítica (VPS, self-hosted)

- Candidato: Umami (Docker + DB).
- Pageviews + eventos del juego.
- Dashboard privado.

### Reverse proxy / TLS

- Caddy o nginx + Certbot.
- Apex/`www` → portafolio.
- Subdominios o paths → Cadence, PixelGen, Umami.

## Qué no decide este doc

CI/CD fino, DNS exacto, paths vs subdominios — ver [abierto.md](./abierto.md).  
Motor del hub: **Phaser** ([decisiones.md](./decisiones.md)).
