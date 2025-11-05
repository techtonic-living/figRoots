import { Token, ColorValue, TokenValue } from "../types";
import EditableInput from "./EditableInput";

interface ColorTokenCardProps {
  token: Token;
  onUpdate: (field: string, value: TokenValue | string) => void;
  onDelete: () => void;
}

export default function ColorTokenCard({
  token,
  onUpdate,
  onDelete,
}: ColorTokenCardProps) {
  const colorValue = token.value as ColorValue;

  const rgbaString = `rgba(${colorValue.r}, ${colorValue.g}, ${colorValue.b}, ${colorValue.a})`;
  const hexString = rgbaToHex(colorValue);

  function rgbaToHex(color: ColorValue): string {
    const toHex = (n: number) => {
      const hex = Math.round(n).toString(16).padStart(2, "0");
      return hex;
    };
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }

  function hexToRgba(hex: string): ColorValue {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1,
        }
      : colorValue;
  }

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
        className="w-full h-24 rounded-lg mb-3 border border-slate-600"
        style={{ backgroundColor: rgbaString }}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 w-12">HEX</span>
          <EditableInput
            value={hexString}
            onSave={(value) => onUpdate("value", hexToRgba(value))}
            className="flex-1 font-mono text-xs"
            inputClassName="w-full font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs">
          <div>
            <div className="text-slate-400 mb-1">R</div>
            <EditableInput
              value={colorValue.r.toString()}
              onSave={(value) =>
                onUpdate("value", { ...colorValue, r: parseInt(value) || 0 })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>
          <div>
            <div className="text-slate-400 mb-1">G</div>
            <EditableInput
              value={colorValue.g.toString()}
              onSave={(value) =>
                onUpdate("value", { ...colorValue, g: parseInt(value) || 0 })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>
          <div>
            <div className="text-slate-400 mb-1">B</div>
            <EditableInput
              value={colorValue.b.toString()}
              onSave={(value) =>
                onUpdate("value", { ...colorValue, b: parseInt(value) || 0 })
              }
              type="number"
              inputClassName="w-full text-xs"
            />
          </div>
          <div>
            <div className="text-slate-400 mb-1">A</div>
            <EditableInput
              value={colorValue.a.toString()}
              onSave={(value) =>
                onUpdate("value", { ...colorValue, a: parseFloat(value) || 1 })
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
