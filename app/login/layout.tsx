'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    console.log(user)
    if (user) {
      push("/dashboard")
    }
  }, [user])


  return (
    <main className="grid items-center h-screen dark:bg-gray-900 bg-white">
      {children}
    </main>
  )
}
