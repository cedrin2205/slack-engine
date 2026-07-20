// apps/web/components/InviteButton.tsx
'use client'

import { useState, useEffect } from 'react'

export default function InviteButton({ workspaceId }: { workspaceId: string }) {
  const [copied, setCopied] = useState(false)
  const [origin, setOrigin] = useState('')

  // Get the base URL (e.g., http://localhost:3000) safely on the client
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const handleCopy = () => {
    const inviteLink = `${origin}/invite/${workspaceId}`
    navigator.clipboard.writeText(inviteLink)
    
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-3 w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs py-2 rounded-lg transition-colors shadow-sm border border-zinc-700 font-medium flex items-center justify-center space-x-2"
    >
      <span>{copied ? '✅ Copied to clipboard!' : '🔗 Copy Invite Link'}</span>
    </button>
  )
}