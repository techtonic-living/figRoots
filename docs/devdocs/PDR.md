# figRoots
Figma Plugin Tool

*This plugin # Product Design Rationale (PDR)

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

**API Discrepancies**

- Real API might have different data structures
- Naming conventions may differ
- Limitations we haven't anticipated
- Building on inaccurate mock = rework later

**Performance**

- Unknown API speed
- Unknown limitations with large datasets
- May need loading states or optimization
- Only real integration reveals these

**Permissions & Edge Cases**

- User lacks edit rights
- Conflicting variable modes
- File-level constraints
- Real-world complexities mock ignores

**Plugin Communication**

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

**Set up basic Figma plugin structure**

- Create `manifest.json`
- Create `code.ts` file
- Load React app in plugin window
- Establish `postMessage` communication

**Success**: UI and plugin code can communicate

### Phase 2: Implement Read-Only Sync

**Connect to real Figma data**

- Modify `figmaService.ts` to send messages
- Implement listeners in `code.ts`
- Call `figma.variables.getLocalVariableCollectionsAsync()`
- Display real data in UI

**Success**: App displays actual Figma variables

### Phase 3: Implement Write Sync (MVP)

**Complete bi-directional sync**

- Update `updateVariable` to send changes
- Implement update logic in `code.ts`
- Test changes reflect in both directions
- Handle errors and conflicts

**Success**: Edit in UI → change reflects in Figma

### Phase 4: Add Enhancements

**With foundation solid, confidently add:**

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



Why a Figma Plugin?
Direct Data Access: To achieve true "bi-directional sync," the tool needs direct access to the Figma file's data. A Figma plugin runs in a sandboxed environment with a special API that can read and write to the document's variable collections, styles, and nodes.
Seamless Workflow: Designers and developers work directly within Figma. By embedding this tool as a plugin, they can manage design tokens in a visual way without ever leaving their design environment. The changes they make in the plugin would instantly reflect in Figma's native "Local Variables" panel, and vice-versa.
Contextual Power: A plugin can interact with the user's selection on the canvas. Future features could include selecting a frame and having the plugin highlight which tokens are being used, or applying a specific token to a selected object.
2. How it Would Function as a Plugin
The current application is the UI part of the plugin. A complete Figma plugin consists of two main parts:
UI Code (What you have now): This is the React application that runs inside an <iframe> within the Figma interface. It's responsible for everything the user sees and interacts with.
Plugin Code (The missing piece): This is a separate JavaScript file (often called code.ts or main.ts) that has access to the Figma Plugin API (figma.*). It acts as the bridge between your UI and the Figma document.
The figmaService.ts file in your project is currently a mock of this bridge. In a real-world scenario, you would replace it with one that communicates with the plugin code:
Fetching Data: Instead of returning hardcoded data, getVariableCollections would send a message to the plugin code. The plugin code would then call the real Figma API (e.g., figma.variables.getLocalVariableCollectionsAsync()) and send the data back to the UI to be displayed.
Updating Data: When a user edits a token in the UI, updateVariable would send the changes to the plugin code. The plugin code would then use the Figma API to find the corresponding variable and update its value.
In summary, while the current code runs perfectly as a standalone web application for demonstration, its true power and intended purpose are only unlocked when it's integrated into Figma as a plugin.
User
would it be wise to add enhancements before adding plugin code?
Gemini 2.5 Pro
Ran for 14s
Thought for 14 seconds
chevron_right
That is a very insightful and strategic question. It touches on a common dilemma in software development: should you build out a feature-rich prototype or focus on creating a solid, production-ready foundation first?
For this specific tool, it would be highly inadvisable to add more enhancements before implementing the core plugin code.
The wisest and most professional approach is to prioritize building the bridge to the actual Figma Plugin API first.
Here’s the detailed reasoning why:
1. The Core Value Is the Sync
The entire premise and value of your application is the "bi-directional sync with Figma." Without it, the tool is a beautifully designed but ultimately non-functional prototype. All other features—creating tokens, deleting tokens, exporting—are secondary to this core promise. Proving that you can reliably read from and write to the Figma document is Milestone #1.
2. Mitigating Technical Risk
Your figmaService.ts is a mock. It's an educated guess about how the real Figma API behaves. There are several risks you'll only uncover by working with the real thing:
API Discrepancies: The real Figma API might have slightly different data structures, naming conventions, or limitations compared to your mock. Building new features on a potentially inaccurate mock could lead to significant rework later.
Performance: How fast is the real API? Fetching hundreds of variables might be slow. You may need to add loading states or optimize how you fetch data. You can't know this without the real integration.
Permissions & Edge Cases: The real API involves user permissions. What happens if the user doesn't have edit rights? What if there are conflicting variable modes? These are real-world complexities your mock service ignores.
Plugin Communication: The communication between the plugin's UI (your React app in an <iframe>) and the plugin's main code (which has access to the figma API) happens via postMessage. This asynchronous bridge has its own set of challenges that need to be solved first.
3. Real Data Informs Better Features
Once you have a real data connection, you can design better, more robust features.
You might discover that the Figma API provides extra metadata (like where a variable is used) that could inspire a powerful new feature.
Conversely, you might find that a planned feature (like token aliasing) is much more complex to implement with the real API, allowing you to re-prioritize it.
Building features with real, live data from Figma ensures that what you're building is practical and grounded in reality.
A Recommended Strategic Roadmap
Here is a step-by-step plan for moving forward:
Step 1: Build the Bridge (Plugin Boilerplate).
Set up the basic Figma plugin structure with a manifest.json and a code.ts file.
Your goal is to get your React application to load inside the Figma plugin window.
Establish the basic postMessage communication. Make the UI send a "hello" message to code.ts and have code.ts log it and send a "world" message back.
Step 2: Implement Read-Only Sync.
Modify figmaService.ts. Instead of returning mock data, have getVariableCollections send a message to code.ts.
In code.ts, listen for that message, call the real figma.variables.getLocalVariableCollectionsAsync(), and send the result back to the UI.
Update your UI to correctly display the real data. This is a huge milestone. Your app is now a real Figma data viewer.
Step 3: Implement Write Sync (Complete the MVP).
Modify the updateVariable function in your service to send the updated token data to code.ts.
In code.ts, write the logic to find the corresponding Figma variable by its ID and update its value.
Test this thoroughly. Once you can edit a token in your UI and see the change reflected in Figma's native "Local Variables" panel, you have a true Minimum Viable Product (MVP).
Step 4: Now, Add Enhancements.
With the core sync functionality proven and stable, you can now confidently add all the other features on your roadmap:
Create/Delete Tokens
Token Aliasing
Export to CSS/JSON
Advanced filtering and searching
In conclusion, think of the plugin integration as the foundation of a house. It would be foolish to start decorating the walls and buying furniture before you've poured the concrete and built the frame. Solidify your foundation first, and the rest of the construction will be much smoother and more successfully.