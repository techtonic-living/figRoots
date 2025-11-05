# Architecture Overview

This document provides a detailed technical overview of the Figma Token Sync application architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   React Application                     │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │    Header    │  │   Sidebar    │  │  TokenGrid  │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │            Token Card Components                 │  │ │
│  │  │  Color | Spacing | Typography | Radius          │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │              App.tsx (State)                     │  │ │
│  │  │  • Collections                                   │  │ │
│  │  │  • Active Collection                             │  │ │
│  │  │  • Loading States                                │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                          │                             │ │
│  │                          ▼                             │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │           Figma Service Layer                    │  │ │
│  │  │  • getVariableCollections()                      │  │ │
│  │  │  • updateVariable()                              │  │ │
│  │  │  • createVariable()                              │  │ │
│  │  │  • deleteVariable()                              │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └────────────────────────┬────────────────────────────────┘ │
└───────────────────────────┼─────────────────────────────────┘
                            │
                            ▼
               ┌────────────────────────┐
               │    Figma REST API      │
               │  /variables/local      │
               │  /variables/:id        │
               └────────────────────────┘
```

## Data Flow

### 1. Read Operations (Fetch Tokens)

```
User Action → Header.onSync()
    ↓
App.handleSync()
    ↓
figmaService.getVariableCollections()
    ↓
[Mock/Real API Call]
    ↓
Transform Figma Data → TokenCollection[]
    ↓
setCollections(data)
    ↓
UI Re-renders with new data
    ↓
TokenGrid displays tokens
```

### 2. Write Operations (Update Token)

```
User Edits Field → EditableInput.onSave()
    ↓
TokenCard.onUpdate(field, value)
    ↓
TokenGrid.onUpdateToken()
    ↓
App.handleUpdateToken()
    ↓
figmaService.updateVariable(id, field, value)
    ↓
[API Call to Figma]
    ↓
Optimistic Update → setCollections()
    ↓
UI reflects change immediately
```

### 3. Create Operations (Add Token)

```
User Clicks "Add Token" → TokenGrid
    ↓
onCreateToken(collectionId, type)
    ↓
App.handleCreateToken()
    ↓
figmaService.createVariable()
    ↓
[API Call creates variable]
    ↓
New token added to collection
    ↓
UI shows new token card
```

### 4. Delete Operations (Remove Token)

```
User Clicks Delete → TokenCard
    ↓
onDelete()
    ↓
App.handleDeleteToken()
    ↓
figmaService.deleteVariable(id)
    ↓
[API Call removes variable]
    ↓
Token filtered from collection
    ↓
UI removes token card
```

## Component Hierarchy

```
App
├── Header
│   └── Sync Button
├── Sidebar
│   └── Collection List
│       └── Collection Items
└── Main
    └── TokenGrid
        ├── Collection Header
        ├── Add Token Button
        └── Token Cards
            ├── ColorTokenCard
            │   └── EditableInput (x5)
            ├── SpacingTokenCard
            │   └── EditableInput (x2)
            ├── TypographyTokenCard
            │   └── EditableInput (x6)
            └── RadiusTokenCard
                └── EditableInput (x2)
```

## State Management

### App-Level State

```typescript
// App.tsx
const [collections, setCollections] = useState<TokenCollection[]>([]);
const [activeCollectionId, setActiveCollectionId] = useState<string | null>(
  null
);
const [isLoading, setIsLoading] = useState(false);
const [isSyncing, setIsSyncing] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Component-Level State

```typescript
// EditableInput.tsx
const [isEditing, setIsEditing] = useState(false);
const [editValue, setEditValue] = useState(value);
```

### State Flow Pattern

1. **Parent → Child (Props)**

   - Data flows down through props
   - Callbacks flow down for updates

2. **Child → Parent (Callbacks)**

   - Events bubble up through callbacks
   - Parent updates state
   - Children re-render with new props

3. **Optimistic Updates**
   - UI updates immediately
   - API call happens asynchronously
   - Rollback on error (future enhancement)

## Type System

### Core Types

```typescript
// Token types define structure
interface Token {
  id: string;
  name: string;
  type: TokenType;
  value: TokenValue;
  description?: string;
  scopes?: string[];
  alias?: string;
}

// Collections group tokens
interface TokenCollection {
  id: string;
  name: string;
  description?: string;
  tokens: Token[];
}

// Updates specify changes
interface TokenUpdate {
  tokenId: string;
  field: "name" | "value" | "description";
  newValue: any;
}
```

### Type Safety Benefits

1. **Compile-time checks** - Catch errors before runtime
2. **IntelliSense support** - Better DX with autocomplete
3. **Refactoring confidence** - Types ensure consistency
4. **Documentation** - Types serve as inline docs

## Service Layer Pattern

### Abstraction Benefits

```typescript
// Service abstracts API details
class FigmaService {
  // Public interface - stable
  async getVariableCollections(): Promise<TokenCollection[]>
  async updateVariable(...)
  async createVariable(...)
  async deleteVariable(...)

  // Private methods - can change
  private transformFigmaData(...)
  private transformValueToFigma(...)
}
```

### Why This Pattern?

1. **Separation of concerns** - UI doesn't know about API
2. **Easy testing** - Mock the service layer
3. **API agnostic** - Swap Figma API for others
4. **Single source of truth** - All API logic in one place

## Rendering Strategy

### Component Rendering

