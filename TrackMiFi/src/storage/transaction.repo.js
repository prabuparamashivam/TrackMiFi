// src/storage/transaction.repo.js

import { getStore } from './indexedDb'

/**
 * Add a transaction
 */
export async function addTransaction(transaction) {
  const store = await getStore('transactions', 'readwrite')

  return new Promise((resolve, reject) => {
    const request = store.add(transaction)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Get all transactions
 */
export async function getAllTransactions() {
  const store = await getStore('transactions', 'readonly')

  return new Promise((resolve, reject) => {
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Delete transaction by id
 */
export async function deleteTransaction(id) {
  const store = await getStore('transactions', 'readwrite')

  return new Promise((resolve, reject) => {
    const request = store.delete(id)

    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}
