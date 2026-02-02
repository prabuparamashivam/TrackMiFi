// src/storage/expectedExpense.repo.js

import { getStore } from './indexedDb'

/**
 * Add a new expected expense
 */
export async function addExpectedExpense(expense) {
  const store = await getStore('expected_expenses', 'readwrite')

  return new Promise((resolve, reject) => {
    const request = store.add(expense)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Get expected expenses for a given month & year
 */
/**
 * Get ALL expected expenses (master list)
 */
export async function getAllExpectedExpenses() {
  const store = await getStore('expected_expenses', 'readonly')

  return new Promise((resolve, reject) => {
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}


/**
 * Update expected expense
 */
export async function updateExpectedExpense(expense) {
  const store = await getStore('expected_expenses', 'readwrite')

  return new Promise((resolve, reject) => {
    const request = store.put(expense)

    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Delete expected expense by id
 */
export async function deleteExpectedExpense(id) {
  const store = await getStore('expected_expenses', 'readwrite')

  return new Promise((resolve, reject) => {
    const request = store.delete(id)

    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}
