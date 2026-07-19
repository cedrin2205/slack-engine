// apps/web/app/workspace/[workspaceId]/channel/[channelId]/actions.ts
'use server'

import { prisma } from '@/utils/prisma'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  const content = formData.get('content') as string
  const channelId = formData.get('channelId') as string
  const workspaceId = formData.get('workspaceId') as string

  if (!content || !content.trim() || !channelId) return

  // Save the message to the database
  await prisma.message.create({
    data: {
      content,
      channelId,
      userId: user.id,
    }
  })

  // Refresh the channel page to show the new message
  revalidatePath(`/workspace/${workspaceId}/channel/${channelId}`)
}