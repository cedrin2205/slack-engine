// apps/web/components/InviteButton.tsx
'use client'

import { useState, useEffect } from 'react'

export default function InviteButton({ workspaceId }: { workspaceId: string }) {
  const [copied, setCopied] = useState(false)
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const handleCopy = () => {
    const inviteLink = `${origin}/invite/${workspaceId}`
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-3 w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs py-2.5 rounded-lg transition-all duration-200 shadow-sm border border-zinc-700 font-medium flex items-center justify-center space-x-2 hover:shadow-md active:scale-[0.98]"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-400 animate-fade-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="animate-fade-in">Copied to clipboard!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>Copy Invite Link</span>
        </>
      )}
    </button>
  )
}
