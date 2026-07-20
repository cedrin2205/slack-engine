'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signOut() {
  const supabase = await createClient()
  
  // This clears the Supabase session cookies
  await supabase.auth.signOut()
  
  // Force a redirect back to the login page
  redirect('/login')
}

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

 if (error) {
  redirect('/login?message=Could not authenticate user')
}

  // 2. Add this right here! If there is no error, go to the dashboard.
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  // 1. Extract the email and password from the form
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 2. Call Supabase to create the new user and extract the 'error' variable
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  // 3. Now this error check will work perfectly!
  if (error) {
    return "Could not create user"
  }

  // 4. Redirect to the dashboard on success
  redirect('/dashboard') 
}