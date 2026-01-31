// src/features/transactions/transaction.service.js

import {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
} from '../../storage/transaction.repo'

/**
 * Allowed transaction types
 */
const TRANSACTION_TYPES = ['income', 'expense']

/**
 * Create a new transaction
 */
async function createTransaction(data) {
  // 1️⃣ Validation
  if (!data) throw new Error('Transaction data is required')

  const { type, amount, category, date ,expectedExpenseId } = data

  if (!TRANSACTION_TYPES.includes(type)) {
    throw new Error('Invalid transaction type')
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number')
  }

  if (!category || category.trim().length === 0) {
    throw new Error('Category is required')
  }

  // 2️⃣ Normalize / enrich data
  const transaction = {
    type,
    amount,
    category,
    expectedExpenseId: expectedExpenseId ?? null,
    date: date || new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }

  // 3️⃣ Persist via repository
  return await addTransaction(transaction)
}

/**
 * Fetch all transactions
 */
async function fetchTransactions() {
  return await getAllTransactions()
}

/**
 * Remove transaction
 */
async function removeTransaction(id) {
  if (!id) throw new Error('Transaction id is required')
  return await deleteTransaction(id)
}

export const TransactionService = {
  createTransaction,
  fetchTransactions,
  removeTransaction,
}
