/**
 * Core type definitions for the Figma Token Sync tool
 */

// Base token types
export type TokenType =
  | "color"
  | "spacing"
  | "typography"
  | "radius"
  | "shadow"
  | "gradient";

// Token value types
export interface ColorValue {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface SpacingValue {
  value: number;
  unit: "px" | "rem" | "em";
}

export interface TypographyValue {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface RadiusValue {
  value: number;
  unit: "px" | "rem" | "%";
}

export interface ShadowValue {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: ColorValue;
}

export type TokenValue =
  | ColorValue
  | SpacingValue
  | TypographyValue
  | RadiusValue
  | ShadowValue
  | string;

// Base token interface
export interface Token {
  id: string;
  name: string;
  type: TokenType;
  value: TokenValue;
  description?: string;
  scopes?: string[];
  alias?: string; // Reference to another token
}

// Specific token types
export interface ColorToken extends Token {
  type: "color";
  value: ColorValue;
}

export interface SpacingToken extends Token {
  type: "spacing";
  value: SpacingValue;
}

export interface TypographyToken extends Token {
  type: "typography";
  value: TypographyValue;
}

export interface RadiusToken extends Token {
  type: "radius";
  value: RadiusValue;
}

export interface ShadowToken extends Token {
  type: "shadow";
  value: ShadowValue;
}

// Token collection (corresponds to a Figma variable collection)
export interface TokenCollection {
  id: string;
  name: string;
  description?: string;
  tokens: Token[];
}

// Figma API response types
export interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: string;
  valuesByMode: Record<
    string,
    ColorValue | SpacingValue | TypographyValue | RadiusValue | string | number
  >;
  scopes?: string[];
  description?: string;
}

export interface FigmaVariableCollection {
  id: string;
  name: string;
  key: string;
  modes: Array<{
    modeId: string;
    name: string;
  }>;
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing: boolean;
}

// Update operation types
export interface TokenUpdate {
  tokenId: string;
  field: "name" | "value" | "description";
  newValue: TokenValue | string;
}

export interface SyncResult {
  success: boolean;
  updated: number;
  created: number;
  deleted: number;
  errors?: string[];
}

// UI state types
export interface EditState {
  tokenId: string;
  field: string;
  isEditing: boolean;
}
