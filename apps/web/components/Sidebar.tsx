// apps/web/components/Sidebar.tsx
import { prisma } from '@/utils/prisma'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import UserMenu from './UserMenu'

export default async function Sidebar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch the user's profile from the database to get their name
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  // Fetch all workspaces where the current user is a member
  const userMemberships = await prisma.workspaceMember.findMany({
    where: { 
      userId: user.id 
    },
    include: { 
      workspace: true 
    },
    orderBy: { 
      workspace: { createdAt: 'asc' } 
    }
  })

  return (
    <nav className="w-[72px] flex-shrink-0 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-4">
      
      {/* 1. Workspaces Container (Wrapped in flex-1 to push the user menu down) */}
      <div className="flex flex-col items-center space-y-4 flex-1 w-full overflow-y-auto no-scrollbar">
        {userMemberships.map((membership: any) => {
          const ws = membership.workspace
          // Grab the first two letters for the square icon
          const initials = ws.name.substring(0, 2).toUpperCase()
          
          return (
            <Link 
              key={ws.id} 
              href={`/workspace/${ws.id}`}
              className="w-12 h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center justify-center font-bold text-lg transition-all shadow-sm"
              title={ws.name}
            >
              {initials}
            </Link>
          )
        })}
        
        {/* 2. Button to go back to Dashboard to create more workspaces */}
        <Link 
          href="/dashboard"
          className="w-12 h-12 shrink-0 border-2 border-dashed border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded-xl flex items-center justify-center font-bold text-2xl transition-all"
          title="Add Workspace"
        >
          +
        </Link>
      </div>

      {/* 3. The new User Menu sitting perfectly at the bottom */}
      <UserMenu email={user.email!} name={dbUser?.name} />
      
    </nav>
  )
}