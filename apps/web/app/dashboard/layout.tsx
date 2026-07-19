// apps/web/app/dashboard/layout.tsx
import { ReactNode } from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // 1. Verify the user is still authenticated
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen w-full bg-zinc-900 text-white">
      
      {/* 2. The Sidebar (Workspaces & Channels) */}
      <aside className="w-64 flex-shrink-0 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="h-14 flex items-center px-4 border-b border-zinc-800 font-bold text-lg">
          Slack Engine
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Workspaces
            </h3>
            {/* We will map over database workspaces here later */}
            <div className="text-sm text-zinc-300 py-1 px-2 rounded hover:bg-zinc-800 cursor-pointer">
              General Server
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Channels
            </h3>
            {/* We will map over database channels here later */}
            <div className="text-sm text-zinc-300 py-1 px-2 rounded hover:bg-zinc-800 cursor-pointer">
              # general
            </div>
            <div className="text-sm text-zinc-300 py-1 px-2 rounded hover:bg-zinc-800 cursor-pointer">
              # random
            </div>
          </div>
        </div>

        {/* User Profile Area at bottom of sidebar */}
        <div className="h-16 border-t border-zinc-800 flex items-center px-4 text-sm text-zinc-400 truncate">
          {user.email}
        </div>
      </aside>

      {/* 3. The Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-900">
        {children}
      </main>
      
    </div>
  )
}