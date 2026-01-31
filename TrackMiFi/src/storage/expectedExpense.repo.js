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
export async function getExpectedExpensesByMonth(month, year) {
  const store = await getStore('expected_expenses', 'readonly')

  return new Promise((resolve, reject) => {
    const result = []
    const request = store.openCursor()

    request.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        const value = cursor.value

        if (value.month === month && value.year === year) {
          result.push(value)
        }

        cursor.continue()
      } else {
        resolve(result)
      }
    }

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
