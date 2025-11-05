# MCP Configuration Guide

## ✅ Setup Complete!

Your MCP servers have been configured successfully:

### 1. **Figma MCP Server** (Remote) ✅

- **URL**: https://mcp.figma.com/mcp
- **Version**: 1.0.3
- **Status**: Active
- **Usage**: Use `#get_design_context` in VS Code Agent mode

#### Available Tools:

- `get_design_context` - Extract design variables, components, and layout data
- `generate_code_from_frame` - Turn Figma frames into code
- Code Connect integration for component mapping

#### Rate Limits:

- **Starter/View/Collab**: 6 tool calls per month
- **Dev/Full seat (Pro/Org/Enterprise)**: Per-minute rate limits (Tier 1 REST API)

### 2. **Chrome DevTools MCP** ✅

- **Port**: 9222
- **URL**: http://127.0.0.1:9222
- **Status**: Configured
- **Chrome Channel**: stable

#### Starting Chrome with Remote Debugging:

```bash
# Use the helper script
/Users/jessesmith/Developer/.vscode/scripts/start-chrome-debug.sh

# Or manually:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --remote-debugging-port=9222 \
    --user-data-dir="/tmp/chrome-debug-9222"
```

#### Available Tools:

- Control and inspect live Chrome browser
- Run JavaScript in pages
- Navigate and interact with web content
- Debug web applications

### 3. **Other Active MCPs**

- ✅ GitHub MCP Server
- ✅ Filesystem MCP Server
- ✅ Microsoft Docs MCP

## 🚀 Using the Figma MCP in Your Token Sync Tool

Now you can integrate real Figma API calls into your design token sync tool!

### Quick Integration Steps:

1. **Get Figma File Context**:

   ```typescript
   // In VS Code Agent mode, use:
   #get_design_context;
   ```

2. **Update figmaService.ts**:

   ```typescript
   // Use the Figma REST API with your personal access token
   const FIGMA_TOKEN = process.env.FIGMA_TOKEN
   const FILE_KEY = process.env.FIGMA_FILE_KEY

   async getVariableCollections() {
     const response = await fetch(
       `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
       {
         headers: {
           'X-Figma-Token': FIGMA_TOKEN
         }
       }
     )
     return await response.json()
   }
   ```

3. **Create .env file**:

   ```bash
   cd /Users/jessesmith/Developer/projects/techtonic/brands/figRoots

   # Add to .env:
   VITE_FIGMA_TOKEN=your_figma_personal_access_token
   VITE_FIGMA_FILE_KEY=your_file_key
   ```

4. **Get Your Credentials**:
   - **Personal Access Token**: Figma → Settings → Personal Access Tokens
   - **File Key**: From your Figma file URL: `https://www.figma.com/file/[FILE_KEY]/...`

## 🧪 Testing the Setup

### Test Figma MCP:

1. Open VS Code
2. Press `⌥⌘B` or `⌃⌘I` to open chat
3. Switch to **Agent** mode
4. Type: `#get_design_context`
5. You should see Figma MCP tools listed

### Test Chrome MCP:

1. Start Chrome: `/Users/jessesmith/Developer/.vscode/scripts/start-chrome-debug.sh`
2. In Agent mode, you should have access to Chrome tools
3. Try navigating to your token sync tool: `http://localhost:3000`

## 📝 Configuration Files

Your MCP config is located at:

```
~/Library/Application Support/Code/User/mcp.json
```

## 🔧 Troubleshooting

### Figma MCP Issues:

- Ensure you have a Dev or Full seat for unlimited usage
- Check rate limits if you hit errors
- Verify you're in Dev Mode in Figma

### Chrome MCP Issues:

- Run the start script before using Chrome tools
- Check if port 9222 is available: `lsof -i :9222`
- Restart VS Code after configuration changes

### General MCP Issues:

- Restart VS Code after config changes
- Check MCP logs in VS Code output panel
- Ensure GitHub Copilot is enabled

## 🎯 Next Steps

1. ✅ Figma MCP configured for design context
2. ✅ Chrome MCP configured for browser automation
3. 🔄 Integrate Figma API into your token sync tool
4. 🧪 Test design token extraction from real Figma files
5. 🚀 Build bi-directional sync workflow

---

**Your token sync tool location:**
`/Users/jessesmith/Developer/projects/techtonic/brands/figRoots`

**Running at:** http://localhost:3000/
