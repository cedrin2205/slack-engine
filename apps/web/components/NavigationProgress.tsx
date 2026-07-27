'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const prevPathRef = useRef(pathname)

  useEffect(() => {
    // If path changed, briefly show the loading bar
    if (prevPathRef.current !== pathname) {
      setIsLoading(true)
      prevPathRef.current = pathname
      const timer = setTimeout(() => setIsLoading(false), 400)
      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  // Listen for link clicks to show loading bar before navigation completes
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (target && target.href && target.href.startsWith(window.location.origin)) {
        // Only for internal links
        setIsLoading(true)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5">
      <div
        className={`h-full bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out ${
          isLoading ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
      />
    </div>
  )
}

