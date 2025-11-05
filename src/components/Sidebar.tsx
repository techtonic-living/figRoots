import { TokenCollection } from "../types";

interface SidebarProps {
  collections: TokenCollection[];
  activeCollectionId: string | null;
  onSelectCollection: (id: string) => void;
  isLoading: boolean;
}

export default function Sidebar({
  collections,
  activeCollectionId,
  onSelectCollection,
  isLoading,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-[calc(100vh-73px)]">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Collections
        </h2>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 bg-slate-700 rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <nav className="space-y-1">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => onSelectCollection(collection.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCollectionId === collection.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <div className="font-medium">{collection.name}</div>
                {collection.description && (
                  <div className="text-xs mt-1 opacity-75">
                    {collection.description}
                  </div>
                )}
              </button>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
