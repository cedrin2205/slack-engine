import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../login/actions' // Adjust path if you moved actions.ts

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Slack Engine</h1>
      <p className="mb-4">Logged in as: {data.user.email}</p>
      
      <form action={signOut}>
        <button 
          type="submit" 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </form>
    </div>
  )
}