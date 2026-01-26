import { createContext, useContext, useEffect, useState } from 'react'
import { TransactionService } from './transaction.service'

const TransactionContext = createContext(null)

/**
 * Provider
 */
export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Load all transactions on app start
   */
  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    setLoading(true)
    try {
      const data = await TransactionService.fetchTransactions()
      setTransactions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function addTransaction(data) {
    setLoading(true)
    try {
      await TransactionService.createTransaction(data)
      await loadTransactions() // refresh state
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function deleteTransaction(id) {
    setLoading(true)
    try {
      await TransactionService.removeTransaction(id)
      await loadTransactions()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    reload: loadTransactions,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

/**
 * Custom hook
 */
export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions must be used inside TransactionProvider')
  }
  return context
}
