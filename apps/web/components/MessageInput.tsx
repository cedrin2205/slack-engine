'use client'

import { useRef, useState } from 'react'

export default function MessageInput({
  channelName,
  channelId,
  workspaceId,
  sendMessage,
  onMessageSent,
}: {
  channelName: string
  channelId: string
  workspaceId: string
  sendMessage: (formData: FormData) => void | Promise<void>
  onMessageSent?: (content: string) => void
}) {
  const [isPending, setIsPending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true)
    const content = formData.get('content') as string
    try {
      await sendMessage(formData)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      if (content && onMessageSent) {
        onMessageSent(content)
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="relative flex items-center">
      <input type="hidden" name="channelId" value={channelId} />
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input
        ref={inputRef}
        type="text"
        name="content"
        placeholder={'Message #' + channelName}
        disabled={isPending}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-4 pr-24 py-3.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        required
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={isPending}
        className="absolute right-2 bg-white hover:bg-zinc-200 disabled:bg-zinc-600 disabled:cursor-not-allowed text-black disabled:text-zinc-400 px-4 py-1.5 rounded-lg font-semibold transition-all duration-200 text-sm flex items-center space-x-1.5 shadow-sm active:scale-[0.97]"
      >
        {isPending ? (
          <>
            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <span>Send</span>
        )}
      </button>
    </form>
  )
}
