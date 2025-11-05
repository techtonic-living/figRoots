import { useState, useEffect, useCallback } from "react";
import { TokenCollection, TokenUpdate, TokenType } from "./types";
import { figmaService } from "./services/figmaService";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TokenGrid from "./components/TokenGrid";

function App() {
  const [collections, setCollections] = useState<TokenCollection[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCollections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await figmaService.getVariableCollections();
      setCollections(data);
      if (data.length > 0 && !activeCollectionId) {
        setActiveCollectionId(data[0].id);
      }
    } catch (err) {
      setError("Failed to load collections");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCollectionId]);

  // Fetch collections on mount
  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  const handleSync = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      await loadCollections();
    } catch (err) {
      setError("Sync failed");
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateToken = useCallback(async (update: TokenUpdate) => {
    try {
      const updatedToken = await figmaService.updateVariable(
        update.tokenId,
        update.field,
        update.newValue
      );

      // Update local state optimistically
      setCollections((prev) =>
        prev.map((collection) => ({
          ...collection,
          tokens: collection.tokens.map((token) =>
            token.id === update.tokenId ? { ...token, ...updatedToken } : token
          ),
        }))
      );
    } catch (err) {
      setError("Failed to update token");
      console.error(err);
    }
  }, []);

  const handleCreateToken = useCallback(
    async (collectionId: string, tokenType: string) => {
      try {
        // Type assertion needed for mock - in real implementation, ensure tokenType is valid
        const newToken = await figmaService.createVariable(
          collectionId,
          tokenType as TokenType
        );

        setCollections((prev) =>
          prev.map((collection) =>
            collection.id === collectionId
              ? { ...collection, tokens: [...collection.tokens, newToken] }
              : collection
          )
        );
      } catch (err) {
        setError("Failed to create token");
        console.error(err);
      }
    },
    []
  );

  const handleDeleteToken = useCallback(async (tokenId: string) => {
    try {
      await figmaService.deleteVariable(tokenId);

      setCollections((prev) =>
        prev.map((collection) => ({
          ...collection,
          tokens: collection.tokens.filter((token) => token.id !== tokenId),
        }))
      );
    } catch (err) {
      setError("Failed to delete token");
      console.error(err);
    }
  }, []);

  const activeCollection = collections.find((c) => c.id === activeCollectionId);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header onSync={handleSync} isSyncing={isSyncing} />

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mx-6 mt-4 rounded">
          {error}
        </div>
      )}

      <div className="flex">
        <Sidebar
          collections={collections}
          activeCollectionId={activeCollectionId}
          onSelectCollection={setActiveCollectionId}
          isLoading={isLoading}
        />

        <main className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-400">Loading collections...</div>
            </div>
          ) : activeCollection ? (
            <TokenGrid
              collection={activeCollection}
              onUpdateToken={handleUpdateToken}
              onCreateToken={handleCreateToken}
              onDeleteToken={handleDeleteToken}
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-400">No collection selected</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
