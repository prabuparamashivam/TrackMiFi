import { useState, useMemo, useEffect } from 'react'

import { useExpectedExpenses } from './expectedExpense.context'

export default function ExpectedExpensesPage() {
  const {
    expectedExpenses,
    addExpectedExpense,
    loading,
    error,
    month,
    year,
    editingExpense,
    updateExpectedExpense,
    clearEdit,
  } = useExpectedExpenses()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [expectedAmount, setExpectedAmount] = useState('')
  const [description, setDescription] = useState('')


  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name)
      setCategory(editingExpense.category)
      setExpectedAmount(editingExpense.expectedAmount)
      setDescription(editingExpense.description)
    } else {
      setName('')
      setCategory('')
      setExpectedAmount('')
      setDescription('')
    }
  }, [editingExpense]);


  async function handleSubmit(e) {
    e.preventDefault()

    if (editingExpense) {
      await updateExpectedExpense({
        id: editingExpense.id,
        name: name,
        category: category,
        description: description,
        expectedAmount: Number(expectedAmount),
      })

      clearEdit()

    }
    else {
      await addExpectedExpense({
        name,
        category,
        expectedAmount: Number(expectedAmount),
        description,
      })
    }

    // reset form
    setName('')
    setCategory('')
    setExpectedAmount('')
    setDescription('')
  }

  // 💰 Monthly total (derived data)
  const totalExpected = useMemo(() => {
    return expectedExpenses.reduce(
      (sum, item) => sum + item.expectedAmount,
      0
    )
  }, [expectedExpenses])

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h2 className="text-xl font-semibold mb-4">
        Expected Expenses – {month + 1}/{year}
      </h2>

      {/* Add Expected Expense */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Expense name (Rent, Internet...)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Expected amount"
            value={expectedAmount}
            onChange={(e) => setExpectedAmount(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2">
            {error}
          </p>
        )}

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {editingExpense ? 'Update Expected Expense' : 'Add Expected Expense'}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={clearEdit}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>


      </form>

      {/* Expected Expense List */}
      <div className="bg-white rounded shadow">
        <div className="p-4 border-b font-medium">
          Expected Expenses List
        </div>

        {expectedExpenses.length === 0 ? (
          <p className="p-4 text-gray-500">
            No expected expenses for this month.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Expected</th>
              </tr>
            </thead>
            <tbody>
              {expectedExpenses.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2 text-right">
                    ₹ {item.expectedAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Total */}
        <div className="p-4 border-t font-semibold text-right">
          Total Expected: ₹ {totalExpected}
        </div>
      </div>
    </div>
  )
}
