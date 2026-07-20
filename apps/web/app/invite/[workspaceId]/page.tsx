// apps/web/app/invite/[workspaceId]/page.tsx
import { prisma } from '@/utils/prisma'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function InvitePage({
  params
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const resolvedParams = await params
  const { workspaceId } = resolvedParams
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 1. If they aren't logged in, send them to login
  if (!user) {
    redirect('/login') 
  }

  // 2. Check if the workspace actually exists
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId }
  })

  if (!workspace) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        <h1>Workspace not found. The link might be invalid.</h1>
      </div>
    )
  }

  // 3. Check if the user is already a member
  const existingMember = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId: workspaceId
      }
    }
  })

  // 4. If they aren't a member yet, add them to the database!
  if (!existingMember) {
    await prisma.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId: workspaceId,
        role: 'MEMBER'
      }
    })
  }

  // 5. Redirect them straight into the workspace
  redirect(`/workspace/${workspaceId}`)
}