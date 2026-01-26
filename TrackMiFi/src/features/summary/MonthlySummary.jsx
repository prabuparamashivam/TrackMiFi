import { useTransactions } from '../transactions/transaction.context'
import { calculateMonthlySummary } from './summary.service'

export default function MonthlySummary() {
  const { transactions } = useTransactions()

  const now = new Date()
  const { income, expense } = calculateMonthlySummary(
    transactions,
    now.getMonth(),
    now.getFullYear()
  )

  return (
    <div className="max-w-md mx-auto mt-6 grid grid-cols-2 gap-4">
      <div className="bg-green-100 p-4 rounded">
        <p className="text-sm text-gray-600">Income</p>
        <p className="text-xl font-bold text-green-700">
          ₹ {income}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded">
        <p className="text-sm text-gray-600">Expense</p>
        <p className="text-xl font-bold text-red-700">
          ₹ {expense}
        </p>
      </div>
    </div>
  )
}
