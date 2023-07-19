"use client";

import { useRouter } from 'next/navigation';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from '@/lib/validations';
import { useSignIn } from "@/firebase/auth";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image';

export const LoginForm = () => {

  const { push } = useRouter();
  const { result, error, signIn } = useSignIn();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {    
    const { email, password } = values;    

    await signIn(email, password)

    if (error) {
      return console.log(error)
    }

    // else successful
    console.log(result)
    return push("/dashboard")
  }
  
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>         
              <FormMessage />
            </FormItem>    
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>         
              <FormMessage />
            </FormItem>    
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}

export const LoginWithGoogle = () => {
  const { signInWithGoogle } = useSignIn();

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  return(    
    <Button 
    type="button" 
    onClick={() => handleGoogleLogin()}
    className="w-full"
    >
      <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
      <span className="ml-2">Login with Google</span>
    </Button>
  )
}