/**
 * Figma API Service
 *
 * This service handles all communication with the Figma API.
 * Currently uses mock data for development, but can be easily
 * extended to use the real Figma REST API or Plugin API.
 */

import {
  TokenCollection,
  Token,
  ColorValue,
  SpacingValue,
  TypographyValue,
  RadiusValue,
  TokenType,
  TokenValue,
  ShadowValue,
} from "../types";

// Mock data for development
const mockCollections: TokenCollection[] = [
  {
    id: "col-1",
    name: "Colors",
    description: "Brand and semantic color tokens",
    tokens: [
      {
        id: "token-1",
        name: "primary",
        type: "color",
        value: { r: 99, g: 102, b: 241, a: 1 } as ColorValue,
        description: "Primary brand color",
        scopes: ["ALL_FILLS", "ALL_STROKES"],
      },
      {
        id: "token-2",
        name: "secondary",
        type: "color",
        value: { r: 236, g: 72, b: 153, a: 1 } as ColorValue,
        description: "Secondary brand color",
        scopes: ["ALL_FILLS", "ALL_STROKES"],
      },
      {
        id: "token-3",
        name: "success",
        type: "color",
        value: { r: 34, g: 197, b: 94, a: 1 } as ColorValue,
        description: "Success state color",
        scopes: ["ALL_FILLS", "ALL_STROKES"],
      },
      {
        id: "token-4",
        name: "warning",
        type: "color",
        value: { r: 251, g: 191, b: 36, a: 1 } as ColorValue,
        description: "Warning state color",
        scopes: ["ALL_FILLS", "ALL_STROKES"],
      },
      {
        id: "token-5",
        name: "error",
        type: "color",
        value: { r: 239, g: 68, b: 68, a: 1 } as ColorValue,
        description: "Error state color",
        scopes: ["ALL_FILLS", "ALL_STROKES"],
      },
      {
        id: "token-6",
        name: "background",
        type: "color",
        value: { r: 15, g: 23, b: 42, a: 1 } as ColorValue,
        description: "Background color",
        scopes: ["ALL_FILLS"],
      },
    ],
  },
  {
    id: "col-2",
    name: "Spacing",
    description: "Spacing scale tokens",
    tokens: [
      {
        id: "token-7",
        name: "xs",
        type: "spacing",
        value: { value: 4, unit: "px" } as SpacingValue,
        description: "Extra small spacing",
      },
      {
        id: "token-8",
        name: "sm",
        type: "spacing",
        value: { value: 8, unit: "px" } as SpacingValue,
        description: "Small spacing",
      },
      {
        id: "token-9",
        name: "md",
        type: "spacing",
        value: { value: 16, unit: "px" } as SpacingValue,
        description: "Medium spacing",
      },
      {
        id: "token-10",
        name: "lg",
        type: "spacing",
        value: { value: 24, unit: "px" } as SpacingValue,
        description: "Large spacing",
      },
      {
        id: "token-11",
        name: "xl",
        type: "spacing",
        value: { value: 32, unit: "px" } as SpacingValue,
        description: "Extra large spacing",
      },
    ],
  },
  {
    id: "col-3",
    name: "Typography",
    description: "Font family, size, and weight tokens",
    tokens: [
      {
        id: "token-12",
        name: "heading-1",
        type: "typography",
        value: {
          fontFamily: "Inter",
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: -0.5,
        } as TypographyValue,
        description: "Main heading style",
      },
      {
        id: "token-13",
        name: "heading-2",
        type: "typography",
        value: {
          fontFamily: "Inter",
          fontSize: 36,
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: -0.25,
        } as TypographyValue,
        description: "Secondary heading style",
      },
      {
        id: "token-14",
        name: "body",
        type: "typography",
        value: {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: 0,
        } as TypographyValue,
        description: "Body text style",
      },
      {
        id: "token-15",
        name: "caption",
        type: "typography",
        value: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: 0.25,
        } as TypographyValue,
        description: "Caption text style",
      },
    ],
  },
  {
    id: "col-4",
    name: "Border Radius",
    description: "Border radius tokens",
    tokens: [
      {
        id: "token-16",
        name: "none",
        type: "radius",
        value: { value: 0, unit: "px" } as RadiusValue,
        description: "No border radius",
      },
      {
        id: "token-17",
        name: "sm",
        type: "radius",
        value: { value: 4, unit: "px" } as RadiusValue,
        description: "Small border radius",
      },
      {
        id: "token-18",
        name: "md",
        type: "radius",
        value: { value: 8, unit: "px" } as RadiusValue,
        description: "Medium border radius",
      },
      {
        id: "token-19",
        name: "lg",
        type: "radius",
        value: { value: 16, unit: "px" } as RadiusValue,
        description: "Large border radius",
      },
      {
        id: "token-20",
        name: "full",
        type: "radius",
        value: { value: 9999, unit: "px" } as RadiusValue,
        description: "Fully rounded",
      },
    ],
  },
];

