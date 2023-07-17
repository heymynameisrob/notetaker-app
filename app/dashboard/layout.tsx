'use client';

import React, {useState} from 'react'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawStyles = isDrawerOpen ? 'w-auto opacity-100 transition-all duration-150' : 'w-0 overflow-hidden opacity-0 transition-all duration-150 border-0';
  return (
    <div className="flex flex-1 justify-start content-stretch w-full h-screen overflow-hidden p-2 gap-2">
      <aside className="flex-1 max-w-xs ui-surface">
        <div className="p-4">
          <h1>Nav</h1>
          <a href="#" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>Toggle Drawer</a>
        </div>
      </aside>
      <main className="flex-1 ui-surface">
        <div className="p-4">
          {children}
        </div>
      </main>
      <aside className={`flex-0 ui-surface ${drawStyles}`}>
        {isDrawerOpen && (<div className="p-4">
          <h1>Drawer</h1>
        </div> )}        
      </aside>
    </div>
  )
}
