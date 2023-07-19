'use client';
import React, { useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useGetSnapshot } from "@/firebase/db";
import { Button } from '@/components/ui/button';
import { useSignOut } from '@/firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
  const { loading, data, error } = useGetSnapshot('test');
  const { signOutUser } = useSignOut();

  const handleLogout = async () => {
   await signOutUser();
  }
  
  if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" /> // Replace with Loading Skeleton
  if (error) return console.log(error)

  return (
    <div>
      <h1>Hello {data[0]?.name}</h1>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>    
  )
}