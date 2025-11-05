import { TokenCollection, TokenUpdate, Token, TokenValue } from "../types";
import ColorTokenCard from "./ColorTokenCard";
import SpacingTokenCard from "./SpacingTokenCard";
import TypographyTokenCard from "./TypographyTokenCard";
import RadiusTokenCard from "./RadiusTokenCard";

interface TokenGridProps {
  collection: TokenCollection;
  onUpdateToken: (update: TokenUpdate) => void;
  onCreateToken: (collectionId: string, tokenType: string) => void;
  onDeleteToken: (tokenId: string) => void;
}

export default function TokenGrid({
  collection,
  onUpdateToken,
  onCreateToken,
  onDeleteToken,
}: TokenGridProps) {
  const renderTokenCard = (token: Token) => {
    const commonProps = {
      token,
      onUpdate: (field: string, value: TokenValue | string) => {
        onUpdateToken({
          tokenId: token.id,
          field: field as "name" | "value" | "description",
          newValue: value,
        });
      },
      onDelete: () => onDeleteToken(token.id),
    };

    switch (token.type) {
      case "color":
        return <ColorTokenCard key={token.id} {...commonProps} />;
      case "spacing":
        return <SpacingTokenCard key={token.id} {...commonProps} />;
      case "typography":
        return <TypographyTokenCard key={token.id} {...commonProps} />;
      case "radius":
        return <RadiusTokenCard key={token.id} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
          {collection.description && (
            <p className="text-slate-400 mt-1">{collection.description}</p>
          )}
        </div>

        <button
          onClick={() => {
            // Determine token type from collection name or show a modal
            const tokenType = collection.name.toLowerCase().replace(/s$/, "");
            onCreateToken(collection.id, tokenType);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Token
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collection.tokens.map((token) => renderTokenCard(token))}
      </div>

      {collection.tokens.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No tokens in this collection. Click "Add Token" to create one.
        </div>
      )}
    </div>
  );
}
