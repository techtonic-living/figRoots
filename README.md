# figRoots

> **A Figma plugin for bi-directional design token synchronization**

figRoots provides a visual interface for managing design tokens with seamless synchronization between Figma's Local Variables and your UI. Designed to bridge the gap between design and development, this tool makes token management intuitive, visual, and efficient.

## Overview

figRoots is designed to run as a **Figma plugin**, providing direct access to Figma's Variables API for true bi-directional synchronization. The plugin consists of:

- **UI Layer** (React + TypeScript): The visual interface for managing tokens
- **Plugin Layer** (Figma Plugin API): The bridge between UI and Figma document data

## Features

### Visual Token Management

- **Grid-based UI** with visual previews for each token type
- **Real-time updates** that reflect changes immediately
- **Dark theme** built with Tailwind CSS for a professional look

### Token Types Supported

- **Colors**: RGB/HEX editing with color swatches
- **Spacing**: Configurable units (px, rem, em) with visual size boxes
- **Typography**: Font family, size, weight, line height, letter spacing
- **Border Radius**: Configurable units (px, rem, %) with rounded corner previews

### Inline Editing

- Click any field to edit in place
- Press `Enter` to save, `Escape` to cancel
- Optimistic UI updates for immediate feedback

### Bi-directional Sync

- **Sync Now** button fetches latest variables from Figma
- Automatic sync on token updates
- Create and delete tokens directly from the UI
- Changes reflect instantly in Figma's Local Variables panel

## Tech Stack

- **React 18** - UI library
- **TypeScript 5** - Type safety and enhanced developer experience
- **Vite 4** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first styling framework

## Project Structure

```text
figRoots/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Main app component & state management
│   ├── types.ts              # TypeScript type definitions
│   ├── index.css             # Global styles with Tailwind
│   │
│   ├── components/           # React UI components
│   │   ├── Header.tsx        # App header with sync button
│   │   ├── Sidebar.tsx       # Collection navigation
│   │   ├── TokenGrid.tsx     # Token grid layout
│   │   ├── EditableInput.tsx # Reusable inline input
│   │   ├── ColorTokenCard.tsx
│   │   ├── SpacingTokenCard.tsx
│   │   ├── TypographyTokenCard.tsx
│   │   └── RadiusTokenCard.tsx
│   │
│   └── services/
│       └── figmaService.ts   # Figma API service layer
│
├── docs/                     # Documentation
│   └── devdocs/
│       ├── README.md         # Figma MCP server guide
│       ├── ROADMAP.md        # Development roadmap
│       └── PDR.md            # Product design rationale
│
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind configuration
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Figma account with Dev or Full seat (for API access)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## How It Works

### Data Flow

1. **Fetch**: UI requests collections via `figmaService.getVariableCollections()`
2. **Display**: Collections render as token cards with visual previews
3. **Edit**: User clicks to edit token values inline
4. **Sync**: Changes send to Figma via `figmaService.updateVariable()`
5. **Update**: UI updates optimistically while syncing to Figma

### Current Implementation

The current implementation uses a **mock service layer** (`figmaService.ts`) to simulate Figma API interactions. This allows for rapid UI development and testing without requiring a live Figma connection.

To enable real Figma integration, the mock service needs to be replaced with:

- **Figma Plugin Code**: A `code.ts` file that accesses the Figma Plugin API
- **Message Bridge**: `postMessage` communication between UI and plugin code

See [ROADMAP.md](./docs/devdocs/ROADMAP.md) for the implementation strategy.

## Documentation

- **[GUIDE.md](./GUIDE.md)** - Quick start guide and usage instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture deep dive
- **[FIGMA_INTEGRATION.md](./FIGMA_INTEGRATION.md)** - Figma API integration guide
- **[MCP_STATUS.md](./MCP_STATUS.md)** - MCP server configuration status
- **[ROADMAP.md](./docs/devdocs/ROADMAP.md)** - Development roadmap and strategy

## Development Roadmap

### Phase 1: Foundation (Current)

- ✅ React + TypeScript setup
- ✅ Component architecture
- ✅ Mock service layer
- ✅ Visual token cards for 4 token types
- ✅ Inline editing functionality

### Phase 2: Plugin Integration (Next)

- Build Figma plugin boilerplate
- Implement plugin ↔ UI message bridge
- Connect to real Figma Variables API
- Implement read/write sync

### Phase 3: Enhancement

- Token aliasing support
- Additional token types (shadows, gradients)
- Export to CSS/JSON/SCSS
- Advanced filtering and search

See [ROADMAP.md](./docs/devdocs/ROADMAP.md) for detailed strategy.

## Contributing

This is currently a private project for Techtonic Living. For questions or suggestions, please contact the development team.

## License

Proprietary - Techtonic Living © 2025

---

**Repository**: [techtonic-living/figRoots](https://github.com/techtonic-living/figRoots)  
**Branch**: `figRoots`
