import { TransactionProvider } from './features/transactions/transaction.context'
import TransactionForm from './features/transactions/TransactionForm'

function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <h1 className="text-2xl font-bold p-4 text-center">
          TrackMiFi
        </h1>

        <TransactionForm />
      </div>
    </TransactionProvider>
  )
}

export default App
