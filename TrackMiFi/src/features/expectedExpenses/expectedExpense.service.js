// src/features/expectedExpenses/expectedExpense.service.js

import {
  addExpectedExpense,
  getExpectedExpensesByMonth,
  updateExpectedExpense,
  deleteExpectedExpense,
} from '../../storage/expectedExpense.repo'

/**
 * Create a new expected expense
 */
async function createExpectedExpense(data) {
  if (!data) {
    throw new Error('Expected expense data is required')
  }

  const {
    name,
    category,
    expectedAmount,
    description,
    month,
    year,
  } = data

  // 🔒 Validation
  if (!name || name.trim().length === 0) {
    throw new Error('Expense name is required')
  }

  if (!category || category.trim().length === 0) {
    throw new Error('Category is required')
  }

  if (typeof expectedAmount !== 'number' || expectedAmount <= 0) {
    throw new Error('Expected amount must be greater than 0')
  }

  const now = new Date()

  const expense = {
    name: name.trim(),
    category: category.trim(),
    expectedAmount,
    description: description || '',
    month: typeof month === 'number' ? month : now.getMonth(),
    year: typeof year === 'number' ? year : now.getFullYear(),
    createdAt: new Date().toISOString(),
  }

  return await addExpectedExpense(expense)
}

/**
 * Get expected expenses for a month
 */
async function fetchExpectedExpenses(month, year) {
  const now = new Date()
  const m = typeof month === 'number' ? month : now.getMonth()
  const y = typeof year === 'number' ? year : now.getFullYear()

  return await getExpectedExpensesByMonth(m, y)
}

/**
 * Update expected expense
 */
async function editExpectedExpense(expense) {
  if (!expense || !expense.id) {
    throw new Error('Valid expected expense is required')
  }

  return await updateExpectedExpense(expense)
}

/**
 * Remove expected expense
 */
async function removeExpectedExpense(id) {
  if (!id) {
    throw new Error('Expected expense id is required')
  }

  return await deleteExpectedExpense(id)
}

export const ExpectedExpenseService = {
  createExpectedExpense,
  fetchExpectedExpenses,
  editExpectedExpense,
  removeExpectedExpense,
}
