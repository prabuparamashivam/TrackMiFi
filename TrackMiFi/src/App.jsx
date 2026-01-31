import { TransactionProvider } from './features/transactions/transaction.context'
import { ExpectedExpenseProvider } from './features/expectedExpenses/expectedExpense.context'

import TransactionForm from './features/transactions/TransactionForm'
import MonthlySummary from './features/summary/MonthlySummary'
import ExpectedExpensesPage from './features/expectedExpenses/ExpectedExpensesPage'
import ExpectedExpensesDashboard from './features/expectedExpenses/ExpectedExpensesDashboard'


function App() {
  return (
    <TransactionProvider>
      <ExpectedExpenseProvider>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <h1 className="text-2xl font-bold p-4 text-center">
            TrackMiFi
          </h1>

          <TransactionForm />
          <MonthlySummary />
          <ExpectedExpensesPage/>
          <ExpectedExpensesDashboard />

          {/* Expected Expenses UI will come here next */}
        </div>
      </ExpectedExpenseProvider>
    </TransactionProvider>
  )
}

export default App
