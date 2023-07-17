'use client';
import React, { useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useAuthContext(); 
  const { push } = useRouter();

  useEffect(() => {
    if (!user) {
      push("/login")
    }
  }, [user])
  
  return <h1>Hello, Next.js!</h1>
}