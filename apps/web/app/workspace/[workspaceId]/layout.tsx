// apps/web/app/workspace/[workspaceId]/layout.tsx
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { createChannel } from './actions'
import InviteButton from '@/components/InviteButton'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ workspaceId: string }>
}) {
  const resolvedParams = await params
  const { workspaceId } = resolvedParams

  // Fetch the specific workspace and its channels
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      channels: {
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  if (!workspace) notFound()

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* 1. The Far-Left Global Workspace Sidebar */}
      <Sidebar />
      
      {/* 2. The Inner-Left Channel Sidebar */}
      <aside className="w-64 bg-zinc-900/50 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="font-bold text-lg truncate">{workspace.name}</h2>

          <InviteButton workspaceId={workspace.id} />
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Channels
          </h3>
          <ul className="space-y-1 mb-6">
            {workspace.channels.map((channel) => (
              <li key={channel.id}>
                <Link 
                  href={`/workspace/${workspace.id}/channel/${channel.id}`}
                  className="block px-2 py-1.5 rounded hover:bg-zinc-800 text-sm text-zinc-300"
                >
                  # {channel.name}
                </Link>
              </li>
            ))}
            {workspace.channels.length === 0 && (
              <li className="text-sm text-zinc-500 px-2 italic">No channels yet</li>
            )}
          </ul>

          {/* Test Form to Create Channels */}
          <form action={createChannel} className="mt-4 border-t border-zinc-800 pt-4">
            <input type="hidden" name="workspaceId" value={workspace.id} />
            <input 
              type="text" 
              name="name" 
              placeholder="new-channel" 
              className="w-full p-2 text-sm rounded bg-zinc-950 border border-zinc-700 text-white mb-2 focus:outline-none focus:border-blue-500"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm py-1.5 rounded transition"
            >
              + Add Channel
            </button>
          </form>
        </div>
      </aside>

      {/* 3. The Main Content Area (Where the chat goes) */}
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  )
}