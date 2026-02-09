import { useMemo } from 'react'
import { useExpectedExpenses } from './expectedExpense.context'
import { useTransactions } from '../transactions/transaction.context'
import { calculateExpectedExpenseProgress } from './expectedExpenseSummary.service'

export default function ExpectedExpensesDashboard() {
  const { expectedExpenses } = useExpectedExpenses()
  const { transactions } = useTransactions()
  const { startEdit } = useExpectedExpenses()


  const now = new Date()

  const progressData = useMemo(() => {
    return calculateExpectedExpenseProgress(
      expectedExpenses,
      transactions,
      now.getMonth(),
      now.getFullYear()
    )
  }, [expectedExpenses, transactions])


  const totals = useMemo(() => {
    return progressData.reduce(
      (acc, item) => {
        acc.expected += item.expectedAmount
        acc.spent += item.spent
        acc.balance += item.balance
        return acc
      },
      { expected: 0, spent: 0, balance: 0 }
    )
  }, [progressData])

  function getStatusBadge(status) {
    if (status === 'DONE') {
      return (
        <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
          Done
        </span>
      )
    }
    if (status === 'PARTIAL') {
      return (
        <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs">
          Partial
        </span>
      )
    }
    return (
      <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs">
        Not Started
      </span>
    )
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-xl font-semibold mb-4">
        Mandatory Expenses – Progress
      </h2>

      {progressData.length === 0 ? (
        <p className="text-gray-500">
          No expected expenses defined for this month.
        </p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Expense</th>
                <th className="p-2 text-right">Expected</th>
                <th className="p-2 text-right">Spent</th>
                <th className="p-2 text-right">Balance</th>
                <th className="p-2 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {progressData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="text-blue-600 underline"
                    >
                      {item.name}
                    </button>
                  </td>
                  <td className="p-2 text-right">
                    ₹ {item.expectedAmount}
                  </td>
                  <td className="p-2 text-right">
                    ₹ {item.spent}
                  </td>
                  <td
                    className={`p-2 text-right ${item.balance < 0
                        ? 'text-red-600'
                        : 'text-green-700'
                      }`}
                  >
                    ₹ {item.balance}
                  </td>
                  <td className="p-2 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 font-semibold border-t">
              <tr>
                <td className="p-2">Total</td>
                <td className="p-2 text-right">
                  ₹ {totals.expected}
                </td>
                <td className="p-2 text-right">
                  ₹ {totals.spent}
                </td>
                <td className="p-2 text-right">
                  ₹ {totals.balance}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  )
}
