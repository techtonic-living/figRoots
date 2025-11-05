import { Token, SpacingValue, TokenValue } from "../types";
import EditableInput from "./EditableInput";

interface SpacingTokenCardProps {
  token: Token;
  onUpdate: (field: string, value: TokenValue | string) => void;
  onDelete: () => void;
}

export default function SpacingTokenCard({
  token,
  onUpdate,
  onDelete,
}: SpacingTokenCardProps) {
  const spacingValue = token.value as SpacingValue;

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

      <div className="flex items-center justify-center h-24 mb-3">
        <div
          className="bg-indigo-500 rounded"
          style={{
            width: `${Math.min(spacingValue.value, 96)}px`,
            height: `${Math.min(spacingValue.value, 96)}px`,
          }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 w-16">Value</span>
          <EditableInput
            value={spacingValue.value.toString()}
            onSave={(value) =>
              onUpdate("value", {
                ...spacingValue,
                value: parseInt(value) || 0,
              })
            }
            type="number"
            className="flex-1 font-mono text-sm"
            inputClassName="w-full font-mono text-sm"
          />
          <select
            value={spacingValue.unit}
            onChange={(e) =>
              onUpdate("value", {
                ...spacingValue,
                unit: e.target.value as "px" | "rem" | "em",
              })
            }
            className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm"
          >
            <option value="px">px</option>
            <option value="rem">rem</option>
            <option value="em">em</option>
          </select>
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
