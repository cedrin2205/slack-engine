'use client'

import { ReactNode } from 'react'

interface LoadingButtonProps {
  children: ReactNode
  loading: boolean
  loadingText?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingButton({
  children,
  loading,
  loadingText,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
}: LoadingButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-600 disabled:text-zinc-400',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 disabled:bg-zinc-800/50 disabled:text-zinc-500',
    danger: 'text-red-400 hover:bg-zinc-800 hover:text-red-300 disabled:text-zinc-600',
    ghost: 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 disabled:text-zinc-600',
  }

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-lg',
    lg: 'text-base px-5 py-2.5 rounded-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${loading ? 'opacity-80' : ''}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

