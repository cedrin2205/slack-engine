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
    <nav className="w-[72px] flex-shrink-0 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-4 z-30 relative">
      
      {/* 1. Workspaces Container */}
      <div className="flex flex-col items-center space-y-3 flex-1 w-full overflow-y-auto no-scrollbar px-2">
        {userMemberships.map((membership: any) => {
          const ws = membership.workspace
          const initials = ws.name.substring(0, 2).toUpperCase()
          
          return (
            <Link 
              key={ws.id} 
              href={`/workspace/${ws.id}`}
              className="group relative w-12 h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              title={ws.name}
            >
              {initials}
              {/* Tooltip on hover */}
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-zinc-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-zinc-700">
                {ws.name}
              </span>
            </Link>
          )
        })}
        
        {/* Button to go to Dashboard */}
        <Link 
          href="/dashboard"
          className="group relative w-12 h-12 shrink-0 border-2 border-dashed border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded-xl flex items-center justify-center font-bold text-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          title="Add Workspace"
        >
          +
          <span className="absolute left-full ml-3 px-2.5 py-1 bg-zinc-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-zinc-700">
            New Workspace
          </span>
        </Link>
      </div>

      {/* User Menu at the bottom */}
      <UserMenu email={user.email!} name={dbUser?.name} />
      
    </nav>
  )
}
