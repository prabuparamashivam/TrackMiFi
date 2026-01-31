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

  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  // Load data whenever month/year changes
  useEffect(() => {
    loadExpectedExpenses(month, year)
  }, [month, year])

  async function loadExpectedExpenses(m, y) {
    setLoading(true)
    setError(null)
    try {
      const data = await ExpectedExpenseService.fetchExpectedExpenses(m, y)
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
      await ExpectedExpenseService.createExpectedExpense({
        ...data,
        month,
        year,
      })
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

  async function deleteExpectedExpense(id) {
    setLoading(true)
    try {
      await ExpectedExpenseService.removeExpectedExpense(id)
      await loadExpectedExpenses(month, year)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    expectedExpenses,
    loading,
    error,

    month,
    year,
    setMonth,
    setYear,

    addExpectedExpense,
    updateExpectedExpense,
    deleteExpectedExpense,
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
