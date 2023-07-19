'use client';
import React, { useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    console.log(user)
    if (!user) {
      push("/login")
    }
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        Hello World!
      </h1>        
    </main>
  )
}
