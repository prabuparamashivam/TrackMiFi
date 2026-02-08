// src/features/summary/summary.service.js

/**
 * Calculate monthly income & expense
 */
export function calculateMonthlyCashPosition(transactions, expectedExpense, month ,year) {
  let totalIncome = 0
  let totalExpense = 0
  let currentBalance = 0
  let remainingExpectedBalance = 0
  let safeBalance = 0

    const monthlyTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date)
    return (
      d.getMonth() === month &&
      d.getFullYear() === year
    )
  })


  totalIncome = monthlyTransactions.reduce((sum, tx) => {
    return tx.type === 'income' ? sum + tx.amount : sum
  }, 0)

  totalExpense = monthlyTransactions.reduce((sum, tx) => {
    return tx.type === 'expense' ? sum + tx.amount : sum
  }, 0)

   
  currentBalance = totalIncome - totalExpense

 
  for (const expense of expectedExpense) {
    let currexpense = 0
    let expectedAmount = expense.expectedAmount
    for (const tx of monthlyTransactions) {
      if (tx.expectedExpenseId  === expense.id && tx.type === 'expense') {
        currexpense += tx.amount
      }
      
    }
    if (currexpense < expectedAmount) {
      if ((expectedAmount - currexpense) >= 0) {
        remainingExpectedBalance += (expectedAmount - currexpense)
      }
    }
  }

  safeBalance = currentBalance - remainingExpectedBalance

  return {
    totalIncome,
    totalExpense,
    currentBalance,
    remainingExpectedBalance,
    safeBalance
  }
}
