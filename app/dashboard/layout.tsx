'use client';

import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import { Navbar } from '@/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    console.log(user)
    if (!user) {
      push("/login")
    }
  }, [user]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawStyles = isDrawerOpen ? 'w-auto opacity-100 transition-all duration-150' : 'w-0 overflow-hidden opacity-0 transition-all duration-150 border-0';
  return (
    <div className="flex flex-1 justify-start content-stretch w-full h-screen overflow-hidden p-2 gap-2">
      <nav className="flex flex-0">
        <Navbar />
      </nav>
      <aside className="flex-1 max-w-xs ui-surface">
        <div className="p-4">
          <h1>Events</h1>
          <a href="#" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>Toggle Drawer</a>
        </div>
      </aside>
      <main className="flex-1 ui-surface">
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  )
}
