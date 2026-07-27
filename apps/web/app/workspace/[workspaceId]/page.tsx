// apps/web/app/workspace/[workspaceId]/page.tsx
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const resolvedParams = await params
  
  const workspace = await prisma.workspace.findUnique({
    where: { 
      id: resolvedParams.workspaceId 
    }
  })

  if (!workspace) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 text-white">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-zinc-800 shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          {workspace.name}
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Select a channel to start chatting
        </p>
      </div>
      
      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center max-w-sm">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 shadow-lg">
            <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">
            Welcome to {workspace.name}
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            Choose a channel from the sidebar to start collaborating with your team. Or create a new channel to organize your conversations.
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-zinc-600">
            <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md font-mono">Esc</kbd>
            <span>to close sidebar</span>
            <span className="text-zinc-700">·</span>
            <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md font-mono">#</kbd>
            <span>to browse channels</span>
          </div>
        </div>
      </div>
    </div>
  )
}
