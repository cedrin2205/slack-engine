// apps/web/app/workspace/[workspaceId]/actions.ts
'use server'

import { prisma } from '@/utils/prisma'
import { revalidatePath } from 'next/cache'

export async function createChannel(formData: FormData) {
  const name = formData.get('name') as string
  const workspaceId = formData.get('workspaceId') as string

  if (!name || !workspaceId) return

  const formattedName = name.toLowerCase().replace(/\s+/g, '-')

  await prisma.channel.create({
    data: {
      name: formattedName,
      workspaceId: workspaceId,
    }
  })

  revalidatePath(`/workspace/${workspaceId}`)
}