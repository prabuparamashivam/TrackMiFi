import { useState } from 'react';
import Sidebar from './Sidebar';
import SummaryPage from "../pages/SummaryPage.jsx";
import TransactionsPage from "../pages/TransactionsPage.jsx";

export default function Layout() {
  const [activePage, setActivePage] = useState('summary')

  let content

  if (activePage === 'summary') {
    content = <SummaryPage />
  } else {
    content = <TransactionsPage />
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6">
        {content}
      </main>
    </div>
  )
}