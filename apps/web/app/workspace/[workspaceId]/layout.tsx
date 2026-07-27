// apps/web/app/workspace/[workspaceId]/layout.tsx
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import ChannelSidebar from '@/components/ChannelSidebar'
import InviteButton from '@/components/InviteButton'
import { createChannel } from './actions'

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
      
      {/* 2. The Responsive Channel Sidebar with Main Content */}
      <ChannelSidebar
        workspaceId={workspace.id}
        workspaceName={workspace.name}
        channels={workspace.channels}
        createChannel={createChannel}
        inviteButton={<InviteButton workspaceId={workspace.id} />}
      >
        {children}
      </ChannelSidebar>
    </div>
  )
}
