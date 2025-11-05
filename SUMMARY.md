# figRoots - Project Summary

## Overview

**figRoots** is a Figma plugin for bi-directional design token synchronization between Figma's Local Variables and a visual management interface. Built with React, TypeScript, and Tailwind CSS.

**Repository**: [techtonic-living/figRoots](https://github.com/techtonic-living/figRoots)  
**Branch**: `figRoots`

---

## What's Been Built

### Core Application

- ✅ React 18 + TypeScript 5 + Vite 4 setup
- ✅ Tailwind CSS 3 dark theme UI
- ✅ Component-based architecture
- ✅ Mock service layer for development
- ✅ Complete documentation suite

### Token Types Supported (4)

| Type              | Features                                        | Visual Preview  |
| ----------------- | ----------------------------------------------- | --------------- |
| **Color**         | HEX & RGB editing                               | Color swatch    |
| **Spacing**       | px, rem, em units                               | Size box        |
| **Typography**    | Font, size, weight, line height, letter spacing | Rendered text   |
| **Border Radius** | px, rem, % units                                | Rounded corners |

### UI Components (9)

1. `Header.tsx` - App header with sync button
2. `Sidebar.tsx` - Collection navigation
3. `TokenGrid.tsx` - Token grid layout
4. `EditableInput.tsx` - Reusable inline input
5. `ColorTokenCard.tsx` - Color token card
6. `SpacingTokenCard.tsx` - Spacing token card
7. `TypographyTokenCard.tsx` - Typography token card
8. `RadiusTokenCard.tsx` - Radius token card
9. `App.tsx` - Main application orchestrator

### Key Features

- **Visual token management** with real-time previews
- **Inline editing** (click to edit, Enter to save, Esc to cancel)
- **Optimistic UI updates** for immediate feedback
- **Sync functionality** (ready for Figma API integration)
- **Multiple collections** with sidebar navigation
- **Responsive grid layout** with professional styling

---

## Project Structure

```text
figRoots-repo/
├── src/
│   ├── main.tsx                    # React entry point
│   ├── App.tsx                     # Main app component
│   ├── types.ts                    # TypeScript types
│   ├── index.css                   # Global styles
│   ├── components/                 # UI components (9 files)
│   └── services/
│       └── figmaService.ts         # Figma API service layer
│
├── docs/devdocs/
│   ├── README.md                   # Figma MCP guide
│   ├── ROADMAP.md                  # Development roadmap
│   └── PDR.md                      # Product design rationale
│
├── Configuration Files
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json               # TypeScript config
│   ├── tailwind.config.js          # Tailwind config
│   └── package.json                # Dependencies
│
└── Documentation
    ├── README.md                   # Project overview
    ├── ARCHITECTURE.md             # Technical architecture
    ├── SUMMARY.md                  # This file
    ├── docs/guides/
    │   ├── GUIDE.md                # Quick start guide
    │   └── FIGMA_INTEGRATION.md    # Figma API guide
    └── docs/setup/
        ├── MCP_SETUP.md            # MCP setup guide
        └── MCP_STATUS.md           # MCP status report
```

---

## Getting Started

### Installation

```bash
# Navigate to project
cd /Users/jessesmith/Developer/projects/techtonic/brands/figRoots-repo

# Install dependencies
npm install

# Start development server
npm run dev
```

**App runs at**: `http://localhost:3000`

### Basic Usage

1. **Browse collections** - Click collection names in sidebar
2. **View tokens** - See visual cards for each token
3. **Edit inline** - Click any value to edit
4. **Sync** - Click "Sync Now" to refresh (currently mock data)

---

## Current Implementation Status

### ✅ Phase 1: Foundation (Complete)

- React + TypeScript + Vite setup
- Component architecture
- Mock service layer
- Visual token cards for 4 types
- Inline editing functionality
- Dark theme UI
- Documentation suite

### 🚧 Phase 2: Plugin Integration (Next)

See [ROADMAP.md](./docs/devdocs/ROADMAP.md) for detailed plan:

1. Build plugin boilerplate
2. Implement read-only sync
3. Implement write sync (MVP complete)
4. Add enhancements

---

## Documentation Guide

| Document | Purpose | Audience |
|----------|---------|----------|
| **README.md** | Project overview and quick reference | Everyone |
| **docs/guides/GUIDE.md** | Usage instructions and how-tos | End users |
| **ARCHITECTURE.md** | Technical deep dive | Developers |
| **docs/guides/FIGMA_INTEGRATION.md** | Figma API integration details | Developers |
| **docs/setup/MCP_STATUS.md** | MCP configuration status | Developers |
| **docs/devdocs/ROADMAP.md** | Development strategy | Developers |
| **docs/devdocs/PDR.md** | Product design rationale | Product/Dev |
| **docs/devdocs/README.md** | Figma MCP server guide | Developers |

---

## Technical Stack

| Category            | Technology   | Version |
| ------------------- | ------------ | ------- |
| **Framework**       | React        | 18.2.0  |
| **Language**        | TypeScript   | 5.0.2   |
| **Build Tool**      | Vite         | 4.4.5   |
| **Styling**         | Tailwind CSS | 3.3.3   |
| **Package Manager** | npm          | Latest  |

---

## Key Design Decisions

### 1. Mock Service Layer First

Built `figmaService.ts` as mock to enable rapid UI development without Figma dependency. This allows:

- Fast iteration on UI/UX
- Component testing in isolation
- Demonstration of functionality
- Foundation for real API integration

### 2. Plugin Integration Priority

Strategic decision to implement Figma plugin integration **before** adding enhancements. Rationale:

- Core value is bi-directional sync
- Real API informs better features
- Mitigates technical risks early
- Delivers MVP faster

See [PDR.md](./docs/devdocs/PDR.md) for detailed rationale.

### 3. Component-Based Architecture

- Reusable components (`EditableInput`)
- Token-type-specific cards
- Clear separation of concerns
- Easy to extend with new token types

### 4. TypeScript Throughout

- Type safety for all data structures
- Better IDE support
- Fewer runtime errors
- Self-documenting code

---

## Next Steps

### Immediate (Phase 2.1)

1. Set up Figma plugin boilerplate

   - Create `manifest.json`
   - Create `code.ts` plugin file
   - Configure build for plugin environment

2. Establish UI ↔ Plugin communication
   - Implement `postMessage` bridge
   - Test two-way messaging

### Short-term (Phase 2.2)

1. Implement read-only sync
   - Connect to real Figma Variables API
   - Display actual Figma data in UI

### Medium-term (Phase 2.3)

1. Implement write sync
   - Edit tokens in UI
   - Sync changes to Figma
   - **MVP Complete**

### Long-term (Phase 3)

1. Add enhancements
   - Token aliasing
   - Additional token types
   - Export functionality
   - Advanced features

**See [ROADMAP.md](./docs/devdocs/ROADMAP.md) for timeline and details.**

---

## MCP Integration Status

The project includes Model Context Protocol (MCP) configuration:

- ✅ Figma MCP Server (remote)
- ✅ Chrome DevTools MCP
- ✅ GitHub MCP
- ✅ Filesystem MCP
- ✅ Microsoft Docs MCP

See [MCP_STATUS.md](./docs/setup/MCP_STATUS.md) for configuration details.

---

## Resources

### Internal Documentation

- [README.md](./README.md) - Start here
- [docs/guides/GUIDE.md](./docs/guides/GUIDE.md) - Usage guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical docs
- [docs/devdocs/ROADMAP.md](./docs/devdocs/ROADMAP.md) - Development plan

### External Resources

- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Figma Variables API](https://www.figma.com/plugin-docs/api/properties/figma-variables/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Project Timeline

| Milestone          | Status      | Duration  |
| ------------------ | ----------- | --------- |
| Foundation & UI    | ✅ Complete | Completed |
| Repository Setup   | ✅ Complete | 1 day     |
| Plugin Boilerplate | � Planned   | 2-3 days  |
| Read-Only Sync     | 📋 Planned  | 3-5 days  |
| Write Sync (MVP)   | 📋 Planned  | 5-7 days  |
| Enhancements       | 📋 Planned  | Ongoing   |

**Estimated time to MVP**: 10-15 days of focused development

---

## License

Proprietary - Techtonic Living © 2025
