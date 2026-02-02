// src/features/expectedExpenses/expectedExpense.service.js

import {
  addExpectedExpense,
  updateExpectedExpense,
  deleteExpectedExpense,
  getAllExpectedExpenses,
} from '../../storage/expectedExpense.repo'

async function createExpectedExpense(data) {
  if (!data) {
    throw new Error('Expected expense data is required')
  }

  const { name, category, expectedAmount, description } = data

  if (!name || name.trim().length === 0) {
    throw new Error('Expense name is required')
  }

  if (!category || category.trim().length === 0) {
    throw new Error('Category is required')
  }

  if (typeof expectedAmount !== 'number' || expectedAmount <= 0) {
    throw new Error('Expected amount must be greater than 0')
  }

  const expense = {
    name: name.trim(),
    category: category.trim(),
    expectedAmount,
    description: description || '',
    createdAt: new Date().toISOString(),
  }

  return await addExpectedExpense(expense)
}

async function fetchExpectedExpenses() {
  return await getAllExpectedExpenses()
}

async function editExpectedExpense(expense) {
  if (!expense || !expense.id) {
    throw new Error('Valid expected expense is required')
  }

  return await updateExpectedExpense(expense)
}

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
