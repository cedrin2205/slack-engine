// apps/web/components/UserMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from '@/app/actions'
import Link from 'next/link'

export default function UserMenu({ email, name }: { email: string, name?: string | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const displayLetter = name ? name[0].toUpperCase() : email[0].toUpperCase()

  return (
    <div className="relative mt-auto w-full flex justify-center pt-4" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-11 h-11 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full flex items-center justify-center font-bold text-base transition-all duration-200 shadow-sm border border-zinc-700 hover:shadow-md hover:scale-105 active:scale-95 ${isOpen ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''}`}
      >
        {displayLetter}
      </button>

      {/* Popup Menu with animation */}
      <div
        className={`absolute bottom-0 left-16 w-64 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-2 z-50 origin-bottom-left sidebar-transition ${
          isOpen 
            ? 'opacity-100 scale-100 pointer-events-auto' 
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="px-4 py-3 border-b border-zinc-800">
          <p className="text-sm font-semibold text-white truncate">{name || 'User'}</p>
          <p className="text-xs text-zinc-400 truncate mt-0.5">{email}</p>
        </div>
        
        <div className="py-1">
          <Link 
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors rounded-md mx-1"
          >
            <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Profile Settings</span>
          </Link>
          <form action={signOut}>
            <button 
              type="submit"
              className="flex items-center space-x-2 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors rounded-md mx-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
