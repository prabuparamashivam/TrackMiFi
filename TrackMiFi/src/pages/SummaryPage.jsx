import CashPosition from '../features/summary/CashPosition'
import MonthlySummary from '../features/summary/MonthlySummary'
import ExpectedExpensesDashboard from '../features/expectedExpenses/ExpectedExpensesDashboard'

export default function SummaryPage() {
  return (
    <div className="space-y-6">
      <CashPosition />
      <MonthlySummary />
      <ExpectedExpensesDashboard />
    </div>
  )
}