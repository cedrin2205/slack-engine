// apps/web/components/UserMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from '@/app/actions'
import Link from 'next/link'

export default function UserMenu({ email, name }: { email: string, name?: string | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // This hook closes the menu if you click anywhere else on the screen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Grab the first letter of the name, or default to the email letter
  const displayLetter = name ? name[0].toUpperCase() : email[0].toUpperCase()

  return (
    <div className="relative mt-auto w-full flex justify-center pt-4" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full flex items-center justify-center font-bold text-lg transition-all shadow-sm border border-zinc-700"
      >
        {displayLetter}
      </button>

      {/* The Popup Menu */}
      {isOpen && (
        <div className="absolute bottom-0 left-16 w-60 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl py-2 z-50">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-sm font-medium text-white truncate">{name || 'User'}</p>
            <p className="text-xs text-zinc-400 truncate">{email}</p>
          </div>
          
          <div className="py-1">
            <Link 
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Profile Settings
            </Link>
            <form action={signOut}>
              <button 
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}