export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">TrackMiFi</h2>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => setActivePage('summary')}
          className={`text-left p-2 rounded ${
            activePage === 'summary'
              ? 'bg-black text-white'
              : 'hover:bg-gray-200'
          }`}
        >
          📊 Summary
        </button>

        <button
          onClick={() => setActivePage('transactions')}
          className={`text-left p-2 rounded ${
            activePage === 'transactions'
              ? 'bg-black text-white'
              : 'hover:bg-gray-200'
          }`}
        >
          💸 Transactions
        </button>
      </nav>
    </aside>
  )
}
