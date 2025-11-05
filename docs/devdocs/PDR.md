# figRoots

Figma Plugin Tool

\*This plugin # Product Design Rationale (PDR)

## Project Overview

**figRoots** is a Figma plugin designed to provide bi-directional synchronization of design tokens between Figma's Local Variables and a visual management interface. This document outlines the strategic reasoning behind the project's architecture and development approach.

---

## Why a Figma Plugin?

### 1. Direct Data Access

To achieve true "bi-directional sync," the tool requires **direct access to Figma file data**. A Figma plugin runs in a sandboxed environment with access to the Figma Plugin API, which can:

- Read and write to variable collections
- Access design styles
- Manipulate document nodes
- Listen to file changes

**Alternative approaches (web app, browser extension) cannot provide this level of integration.**

### 2. Seamless Workflow

Designers and developers work directly within Figma. By embedding this tool as a plugin:

- Users never leave their design environment
- Changes in the plugin instantly reflect in Figma's native "Local Variables" panel
- No context switching between tools
- Reduced friction in the design-to-development workflow

### 3. Contextual Power

A plugin can interact with the user's selection on the canvas, enabling future features such as:

- Select a frame → see which tokens are being used
- Apply a token to a selected object
- Visualize token usage across the document
- Batch update tokens in selected frames

---

## Architecture: Two-Part System

A complete Figma plugin consists of two main parts:

### UI Code (Current Implementation)

- **Technology**: React + TypeScript + Vite
- **Environment**: Runs inside an `<iframe>` within Figma
- **Responsibility**: Everything the user sees and interacts with
- **Location**: All files in `src/` directory

### Plugin Code (To Be Implemented)

- **Technology**: TypeScript (compiled to JavaScript)
- **Environment**: Has access to the Figma Plugin API (`figma.*`)
- **Responsibility**: Bridge between UI and Figma document
- **Location**: Will be `code.ts` or `main.ts` in plugin structure

---

## Current vs. Future State

### Current State: Mock Service Layer

The `figmaService.ts` file currently returns hardcoded data to simulate Figma API behavior. This approach allows for:

- **Rapid UI development** without Figma dependency
- **Component testing** in isolation
- **Design iteration** without API complexity
- **Demonstration** of functionality

### Future State: Real Plugin Integration

When integrated as a plugin:

#### Fetching Data

```typescript
// Instead of returning mock data
getVariableCollections() {
  // Send message to plugin code
  parent.postMessage({
    type: 'GET_COLLECTIONS'
  }, '*');

  // Plugin code calls:
  // figma.variables.getLocalVariableCollectionsAsync()

  // And sends data back to UI
}
```

#### Updating Data

```typescript
// When user edits a token
updateVariable(id, field, value) {
  // Send message to plugin code
  parent.postMessage({
    type: 'UPDATE_VARIABLE',
    id,
    field,
    value
  }, '*');

  // Plugin code finds variable and updates it
  // using Figma API
}
```

---

## Strategic Development Approach

### The Question: Features vs. Foundation?

> **Should we add enhancements before implementing plugin code?**

### The Answer: Foundation First

For this specific tool, it would be **highly inadvisable** to add more enhancements before implementing the core plugin code.

### Reasoning

#### 1. Core Value is the Sync

The entire premise and value of figRoots is "bi-directional sync with Figma." Without it:

- The tool is a beautifully designed but non-functional prototype
- All other features (create, delete, export) are secondary
- The core promise remains undelivered

**Proving reliable read/write to Figma document is Milestone #1.**

#### 2. Mitigating Technical Risk

The mock `figmaService.ts` is an educated guess. Real risks include:

##### API Discrepancies

- Real API might have different data structures
- Naming conventions may differ
- Limitations we haven't anticipated
- Building on inaccurate mock = rework later

##### Performance

- Unknown API speed
- Unknown limitations with large datasets
- May need loading states or optimization
- Only real integration reveals these

##### Permissions & Edge Cases

- User lacks edit rights
- Conflicting variable modes
- File-level constraints
- Real-world complexities mock ignores

##### Plugin Communication

- `postMessage` bridge between UI and plugin code
- Asynchronous communication challenges
- Error handling across boundaries
- These must be solved first

#### 3. Real Data Informs Better Features

Once real data connection exists:

- Discover metadata that inspires new features
- Understand actual complexity of planned features
- Design with practical requirements
- Build on reality, not assumptions

---

## Recommended Development Sequence

### Phase 1: Build the Bridge

#### Set up basic Figma plugin structure

- Create `manifest.json`
- Create `code.ts` file
- Load React app in plugin window
- Establish `postMessage` communication

**Success**: UI and plugin code can communicate

### Phase 2: Implement Read-Only Sync

#### Connect to real Figma data

- Modify `figmaService.ts` to send messages
- Implement listeners in `code.ts`
- Call `figma.variables.getLocalVariableCollectionsAsync()`
- Display real data in UI

**Success**: App displays actual Figma variables

### Phase 3: Implement Write Sync (MVP)

#### Complete bi-directional sync

- Update `updateVariable` to send changes
- Implement update logic in `code.ts`
- Test changes reflect in both directions
- Handle errors and conflicts

**Success**: Edit in UI → change reflects in Figma

### Phase 4: Add Enhancements

#### With foundation solid, confidently add

- Create/delete tokens
- Token aliasing
- Export to CSS/JSON/SCSS
- Advanced filtering and search
- Additional token types

---

## Development Philosophy

> **Think of plugin integration as the foundation of a house.**  
> You wouldn't start decorating walls and buying furniture before pouring the concrete and building the frame.

**Solidify the foundation first, and the rest of the construction will be much smoother and more successful.**

---

## Benefits of This Approach

### Technical Benefits

- **De-risk early**: Discover API issues before investing in features
- **Accurate implementation**: Build features on real data, not assumptions
- **Better architecture**: Real constraints inform better design decisions
- **Fewer rewrites**: Avoid building features that don't work with real API

### Business Benefits

- **Faster to MVP**: Core value delivered first
- **User confidence**: Demonstrable functionality early
- **Clearer roadmap**: Real data reveals what features matter
- **Reduced waste**: Don't build features that need to be rewritten

### User Benefits

- **Real utility**: Tool actually solves the core problem
- **Reliability**: Built on tested, working foundation
- **Performance**: Optimized for real-world use cases
- **Trust**: Core promise is delivered and proven

---

## Conclusion

The strategic priority for figRoots is clear: **implement the Figma plugin integration before adding enhancements**.

This approach:

1. Delivers core value first
2. Mitigates technical risks early
3. Ensures features are built on reality
4. Creates a solid foundation for future growth

The mock service layer has served its purpose for UI development. Now it's time to build the bridge to Figma and deliver the tool's core promise.

---

## References

- [ROADMAP.md](./ROADMAP.md) - Detailed implementation plan
- [README.md](./README.md) - Figma MCP server guide
- [ARCHITECTURE.md](../../ARCHITECTURE.md) - Technical architecture
- [Figma Plugin API Docs](https://www.figma.com/plugin-docs/)
