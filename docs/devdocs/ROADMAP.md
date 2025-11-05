# Project Roadmap

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
