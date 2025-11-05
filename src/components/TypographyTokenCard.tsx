import { Token, TypographyValue, TokenValue } from "../types";
import EditableInput from "./EditableInput";

interface TypographyTokenCardProps {
  token: Token;
  onUpdate: (field: string, value: TokenValue | string) => void;
  onDelete: () => void;
}

export default function TypographyTokenCard({
  token,
  onUpdate,
  onDelete,
}: TypographyTokenCardProps) {
  const typographyValue = token.value as TypographyValue;

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <EditableInput
          value={token.name}
          onSave={(value) => onUpdate("name", value)}
          className="font-mono text-sm font-semibold"
        />
        <button
          onClick={onDelete}
          className="text-slate-500 hover:text-red-500 transition-colors"
          title="Delete token"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div
        className="h-24 mb-3 flex items-center justify-center text-center border border-slate-700 rounded-lg px-2 overflow-hidden"
        style={{
          fontFamily: typographyValue.fontFamily,
          fontSize: `${Math.min(typographyValue.fontSize, 32)}px`,
          fontWeight: typographyValue.fontWeight,
          lineHeight: typographyValue.lineHeight,
          letterSpacing: `${typographyValue.letterSpacing}px`,
        }}
      >
        Aa
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 w-20">Font</span>
          <EditableInput
            value={typographyValue.fontFamily}
            onSave={(value) =>
              onUpdate("value", { ...typographyValue, fontFamily: value })
            }
            className="flex-1"
            inputClassName="w-full text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-20">Size</span>
            <EditableInput
              value={typographyValue.fontSize.toString()}
              onSave={(value) =>
                onUpdate("value", {
                  ...typographyValue,
                  fontSize: parseInt(value) || 16,
                })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-20">Weight</span>
            <EditableInput
              value={typographyValue.fontWeight.toString()}
              onSave={(value) =>
                onUpdate("value", {
                  ...typographyValue,
                  fontWeight: parseInt(value) || 400,
                })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-20">Line H.</span>
            <EditableInput
              value={typographyValue.lineHeight.toString()}
              onSave={(value) =>
                onUpdate("value", {
                  ...typographyValue,
                  lineHeight: parseFloat(value) || 1.5,
                })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-20">Letter S.</span>
            <EditableInput
              value={typographyValue.letterSpacing.toString()}
              onSave={(value) =>
                onUpdate("value", {
                  ...typographyValue,
                  letterSpacing: parseFloat(value) || 0,
                })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>
        </div>
      </div>

      {token.description && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <EditableInput
            value={token.description}
            onSave={(value) => onUpdate("description", value)}
            className="text-xs text-slate-400"
            placeholder="Add description..."
          />
        </div>
      )}
    </div>
  );
}
