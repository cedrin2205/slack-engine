'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Channel {
  id: string
  name: string
}

export default function ChannelSidebar({
  workspaceId,
  workspaceName,
  channels,
  inviteButton,
  children,
}: {
  workspaceId: string
  workspaceName: string
  channels: Channel[]
  inviteButton?: React.ReactNode
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (channelId: string) => pathname.includes(`/channel/${channelId}`)

  return (
    <div className="flex flex-1 min-w-0 relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-[84px] z-20 w-9 h-9 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 shadow-md hover:shadow-lg"
        aria-label="Toggle channel sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 overlay-backdrop lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Channel Sidebar */}
      <aside
        className={[
          'fixed lg:static inset-y-0 left-[72px] z-50 w-72 bg-zinc-900/95 lg:bg-zinc-900/50 border-r border-zinc-800 flex flex-col sidebar-transition',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg truncate text-white">{workspaceName}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {inviteButton}
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span>Channels</span>
          </h3>
          <ul className="space-y-0.5 mb-6">
            {channels.map((channel) => (
              <li key={channel.id}>
                <Link
                  href={`/workspace/${workspaceId}/channel/${channel.id}`}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    isActive(channel.id)
                      ? 'bg-zinc-700/60 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-zinc-500 font-mono">#</span>
                  <span className="truncate">{channel.name}</span>
                  {isActive(channel.id) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-fade-in" />
                  )}
                </Link>
              </li>
            ))}
            {channels.length === 0 && (
              <li className="text-sm text-zinc-600 px-3 py-4 text-center italic">
                No channels yet
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        {children}
      </main>
    </div>
  )
}