class FigmaService {
  // These will be used when connecting to real Figma API
  // @ts-expect-error - Used in commented real API implementation
  private apiToken: string | null = null;
  // @ts-expect-error - Used in commented real API implementation
  private fileKey: string | null = null;

  /**
   * Configure the service with Figma API credentials
   */
  configure(apiToken: string, fileKey: string) {
    this.apiToken = apiToken;
    this.fileKey = fileKey;
  }

  /**
   * Get all variable collections from Figma
   */
  async getVariableCollections(): Promise<TokenCollection[]> {
    // TODO: Replace with real API call
    // const response = await fetch(
    //   `https://api.figma.com/v1/files/${this.fileKey}/variables/local`,
    //   {
    //     headers: {
    //       'X-Figma-Token': this.apiToken,
    //     },
    //   }
    // )
    // const data = await response.json()
    // return this.transformFigmaData(data)

    // Mock delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCollections;
  }

  /**
   * Update a variable in Figma
   */
  async updateVariable(
    tokenId: string,
    field: "name" | "value" | "description",
    newValue: string | TokenValue
  ): Promise<Partial<Token>> {
    // TODO: Replace with real API call
    // const response = await fetch(
    //   `https://api.figma.com/v1/files/${this.fileKey}/variables/${tokenId}`,
    //   {
    //     method: 'PUT',
    //     headers: {
    //       'X-Figma-Token': this.apiToken,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ [field]: newValue }),
    //   }
    // )
    // return await response.json()

    // Mock delay - tokenId used in real implementation
    console.log("Updating token:", tokenId, field);
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { [field]: newValue };
  }

  /**
   * Create a new variable in Figma
   */
  async createVariable(
    collectionId: string,
    tokenType: TokenType
  ): Promise<Token> {
    // TODO: Replace with real API call

    // Mock implementation - collectionId used in real implementation
    console.log(
      "Creating variable in collection:",
      collectionId,
      "type:",
      tokenType
    );
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newId = `token-${Date.now()}`;
    const defaultValues: Record<TokenType, TokenValue> = {
      color: { r: 128, g: 128, b: 128, a: 1 } as ColorValue,
      spacing: { value: 16, unit: "px" } as SpacingValue,
      typography: {
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: 0,
      } as TypographyValue,
      radius: { value: 8, unit: "px" } as RadiusValue,
      shadow: {
        x: 0,
        y: 2,
        blur: 4,
        spread: 0,
        color: { r: 0, g: 0, b: 0, a: 0.1 },
      } as ShadowValue,
      gradient: "linear-gradient(90deg, #000 0%, #fff 100%)",
    };

    return {
      id: newId,
      name: `new-${tokenType}`,
      type: tokenType,
      value: defaultValues[tokenType],
      description: `New ${tokenType} token`,
    };
  }

  /**
   * Delete a variable from Figma
   */
  async deleteVariable(tokenId: string): Promise<void> {
    // TODO: Replace with real API call
    // await fetch(
    //   `https://api.figma.com/v1/files/${this.fileKey}/variables/${tokenId}`,
    //   {
    //     method: 'DELETE',
    //     headers: {
    //       'X-Figma-Token': this.apiToken,
    //     },
    //   }
    // )

    // Mock delay - tokenId used in real implementation
    console.log("Deleting token:", tokenId);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  /**
   * Transform Figma API response to our Token format
   * This will be used when connecting to real API
   * @param _figmaData - Figma API response (unused in mock, used in real implementation)
   */
  // @ts-expect-error - Placeholder for future real API implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private transformFigmaData(_figmaData: unknown): TokenCollection[] {
    // TODO: Implement transformation from Figma API format to our format
    // This is a placeholder for when real API is connected
    return [];
  }
}

export const figmaService = new FigmaService();
