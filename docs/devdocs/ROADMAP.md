# Development Roadmap

## Strategic Priority: Plugin Integration First

### Why Plugin Integration Comes First

The entire value proposition of figRoots is **bi-directional synchronization with Figma**. Without it, the tool is merely a beautifully designed prototype. All other features—creating tokens, deleting tokens, exporting—are secondary to this core promise.

**Proving that we can reliably read from and write to the Figma document is Milestone #1.**

### Key Risks Mitigated by Early Integration

#### 1. API Discrepancies

The current `figmaService.ts` is a mock—an educated guess about how the real Figma API behaves. Building features on a potentially inaccurate mock could lead to significant rework later.

- Real Figma API may have different data structures
- Naming conventions might differ from our assumptions
- API limitations we haven't anticipated

#### 2. Performance Considerations

- How fast is the real API?
- Can we fetch hundreds of variables efficiently?
- Do we need loading states or data optimization?
- Only real integration reveals these answers

#### 3. Permissions & Edge Cases

- User doesn't have edit rights
- Conflicting variable modes
- File-level constraints
- Real-world complexities our mock ignores

#### 4. Plugin Communication

The communication between the plugin's UI (React app in `<iframe>`) and the plugin's main code (with access to `figma.*` API) happens via `postMessage`. This asynchronous bridge has its own challenges that must be solved first.

### Real Data Informs Better Features

Once we have a real data connection, we can:

- Discover extra metadata that inspires new features
- Find that planned features are more/less complex than anticipated
- Design with practical, grounded requirements
- Build on reality, not assumptions

---

## Implementation Roadmap

### Phase 1: Build the Bridge (Plugin Boilerplate)

**Goal**: Get React application running inside Figma plugin window

**Tasks**:

1. Set up basic Figma plugin structure
   - Create `manifest.json`
   - Create `code.ts` (plugin main file)
   - Configure build process for plugin

2. Establish UI loading
   - Configure Vite build for plugin environment
   - Load React app in Figma plugin window
   - Test that UI renders correctly

3. Implement basic `postMessage` communication
   - UI sends "hello" message to `code.ts`
   - `code.ts` logs message and sends "world" back
   - Verify two-way communication works

**Success Criteria**: React app loads in Figma with working message bridge

---

### Phase 2: Implement Read-Only Sync

**Goal**: Display real Figma variable data in the UI

**Tasks**:

1. Modify `figmaService.ts` for real communication
   - Replace mock data with message sending
   - Send request to `code.ts` for collections
   - Handle async response

2. Implement `code.ts` listener
   - Listen for collection request messages
   - Call `figma.variables.getLocalVariableCollectionsAsync()`
   - Send results back to UI

3. Update UI to handle real data
   - Test with actual Figma files
   - Handle edge cases (empty collections, different types)
   - Add error handling

**Success Criteria**: UI displays real Figma variable data correctly

---

### Phase 3: Implement Write Sync (Complete MVP)

**Goal**: Edit tokens in UI and sync changes to Figma

**Tasks**:

1. Modify `updateVariable` in service
   - Send update messages to `code.ts`
   - Include token ID and new values
   - Handle response

2. Implement update logic in `code.ts`
   - Find Figma variable by ID
   - Update variable properties
   - Confirm success/failure

3. Test bi-directional sync
   - Edit in UI → verify change in Figma Local Variables
   - Edit in Figma → verify change reflects in UI (after sync)
   - Handle conflicts and errors gracefully

**Success Criteria**: Full bi-directional sync working reliably

---

### Phase 4: Add Enhancements

**With core sync proven and stable, confidently add features:**

#### 4.1 Token Management

- Create new tokens
- Delete existing tokens
- Duplicate tokens
- Rename tokens

#### 4.2 Token Aliasing

- Reference tokens to other tokens
- Visual indication of aliases
- Update alias chains correctly

#### 4.3 Export Functionality

- Export to CSS Custom Properties
- Export to JSON format
- Export to SCSS variables
- Export to JavaScript/TypeScript

#### 4.4 Additional Token Types

- Shadow tokens
- Gradient tokens
- Grid tokens
- Animation tokens

#### 4.5 Advanced Features

- Search and filter tokens
- Bulk operations
- Token usage tracking
- Design system documentation

---

## Development Philosophy

> **Think of the plugin integration as the foundation of a house.**  
> It would be foolish to start decorating the walls and buying furniture before you've poured the concrete and built the frame.

**Solidify the foundation first, and the rest of the construction will be much smoother and more successful.**

---

## Current Status

### ✅ Completed

- React + TypeScript + Vite setup
- Component architecture
- Mock service layer
- Visual token cards (Color, Spacing, Typography, Radius)
- Inline editing functionality
- Dark theme UI with Tailwind CSS
- Complete documentation

### 🚧 In Progress

- Repository setup on GitHub
- Development environment configuration

### 📋 Up Next

- Phase 1: Plugin boilerplate
- Phase 2: Read-only sync
- Phase 3: Write sync (MVP complete)

---

## Timeline Estimates

| Phase | Estimated Duration | Priority |
|-------|-------------------|----------|
| Phase 1: Plugin Boilerplate | 2-3 days | P0 - Critical |
| Phase 2: Read-Only Sync | 3-5 days | P0 - Critical |
| Phase 3: Write Sync (MVP) | 5-7 days | P0 - Critical |
| Phase 4: Enhancements | Ongoing | P1 - Important |

**Total to MVP**: 10-15 days of focused development

---

## Resources

- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [Figma Variables API](https://www.figma.com/plugin-docs/api/properties/figma-variables/)
- [MCP Figma Server Guide](./README.md)
- [Architecture Documentation](../../ARCHITECTURE.md)
