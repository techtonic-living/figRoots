# Figma API Integration Guide

This document provides detailed instructions for integrating the Figma Token Sync tool with the real Figma REST API.

## Overview

The tool currently uses mock data in `figmaService.ts`. This guide shows you how to replace the mock implementation with real Figma API calls.

## Prerequisites

1. **Figma Account** - Professional or higher for Variables API access
2. **Personal Access Token** - Generate from Figma account settings
3. **File Key** - From your Figma file URL

## Figma Variables REST API Endpoints

### Base URL

```
https://api.figma.com/v1
```

### Required Headers

```typescript
{
  'X-Figma-Token': 'your-personal-access-token',
  'Content-Type': 'application/json'
}
```

## API Endpoints

### 1. Get Local Variables

Retrieve all variable collections and variables from a file.

**Endpoint:** `GET /files/:file_key/variables/local`

**Response:**

```typescript
{
  "status": 200,
  "error": false,
  "meta": {
    "variableCollections": {
      "collection_id": {
        "id": "collection_id",
        "name": "Colors",
        "key": "unique_key",
        "modes": [{
          "modeId": "mode_id",
          "name": "Mode 1"
        }],
        "defaultModeId": "mode_id",
        "remote": false,
        "hiddenFromPublishing": false
      }
    },
    "variables": {
      "variable_id": {
        "id": "variable_id",
        "name": "primary-color",
        "key": "unique_key",
        "variableCollectionId": "collection_id",
        "resolvedType": "COLOR",
        "valuesByMode": {
          "mode_id": {
            "r": 0.39,
            "g": 0.40,
            "b": 0.95,
            "a": 1
          }
        },
        "scopes": ["ALL_FILLS", "ALL_STROKES"],
        "description": "Primary brand color"
      }
    }
  }
}
```

### 2. Update Variable (POST)

Update an existing variable's properties.

**Endpoint:** `POST /files/:file_key/variables/:variable_id`

**Request Body:**

```typescript
{
  "name": "new-name",
  "description": "Updated description",
  "valuesByMode": {
    "mode_id": {
      "r": 0.5,
      "g": 0.5,
      "b": 0.5,
      "a": 1
    }
  }
}
```

### 3. Create Variable (POST)

Create a new variable in a collection.

**Endpoint:** `POST /files/:file_key/variables`

**Request Body:**

```typescript
{
  "variableCollectionId": "collection_id",
  "name": "new-variable",
  "resolvedType": "COLOR",
  "valuesByMode": {
    "mode_id": {
      "r": 0.5,
      "g": 0.5,
      "b": 0.5,
      "a": 1
    }
  },
  "scopes": ["ALL_FILLS"]
}
```

### 4. Delete Variable (DELETE)

Remove a variable from the file.

**Endpoint:** `DELETE /files/:file_key/variables/:variable_id`

## Implementation Example

### Step 1: Environment Variables

Create `.env` file in project root:

```bash
VITE_FIGMA_TOKEN=your_figma_personal_access_token
VITE_FIGMA_FILE_KEY=your_figma_file_key
```

### Step 2: Update figmaService.ts

Replace the mock implementations with real API calls:

