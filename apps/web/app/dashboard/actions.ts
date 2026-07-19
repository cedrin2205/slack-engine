'use server'

import { prisma } from '@/utils/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation' // 1. Make sure to import this!
import { createClient } from '@/utils/supabase/server'

export async function createWorkspace(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error("You must be logged in to create a workspace")
  }

  const name = formData.get('name') as string
  if (!name) return

  // 2. We need to save the result of the database call to a variable
  // so we can grab the ID of the newly created workspace.
  const newWorkspace = await prisma.workspace.create({
    data: {
      name,
      members: {
        create: {
          userId: user.id,
          role: 'ADMIN'
        }
      }
    }
  })

  // 3. Clear the cache
  revalidatePath('/', 'layout')

  // 4. Transport the user directly into their brand new workspace!
  redirect(`/workspace/${newWorkspace.id}`)
}