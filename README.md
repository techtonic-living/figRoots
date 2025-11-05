# Figma Design Token Sync Tool

A web-based tool to bi-directionally sync design tokens and variables (including design styles) between a Figma variables panel and visual frames that allow for inline editing and management. This application provides a bridge between design systems in Figma and their consumption in development, making token management more visual, intuitive, and efficient.

## ✨ Features

- **Visual Token Management**: View design tokens in a user-friendly grid format, with visual previews for each token type.
- **Multiple Collections**: Organize tokens into distinct collections like Colors, Spacing, Typography, and Border Radius.
- **Inline Editing**: Click to edit token names and values directly in the UI. Changes are saved and synced back to Figma.
- **Real-time Preview**: Any edits to token values are immediately reflected in their visual representation (e.g., color swatches, spacing boxes, typography samples).
- **Figma Integration**: A "Sync Now" button fetches the latest variables from the connected Figma file. _Note: The current implementation uses a mock `figmaService` to simulate API interactions._
- **Modern Dark UI**: A sleek, professional dark-themed interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed superset of JavaScript for enhanced code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## 📂 Project Structure

The project is organized into several key directories and files:

```
.
├── index.html                # Main HTML entry point
├── index.tsx                 # React application root
├── App.tsx                   # Main application component, handles state and layout
├── metadata.json             # Application metadata
├── types.ts                  # TypeScript type definitions for all data structures
│
├── components/               # Reusable React components
│   ├── Header.tsx            # App header with sync button
│   ├── Sidebar.tsx           # Navigation for token collections
│   ├── TokenGrid.tsx         # Grid layout for displaying tokens
│   ├── EditableInput.tsx     # Reusable inline input component
│   ├── ColorTokenCard.tsx    # Card for displaying/editing a color token
│   ├── SpacingTokenCard.tsx  # Card for displaying/editing a spacing token
│   ├── TypographyTokenCard.tsx# Card for displaying/editing a typography token
│   └── RadiusTokenCard.tsx   # Card for displaying/editing a border radius token
│
└── services/                 # Handles external API communication
    └── figmaService.ts       # Mock service for fetching and updating Figma variables
```

## ⚙️ How It Works

1.  **Data Fetching**: On load, the main `App` component calls `figmaService.getVariableCollections()` to fetch all the design token collections.
2.  **State Management**: The fetched collections are stored in the `App` component's state. The `activeCollectionId` determines which collection's tokens are displayed.
3.  **Rendering**:
    - The `Sidebar` component lists all available collections, allowing the user to switch between them.
    - The `TokenGrid` component receives the active collection and maps over its tokens.
    - Based on the `token.type`, a specific card component (`ColorTokenCard`, `SpacingTokenCard`, etc.) is rendered for each token.
4.  **Inline Editing**:
    - Each token card uses the `EditableInput` component to allow users to click and edit values.
    - When an edit is saved (on blur or Enter), an `onUpdate` callback is triggered, bubbling up to the `App` component.
5.  **Data Syncing**:
    - The `handleUpdateToken` function in `App.tsx` calls `figmaService.updateVariable` with the token's ID and the updated value.
    - The local state is updated optimistically with the returned data to ensure the UI feels responsive.
    - The "Sync Now" button manually triggers a full re-fetch of all collections from the service.

## 🚀 Future Enhancements

- **Real Figma API Integration**: Replace the mock `figmaService.ts` with a real implementation that communicates with the Figma Variables API.
- **Create & Delete Tokens**: Add UI and functionality to create new tokens and delete existing ones.
- **Token Aliasing**: Support for creating tokens that reference other tokens (e.g., `color.brand.primary` referencing `color.blue.500`).
- **More Token Types**: Expand support to include other design tokens like shadows, gradients, and grids.
- **Export Functionality**: Add options to export token collections to various formats (CSS Variables, JSON, SCSS, etc.).
