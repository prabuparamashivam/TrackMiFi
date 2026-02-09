import { createContext, useContext, useEffect, useState } from 'react'
import { ExpectedExpenseService } from './expectedExpense.service'

const ExpectedExpenseContext = createContext(null)

/**
 * Provider
 */
export function ExpectedExpenseProvider({ children }) {
  const [expectedExpenses, setExpectedExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)

  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  // Load data whenever month/year changes
  useEffect(() => {
    loadExpectedExpenses()
  }, [])


async function loadExpectedExpenses() {
  setLoading(true)
  setError(null)

  try {
    const data = await ExpectedExpenseService.fetchExpectedExpenses()
    setExpectedExpenses(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}


  async function addExpectedExpense(data) {
    setLoading(true)
    try {
     await ExpectedExpenseService.createExpectedExpense(data)

      await loadExpectedExpenses(month, year)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function updateExpectedExpense(expense) {
    setLoading(true)
    try {
      await ExpectedExpenseService.editExpectedExpense(expense)
      await loadExpectedExpenses(month, year)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

    function startEdit(expense) {
   setEditingExpense(expense)
  }

   function clearEdit() {
   setEditingExpense(null)
  }

  const value = {
    expectedExpenses,
    editingExpense,
    loading,
    error,

    month,
    year,
    setMonth,
    setYear,

    addExpectedExpense,
    updateExpectedExpense,
    startEdit,
    clearEdit,
    reload: () => loadExpectedExpenses(month, year),
  }

  return (
    <ExpectedExpenseContext.Provider value={value}>
      {children}
    </ExpectedExpenseContext.Provider>
  )
}

/**
 * Custom hook
 */
export function useExpectedExpenses() {
  const context = useContext(ExpectedExpenseContext)
  if (!context) {
    throw new Error(
      'useExpectedExpenses must be used within ExpectedExpenseProvider'
    )
  }
  return context
}

