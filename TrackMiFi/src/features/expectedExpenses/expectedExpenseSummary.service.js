
// src/features/expectedExpenses/expectedExpenseSummary.service.js

/**
 * Calculate progress for expected expenses
 */
export function calculateExpectedExpenseProgress(
  expectedExpenses,
  transactions
) {
  return expectedExpenses.map((expense) => {
    const relatedTransactions = transactions.filter(
      (tx) =>
        tx.type === 'expense' &&
        tx.expectedExpenseId === expense.id
    )

    const spent = relatedTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    )

    const balance = expense.expectedAmount - spent

    let status = 'NOT_STARTED'
    if (spent > 0 && balance > 0) {
      status = 'PARTIAL'
    }
    if (balance <= 0) {
      status = 'DONE'
    }

    return {
      ...expense,
      spent,
      balance,
      status,
    }
  })
}
