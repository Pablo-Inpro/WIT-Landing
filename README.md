# WIT — The Living Ecosystem

Landing cinematográfica del ecosistema WIT. Experiencia scrollytelling con GSAP, demos locales de producto y núcleo 3D opcional (React Three Fiber).

## Requisitos

- Node.js 20+
- npm 10+

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando        | Descripción              |
| -------------- | ------------------------ |
| `npm run dev`  | Servidor de desarrollo   |
| `npm run build`| Build de producción      |
| `npm run start`| Servir build             |
| `npm run lint` | ESLint                   |

## Configuración editable

- `src/config/site.ts` — marca, CTAs, URLs canónicas, rutas de logo
- `src/config/products.ts` — nombres, descripciones, enlaces y escenas de cada app
- `src/config/demos.ts` — contenido ficticio de las demostraciones

Si `demoRequestUrl` o `product.url` son `null`, la UI usa anclas internas reales (sin enlaces inventados).

## Assets de marca

Logotipos oficiales en `public/brand/`. Copias con nombres URL-safe:

- `logo-blanco.png`, `logo-verde.png`
- `app-dorado.png`, `app-blanco.png`, `app-negativo.png`
- `W-Dorada.png`, `W-Negra.png`, `APP.png`

## Arquitectura

```
src/
  app/                 # Next.js App Router
  components/
    brand/             # Logo y punto narrativo
    demos/             # Interfaces simuladas
    layout/            # Header, footer, progreso
    motion/            # Orquestación GSAP
    scenes/            # Ocho escenas narrativas
    three/             # Núcleo WebGL
    ui/                # Botones y CTAs
  config/              # Productos y sitio
  hooks/
  lib/gsap.ts
  styles/              # Tokens y microinteracciones
```

## Notas

- No hay backend, autenticación ni APIs externas.
- Las demos son simulaciones locales.
- `prefers-reduced-motion` desactiva el scroll cinematográfico y deja el contenido accesible.
- Three.js solo en la escena del núcleo; el resto es HTML + SVG + GSAP.
