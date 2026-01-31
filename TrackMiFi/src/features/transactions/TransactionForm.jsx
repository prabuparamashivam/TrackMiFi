import { useState } from 'react'
import { useTransactions } from './transaction.context'
import { useExpectedExpenses } from '../expectedExpenses/expectedExpense.context'


export default function TransactionForm() {
  const { addTransaction, loading, error } = useTransactions()
  const { expectedExpenses } = useExpectedExpenses()

  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [expectedExpenseId, setExpectedExpenseId] = useState('')

  

  async function handleSubmit(e) {
    e.preventDefault()

    try {
    await addTransaction({
      type,
      amount: Number(amount),
      category,
      expectedExpenseId: expectedExpenseId
        ? Number(expectedExpenseId)
        : null,
      date,
    })


      // reset form
      setAmount('')
      setCategory('')
      setDate('')
      setExpectedExpenseId('')
    } catch (err) {
      // error already handled in context
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow max-w-md mx-auto mt-6"
    >
      <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

      {/* Type */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* Link to Expected Expense */}
      {type === 'expense' && expectedExpenses.length > 0 && (
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Link to Expected Expense (optional)
          </label>

          <select
            value={expectedExpenseId}
            onChange={(e) => setExpectedExpenseId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Not linked --</option>

            {expectedExpenses.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} (₹{item.expectedAmount})
              </option>
            ))}
          </select>
        </div>
      )}


      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Add Transaction'}
       

      </button>
      
    </form>
  )
}
