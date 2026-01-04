# Loteria - Radar de Probabilidad

SPA en React + TypeScript para evaluar numeros de 5 cifras segun la suma (22/23), el centro interno por varianza y un filtro historico opcional. Incluye generador de 5 numeros y favoritos persistidos en localStorage.

## Funciones

- Analisis del numero con mensaje y color (rojo/amarillo/verde)
- Generador de 5 numeros con mejor puntaje
- Favoritos en ruta separada (`/favoritos`) y persistencia local
- Modal explicativo con graficos y enlaces
- UI dark mode con animaciones
- Configuracion del historico desde JSON

## Stack

- React + TypeScript (Vite)
- Tailwind CSS
- shadcn/ui
- Bun
- Jest + React Testing Library

## Requisitos

- Bun 1.3+

## Instalacion

```bash
bun install
```

## Desarrollo

```bash
bun run dev
```

## Tests

```bash
bun run test
```

## Build

```bash
bun run build
```

## Configurar historico

Edita `src/data/historical-numbers.json` con entradas de este formato:

```json
{ "number": "01234", "year": 2024, "prize": 2000000 }
```

El filtro historico recalcula los sesgos por posicion segun la muestra.

## Docker

```bash
docker build -t lotery .
docker run -p 8080:80 lotery
```

## Cloudflare Pages

Configuracion recomendada:

- Build command: `bun install && bun run build`
- Output directory: `dist`

SPA routing:

- `public/_redirects` incluye `/* /index.html 200` para rutas como `/favoritos`.

Si Cloudflare Pages no tiene Bun instalado:

- Agrega la variable de entorno `BUN_VERSION=1.3.3` y vuelve a desplegar, o
- Usa este build command:

```bash
curl -fsSL https://bun.sh/install | bash
~/.bun/bin/bun install
~/.bun/bin/bun run build
```

## Notas

- Los favoritos se guardan en este dispositivo usando `localStorage`.
- El radar mejora la seleccion por distribuciones, no cambia la probabilidad real de cada numero.
