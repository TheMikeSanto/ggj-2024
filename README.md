# Phaser 3 Typescript Boilerplate

Provides the following, to enable faster development of new Phaser projects:
- Phaser 3.70
- Typescript 5
- Webpack 5

Included are 3 scenes:
- **Boot** (for minimal file loading for files needed in Preload)
- **Preload** contains a bespoke driven by the `manifest.json`
- **Game** primary game scene

## Installation

`npm install`

## Scripts

- `npm start`

Build files, run the webpack dev-server - available at [localhost:8080](http://localhost:8080)

- `npm run build`

Build the production version and output files to `dist`

- `npm run lint`

Lint the codebase using ESLint
