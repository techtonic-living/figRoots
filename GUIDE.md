# Figma Design Token Sync - Quick Start Guide

## 🚀 Getting Started

### Installation

```bash
# Navigate to project directory
cd /Users/jessesmith/Developer/projects/techtonic/brands/figRoots

# Install dependencies (already done!)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📖 How to Use

### 1. **Navigate Collections**

- Use the sidebar on the left to switch between token collections
- Collections include: Colors, Spacing, Typography, Border Radius

### 2. **View Tokens**

- Each token is displayed as a card with:
  - Name (editable)
  - Visual preview
  - Value fields (editable)
  - Description (editable)

### 3. **Edit Tokens Inline**

- **Click any field** to edit it
- Press **Enter** to save
- Press **Escape** to cancel
- Changes are automatically synced

### 4. **Token Types**

#### Color Tokens

- Visual color swatch preview
- Edit via HEX value or individual R, G, B, A values
- Perfect for brand colors, semantic colors, backgrounds

#### Spacing Tokens

- Visual box preview showing the spacing size
- Edit value and unit (px, rem, em)
- Great for margins, padding, gaps

#### Typography Tokens

- Preview showing actual font rendering
- Edit: Font family, size, weight, line height, letter spacing
- Use for heading styles, body text, captions

#### Border Radius Tokens

- Visual preview with rounded corners
- Edit value and unit (px, rem, %)
- For button radius, card corners, etc.

### 5. **Sync with Figma**

- Click the **"Sync Now"** button in the header
- Fetches latest variables from Figma
- Updates local state with newest data

### 6. **Add New Tokens**

- Click **"Add Token"** button on any collection
- A new token is created with default values
- Edit the name and values immediately

### 7. **Delete Tokens**

- Click the **trash icon** on any token card
- Token is removed from collection and synced to Figma

## 🔌 Connecting to Real Figma API

Currently, the app uses **mock data** for development. To connect to the real Figma API:

### Step 1: Get Figma Access Token

1. Go to Figma → Settings → Personal Access Tokens
2. Generate a new token with appropriate permissions
3. Copy the token

### Step 2: Get File Key

1. Open your Figma file
2. Copy the file key from the URL:
   ```
   https://www.figma.com/file/[FILE_KEY]/...
   ```

### Step 3: Configure the Service

In `src/services/figmaService.ts`, uncomment the real API calls and configure:

```typescript
// In your app initialization or config
figmaService.configure("your-figma-access-token", "your-file-key");
```

### Step 4: Update API Calls

Replace the mock implementations with real fetch calls to:

- `GET /v1/files/:file_key/variables/local` - Get variables
- `PUT /v1/files/:file_key/variables/:variable_id` - Update variable
- `POST /v1/files/:file_key/variables` - Create variable
- `DELETE /v1/files/:file_key/variables/:variable_id` - Delete variable

## 🎨 Design System Integration

### Export Tokens

You can extend this tool to export tokens to various formats:

```typescript
// Example: Export to CSS Variables
function exportToCSS(collection: TokenCollection) {
  return collection.tokens
    .map((token) => {
      if (token.type === "color") {
        const color = token.value as ColorValue;
        return `--${token.name}: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});`;
      }
      // ... handle other types
    })
    .join("\n");
}
```

### Import Tokens

Load tokens from JSON, YAML, or other design token formats.

## 🛠️ Development

### Project Structure

```
src/
├── App.tsx                    # Main app component
├── types.ts                   # TypeScript type definitions
├── services/
│   └── figmaService.ts        # Figma API service (mock + real)
└── components/
    ├── Header.tsx             # App header with sync button
    ├── Sidebar.tsx            # Collection navigation
    ├── TokenGrid.tsx          # Token grid layout
    ├── EditableInput.tsx      # Reusable inline input
    ├── ColorTokenCard.tsx     # Color token display/edit
    ├── SpacingTokenCard.tsx   # Spacing token display/edit
    ├── TypographyTokenCard.tsx# Typography token display/edit
    └── RadiusTokenCard.tsx    # Radius token display/edit
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔧 Customization

### Add New Token Types

1. Define type in `src/types.ts`
2. Add to `TokenType` union
3. Create new card component
4. Add case in `TokenGrid.tsx`
5. Update mock data in `figmaService.ts`

### Styling

- Uses Tailwind CSS for styling
- Dark theme by default
- Customize colors in `tailwind.config.js`

## 📚 Resources

- [Figma Variables REST API](https://www.figma.com/developers/api#variables)
- [Design Tokens Community Group](https://github.com/design-tokens/community-group)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Tokens not syncing?

- Check browser console for errors
- Verify Figma API token has correct permissions
- Ensure file key is correct

### Visual previews not showing?

- Check that token values are valid
- Verify component is receiving correct props

### Build errors?

- Run `npm install` again
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

## 🎯 Next Steps

1. **Connect to real Figma API** - Replace mock service with real implementation
2. **Add authentication** - Secure token storage and user auth
3. **Token aliasing** - Support tokens that reference other tokens
4. **Export functionality** - Export to CSS, SCSS, JSON, etc.
5. **Import functionality** - Import from various design token formats
6. **Version history** - Track changes over time
7. **Collaboration** - Multi-user editing with conflict resolution
8. **Plugin integration** - Build Figma plugin for seamless workflow

---

**Happy token managing!** 🎨✨
