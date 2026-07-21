import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import { sendMessage } from './actions'
import RealtimeChat from '@/components/RealtimeChat'

export default async function ChannelPage({
  params
}: {
  params: Promise<{ workspaceId: string, channelId: string }>
}) {
  const resolvedParams = await params
  const { workspaceId, channelId } = resolvedParams

  // Fetch the channel and all its messages, including the user who sent them
  const channel = await prisma.channel.findUnique({
    where: { id: channelId },
    include: {
      messages: {
        include: { user: true },
        orderBy: { createdAt: 'asc' } // Oldest messages at the top
      }
    }
  })

  if (!channel) notFound()

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white">
      {/* 1. Channel Header */}
      <div className="p-4 border-b border-zinc-800 shrink-0 shadow-sm">
        <h1 className="font-bold text-xl tracking-tight"># {channel.name}</h1>
      </div>

      {/* ---> INVISIBLE REALTIME LISTENER ADDED HERE <--- */}
      <RealtimeChat channelId={channelId} />

      {/* 2. Message History Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {channel.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
              <span className="text-2xl">👋</span>
            </div>
            <p className="font-medium text-zinc-400">Welcome to #{channel.name}!</p>
            <p className="text-sm mt-1">This is the start of the channel. Be the first to say hello.</p>
          </div>
        ) : (
          channel.messages.map((message: any) => (
            <div key={message.id} className="flex flex-col group">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-[15px] text-zinc-100">
                  {message.user.name || message.user.email}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-zinc-300 mt-0.5 leading-relaxed text-[15px]">
                {message.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* 3. Chat Input Box */}
      <div className="p-4 shrink-0 bg-zinc-950">
        <form action={sendMessage} className="relative flex items-center">
          <input type="hidden" name="channelId" value={channelId} />
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input
            type="text"
            name="content"
            placeholder={`Message #${channel.name}`}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-4 pr-24 py-3.5 text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-sm"
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 bg-white hover:bg-zinc-200 text-black px-4 py-1.5 rounded-lg font-semibold transition-colors text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}