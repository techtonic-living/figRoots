interface HeaderProps {
  onSync: () => void;
  isSyncing: boolean;
}

export default function Header({ onSync, isSyncing }: HeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Figma Token Sync</h1>
          <p className="text-sm text-slate-400 mt-1">
            Bi-directional design token management
          </p>
        </div>

        <button
          onClick={onSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <svg
            className={`w-5 h-5 ${isSyncing ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isSyncing ? "Syncing..." : "Sync Now"}
        </button>
      </div>
    </header>
  );
}
