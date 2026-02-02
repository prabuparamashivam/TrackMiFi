// src/features/expectedExpenses/expectedExpenseSummary.service.js

export function calculateExpectedExpenseProgress(
  expectedExpenses,
  transactions,
  month,
  year
) {
  // 🔥 Monthly reset happens here
  const monthlyTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date)
    return (
      d.getMonth() === month &&
      d.getFullYear() === year
    )
  })

  return expectedExpenses.map((expense) => {
    const relatedTransactions = monthlyTransactions.filter(
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
