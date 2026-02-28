import Layout from './layout/Layout'
import { TransactionProvider } from './features/transactions/transaction.context'
import { ExpectedExpenseProvider } from './features/expectedExpenses/expectedExpense.context'

function App() {
  return (
    <TransactionProvider>
      <ExpectedExpenseProvider>
        <Layout />
      </ExpectedExpenseProvider>
    </TransactionProvider>
  )
}

export default App