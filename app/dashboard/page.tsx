'use client';
import React, { useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useGetSnapshot } from "@/firebase/db";
import { Button } from '@/components/ui/button';
import { useSignOut } from '@/firebase/auth';

export default function Page() {
  const { user } = useAuthContext(); 
  const { push } = useRouter();
  const {loading, data, error} = useGetSnapshot('test');
  const { signOutUser } = useSignOut();

  useEffect(() => {
    if (!user) {
      push("/login")
    }
  }, [user])

  const handleLogout = async () => {
   await signOutUser();
  }

  
  if (loading) return <div>Loading...</div> // Replace with Loading Skeleton
  if (error) return console.log(error)

  return (
    <div>
      <h1>Hello {data[0]?.name}</h1>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>    
  )
}