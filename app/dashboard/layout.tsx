import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-start content-stretch h-screen p-4 gap-4">
      <aside className="flex-1 max-w-xs p-4 bg-gray-900">
        <h1>Nav</h1>
      </aside>
      <main className="flex-1 p-4 bg-gray-900">
        {children}
      </main>
      <aside className="flex-0 p-4 bg-gray-900 hidden">
        <h1>Drawer</h1>
      </aside>
    </div>
  )
}
