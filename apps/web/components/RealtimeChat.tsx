// apps/web/components/RealtimeChat.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function RealtimeChat({ channelId }: { channelId: string }) {
  const router = useRouter()
  // This uses your browser-side Supabase client
  const supabase = createClient() 

  useEffect(() => {
    // 1. Subscribe to the Supabase channel
    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // We only care when new messages are added
          schema: 'public',
          table: 'Message',
          filter: `channelId=eq.${channelId}` // Only listen to the channel we are currently in
        },
        (payload) => {
          // 2. When a new message is detected, tell Next.js to fetch the latest data instantly
          router.refresh()
        }
      )
      .subscribe()

    // 3. Cleanup the subscription when the user leaves the channel
    return () => {
      supabase.removeChannel(channel)
    }
  }, [channelId, router, supabase])

  return null // This component doesn't render any UI, it just listens!
}