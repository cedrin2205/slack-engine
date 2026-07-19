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
    <div className="flex-1 flex items-center justify-center text-zinc-500 flex-col">
      <h2 className="text-2xl font-semibold mb-2 text-zinc-300">Welcome to your Workspace</h2>
      <p>Select a channel from the sidebar to start messaging.</p>
      
      {/* Note: You can move your Logout button here or into the sidebar later! */}
    </div>
  )
}