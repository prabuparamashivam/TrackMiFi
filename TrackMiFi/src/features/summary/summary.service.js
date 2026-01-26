// src/features/summary/summary.service.js

/**
 * Calculate monthly income & expense
 */
export function calculateMonthlySummary(transactions, month, year) {
  let income = 0
  let expense = 0

  transactions.forEach((tx) => {
    const txDate = new Date(tx.date)

    if (
      txDate.getMonth() === month &&
      txDate.getFullYear() === year
    ) {
      if (tx.type === 'income') {
        income += tx.amount
      } else if (tx.type === 'expense') {
        expense += tx.amount
      }
    }
  })

  return {
    income,
    expense,
  }
}
