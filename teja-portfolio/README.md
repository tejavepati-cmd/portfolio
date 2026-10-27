# Teja Vepati — DRaX

An original portfolio experience for Teja Vepati, built with React, TypeScript, Three.js, GSAP, and Vite.

The hero renders an original procedural smart-bag sculpture and orbital signals in Three.js. All project artwork is generated with CSS.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Accessibility and Performance](#accessibility-and-performance)
- [Contact](#contact)

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | UI components |
| TypeScript | Type-safe application code |
| Three.js | 3D hero scene |
| GSAP | Animation and scroll-driven motion |
| Vite | Development server and production builds |

## Project Structure

```text
teja-portfolio/
├── src/                 # Application source code
├── index.html           # Vite entry HTML
├── package.json         # Dependencies and scripts
├── package-lock.json    # Locked dependency versions
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── eslint.config.js     # ESLint configuration
├── .gitignore           # Files excluded from Git
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint on the project |

## Accessibility and Performance

- Semantic landmarks and keyboard skip navigation
- Responsive navigation with a mobile-first layout
- Reduced-motion handling
- Capped WebGL pixel ratio
- Small procedural Three.js scene with no external model or texture downloads

## Contact

- Email: [tejavepati@gmail.com](mailto:tejavepati@gmail.com)
