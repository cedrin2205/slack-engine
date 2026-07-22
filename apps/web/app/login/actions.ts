"use server";

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function login(formData: FormData) {
  let errorMessage = "";
  
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      errorMessage = error.message;
    }
  } catch (err: any) {
    // This catches critical server crashes (like missing environment variables)
    errorMessage = err.message || "A critical server error occurred.";
  }

  // Handle the redirect outside the try/catch block
  if (errorMessage) {
    redirect(`/login?message=${errorMessage}`)
  } else {
    redirect('/dashboard')
  }
}

export async function signup(formData: FormData) {
  let errorMessage = "";

  try {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      errorMessage = error.message;
    }
  } catch (err: any) {
    // If Turborepo hid the environment variables, this will catch the Supabase crash!
    errorMessage = err.message || "A critical server error occurred.";
  }

  // Handle the redirect outside the try/catch block
  if (errorMessage) {
    redirect(`/login?message=${errorMessage}`)
  } else {
    redirect('/dashboard') 
  }
}