```typescript
class FigmaService {
  private apiToken: string;
  private fileKey: string;
  private baseUrl = "https://api.figma.com/v1";

  constructor() {
    this.apiToken = import.meta.env.VITE_FIGMA_TOKEN || "";
    this.fileKey = import.meta.env.VITE_FIGMA_FILE_KEY || "";
  }

  private async fetchFigma(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "X-Figma-Token": this.apiToken,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getVariableCollections(): Promise<TokenCollection[]> {
    const data = await this.fetchFigma(
      `/files/${this.fileKey}/variables/local`
    );
    return this.transformFigmaData(data);
  }

  async updateVariable(
    tokenId: string,
    field: "name" | "value" | "description",
    newValue: any
  ): Promise<Partial<Token>> {
    const body: any = {};

    if (field === "name") {
      body.name = newValue;
    } else if (field === "description") {
      body.description = newValue;
    } else if (field === "value") {
      // Transform our value format to Figma's format
      body.valuesByMode = {
        [this.defaultModeId]: this.transformValueToFigma(newValue),
      };
    }

    await this.fetchFigma(`/files/${this.fileKey}/variables/${tokenId}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return { [field]: newValue };
  }

  async createVariable(
    collectionId: string,
    tokenType: TokenType
  ): Promise<Token> {
    const resolvedType = this.mapTokenTypeToFigma(tokenType);
    const defaultValue = this.getDefaultValueForType(tokenType);

    const body = {
      variableCollectionId: collectionId,
      name: `new-${tokenType}`,
      resolvedType,
      valuesByMode: {
        [this.defaultModeId]: this.transformValueToFigma(defaultValue),
      },
      scopes: this.getDefaultScopes(tokenType),
    };

    const response = await this.fetchFigma(`/files/${this.fileKey}/variables`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return this.transformFigmaVariable(response);
  }

  async deleteVariable(tokenId: string): Promise<void> {
    await this.fetchFigma(`/files/${this.fileKey}/variables/${tokenId}`, {
      method: "DELETE",
    });
  }

  private transformFigmaData(figmaData: any): TokenCollection[] {
    const collections: TokenCollection[] = [];

    // Transform collections
    for (const [id, collection] of Object.entries(
      figmaData.meta.variableCollections
    )) {
      const col = collection as any;

      // Get all variables for this collection
      const tokens = Object.values(figmaData.meta.variables)
        .filter((v: any) => v.variableCollectionId === id)
        .map((v: any) => this.transformFigmaVariable(v));

      collections.push({
        id: col.id,
        name: col.name,
        description: "",
        tokens,
      });
    }

    return collections;
  }

  private transformFigmaVariable(figmaVar: any): Token {
    const modeId = Object.keys(figmaVar.valuesByMode)[0];
    const rawValue = figmaVar.valuesByMode[modeId];

    return {
      id: figmaVar.id,
      name: figmaVar.name,
      type: this.mapFigmaTypeToToken(figmaVar.resolvedType),
      value: this.transformFigmaValue(rawValue, figmaVar.resolvedType),
      description: figmaVar.description || "",
      scopes: figmaVar.scopes,
    };
  }

  private mapFigmaTypeToToken(figmaType: string): TokenType {
    const mapping: Record<string, TokenType> = {
      COLOR: "color",
      FLOAT: "spacing",
      STRING: "typography",
    };
    return mapping[figmaType] || "color";
  }

  private mapTokenTypeToFigma(tokenType: TokenType): string {
    const mapping: Record<TokenType, string> = {
      color: "COLOR",
      spacing: "FLOAT",
      typography: "STRING",
      radius: "FLOAT",
      shadow: "STRING",
      gradient: "STRING",
    };
    return mapping[tokenType];
  }

  private transformFigmaValue(value: any, type: string): TokenValue {
    if (type === "COLOR") {
      return {
        r: Math.round(value.r * 255),
        g: Math.round(value.g * 255),
        b: Math.round(value.b * 255),
        a: value.a,
      } as ColorValue;
    }
    // Add other type transformations
    return value;
  }

  private transformValueToFigma(value: any): any {
    if ("r" in value && "g" in value && "b" in value) {
      // Color value
      return {
        r: value.r / 255,
        g: value.g / 255,
        b: value.b / 255,
        a: value.a,
      };
    }
    return value;
  }

  private getDefaultScopes(tokenType: TokenType): string[] {
    const scopes: Record<TokenType, string[]> = {
      color: ["ALL_FILLS", "ALL_STROKES"],
      spacing: ["WIDTH_HEIGHT", "GAP"],
      typography: ["TEXT_CONTENT"],
      radius: ["CORNER_RADIUS"],
      shadow: ["EFFECT_COLOR"],
      gradient: ["ALL_FILLS"],
    };
    return scopes[tokenType];
  }
}
```

### Step 3: Update .gitignore

Add environment variables to `.gitignore`:

```
.env
.env.local
```

### Step 4: Error Handling

Add comprehensive error handling:

```typescript
// In App.tsx or a custom hook
const handleApiError = (error: Error) => {
  if (error.message.includes("401")) {
    setError("Invalid Figma token. Please check your credentials.");
  } else if (error.message.includes("403")) {
    setError("Access denied. Check file permissions.");
  } else if (error.message.includes("404")) {
    setError("File not found. Check the file key.");
  } else {
    setError(`Error: ${error.message}`);
  }
};
```

## Variable Types Mapping

### Figma → App

```typescript
{
  'COLOR': 'color',
  'FLOAT': 'spacing' | 'radius',
  'STRING': 'typography' | 'gradient',
}
```

### Value Transformations

**Color:**

- Figma uses 0-1 range for RGB
- App uses 0-255 range
- Transform: `appValue = figmaValue * 255`

**Spacing/Radius:**

- Figma stores as float
- App stores with unit
- Store unit separately in description or alias

## Testing

### Test with Mock Data First

1. Ensure mock service works correctly
2. Test all CRUD operations
3. Verify UI updates properly

### Test with Real API

1. Use a test Figma file
2. Test read operations first
3. Then test write operations
4. Finally test delete operations

### Rate Limiting

Figma API has rate limits:

- 300 requests per minute per token
- Implement request throttling if needed

## Security Considerations

1. **Never commit tokens** - Use environment variables
2. **Use HTTPS only** - Ensure secure transmission
3. **Token permissions** - Use minimum required scopes
4. **Token rotation** - Regularly rotate access tokens
5. **Error messages** - Don't expose token in errors

## Figma Plugin Alternative

Consider building a Figma plugin instead of using REST API:

**Benefits:**

- Direct access to file data
- No authentication needed
- Real-time updates
- Better performance

**Plugin API Example:**

```typescript
figma.variables.getLocalVariableCollections();
figma.variables.getVariableById(id);
```

## Resources

- [Figma REST API Documentation](https://www.figma.com/developers/api)
- [Figma Variables API](https://www.figma.com/developers/api#variables)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Variables Plugin Examples](https://github.com/figma/plugin-samples)

---

Need help? Check the Figma Developer Community or open an issue in the repository.
