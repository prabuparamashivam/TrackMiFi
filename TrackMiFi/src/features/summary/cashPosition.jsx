import { useState } from 'react'
import { useTransactions } from '../transactions/transaction.context'
import { useExpectedExpenses } from '../expectedExpenses/expectedExpense.context'
import { calculateMonthlyCashPosition } from './cashPosition.service'


export default function CashPosition() {
   const { expectedExpenses } = useExpectedExpenses()
   const { transactions } = useTransactions()
 
 const now = new Date()
 
  const { totalIncome, totalExpense, currentBalance, remainingExpectedBalance, safeBalance } 
   = calculateMonthlyCashPosition (
     transactions,
     expectedExpenses,
     now.getMonth(),
     now.getFullYear()
   )

   return (
    <div className="max-w-md mx-auto mt-6 grid grid-cols-2 gap-4">
      <div className="bg-green-100 p-4 rounded">
        <p className="text-sm text-gray-600">totalIncome</p>
        <p className="text-xl font-bold text-green-700">
          ₹ {totalIncome}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded">
        <p className="text-sm text-gray-600">totalExpense</p>
        <p className="text-xl font-bold text-red-700">
          ₹ {totalExpense}
        </p>
      </div>


          <div className="bg-red-100 p-4 rounded">
        <p className="text-sm text-gray-600">currentBalance</p>
        <p className="text-xl font-bold text-red-700">
          ₹ {currentBalance}
        </p>
      </div>


          <div className="bg-red-100 p-4 rounded">
        <p className="text-sm text-gray-600">remainingExpectedBalance</p>
        <p className="text-xl font-bold text-red-700">
          ₹ {remainingExpectedBalance}
        </p>
      </div>


          <div className="bg-red-100 p-4 rounded">
        <p className="text-sm text-gray-600">safeBalance</p>
        <p className="text-xl font-bold text-red-700">
          ₹ {safeBalance}
        </p>
      </div>
    </div>
  )
}
