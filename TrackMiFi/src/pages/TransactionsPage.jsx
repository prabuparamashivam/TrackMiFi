import TransactionForm from "../features/transactions/TransactionForm";
import ExpectedExpensesPage from "../features/expectedExpenses/ExpectedExpensesPage";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <TransactionForm />
      <ExpectedExpensesPage />
    </div>
  )
}