```typescript
// TokenGrid chooses component based on type
const renderTokenCard = (token: Token) => {
  switch (token.type) {
    case "color":
      return <ColorTokenCard />;
    case "spacing":
      return <SpacingTokenCard />;
    // ...
  }
};
```

### Performance Considerations

1. **React.memo** - Memoize pure components (future)
2. **useCallback** - Memoize callbacks to prevent re-renders
3. **Lazy loading** - Load components on demand (future)
4. **Virtual scrolling** - For large token lists (future)

## Error Handling Strategy

### Levels of Error Handling

1. **Service Layer**

   ```typescript
   try {
     const response = await fetch(...)
     if (!response.ok) throw new Error(...)
   } catch (err) {
     throw new FigmaApiError(...)
   }
   ```

2. **App Layer**

   ```typescript
   try {
     await figmaService.updateVariable(...)
   } catch (err) {
     setError('Failed to update token')
     console.error(err)
   }
   ```

3. **UI Layer**
   ```typescript
   {
     error && <div className="error-banner">{error}</div>;
   }
   ```

## Styling Architecture

### Tailwind CSS Utility-First

```typescript
// Composable utility classes
<div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
```

### Benefits

1. **No CSS files** - Styles in components
2. **Consistent design** - Design tokens in config
3. **Responsive** - Built-in breakpoints
4. **Dark mode** - Easy theme switching
5. **Performance** - PurgeCSS removes unused styles

## Build & Development

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
});
```

### Build Output

```
dist/
├── index.html          # Entry point
├── assets/
│   ├── index-[hash].js    # App bundle
│   └── index-[hash].css   # Styles
└── vite.svg
```

### Dev Server Features

1. **Hot Module Replacement** - Instant updates
2. **Fast refresh** - Preserve component state
3. **TypeScript checking** - Real-time errors
4. **ESLint integration** - Code quality checks

## Extensibility Points

### 1. Add New Token Types

```typescript
// 1. Add to types.ts
export type TokenType = 'color' | 'spacing' | 'shadow'

// 2. Create component
export function ShadowTokenCard({ token }) { ... }

// 3. Add to TokenGrid
case 'shadow': return <ShadowTokenCard />
```

### 2. Add Export Formats

```typescript
// services/exportService.ts
export class ExportService {
  toCSSVariables(collection: TokenCollection): string;
  toSCSS(collection: TokenCollection): string;
  toJSON(collection: TokenCollection): string;
}
```

### 3. Add Import Sources

```typescript
// services/importService.ts
export class ImportService {
  fromJSON(data: string): TokenCollection;
  fromStyleDictionary(data: string): TokenCollection;
  fromTailwind(config: any): TokenCollection;
}
```

## Testing Strategy (Future)

### Unit Tests

```typescript
// Test service layer
describe("FigmaService", () => {
  test("transforms color values correctly", () => {
    const result = service.transformFigmaValue(mockColor, "COLOR");
    expect(result).toEqual({ r: 255, g: 128, b: 0, a: 1 });
  });
});
```

### Integration Tests

```typescript
// Test component interaction
test("updates token when edited", async () => {
  render(<TokenGrid collection={mockCollection} />);
  fireEvent.click(screen.getByText("primary"));
  fireEvent.change(input, { target: { value: "secondary" } });
  fireEvent.blur(input);
  expect(mockUpdate).toHaveBeenCalledWith("primary", "secondary");
});
```

### E2E Tests

```typescript
// Test full workflow
test("complete token creation flow", async () => {
  // Navigate to app
  // Click Add Token
  // Edit fields
  // Verify in Figma
});
```

## Performance Optimization (Future)

### Current Bottlenecks

1. Re-rendering entire grid on single token update
2. No request caching
3. No debouncing on rapid edits

### Optimization Strategies

1. **React.memo** - Prevent unnecessary re-renders
2. **useMemo** - Cache expensive computations
3. **Debouncing** - Batch rapid updates
4. **Request caching** - Cache GET responses
5. **Virtual scrolling** - Handle large lists
6. **Code splitting** - Reduce initial bundle

## Security Considerations

### Current Implementation

- Client-side only
- No authentication
- API tokens in environment variables

### Production Requirements

1. **Server-side API proxy** - Hide credentials
2. **Authentication** - User login system
3. **Authorization** - Permission checks
4. **Rate limiting** - Prevent abuse
5. **Input validation** - Sanitize user input
6. **HTTPS only** - Secure transmission

## Deployment Strategy

### Static Hosting

```bash
npm run build
# Deploy dist/ to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
```

### Environment Variables

```bash
# Production
VITE_FIGMA_TOKEN=***
VITE_FIGMA_FILE_KEY=***
VITE_API_URL=https://api.example.com
```

### CI/CD Pipeline

```yaml
# GitHub Actions example
- name: Build
  run: npm run build
- name: Test
  run: npm test
- name: Deploy
  run: npm run deploy
```

## Future Architecture Considerations

### 1. Multi-User Collaboration

- Real-time updates via WebSockets
- Conflict resolution
- Presence indicators
- Change history

### 2. Backend Service

- Database for token storage
- Version control for tokens
- User authentication
- Team management

### 3. Plugin Architecture

- Figma plugin for direct access
- VS Code extension for developers
- CLI tool for automation
- Design tool integrations

---

This architecture is designed to be:

- **Maintainable** - Clear separation of concerns
- **Extensible** - Easy to add features
- **Testable** - Isolated components and services
- **Scalable** - Ready for growth
