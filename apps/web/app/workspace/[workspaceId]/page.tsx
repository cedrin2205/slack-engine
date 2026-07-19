// apps/web/app/workspace/[workspaceId]/page.tsx
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  // In newer Next.js versions, params must be awaited
  const resolvedParams = await params
  
  // Fetch the specific workspace from the database
  const workspace = await prisma.workspace.findUnique({
    where: { 
      id: resolvedParams.workspaceId 
    }
  })

  // If someone types a random ID in the URL, show a 404
  if (!workspace) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col p-8 h-full bg-zinc-950 text-white">
      <div className="border-b border-zinc-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {workspace.name}
        </h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg">
        <p className="text-zinc-500">
          Workspace loaded successfully. Core chat interface goes here.
        </p>
      </div>
    </div>
  )
}