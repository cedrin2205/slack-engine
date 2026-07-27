import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import { sendMessage } from './actions'
import RealtimeChat from '@/components/RealtimeChat'
import MessageInput from '@/components/MessageInput'

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
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  if (!channel) notFound()

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white">
      {/* 1. Channel Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-800 shrink-0 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-zinc-400 font-bold text-sm">#</span>
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl tracking-tight">{channel.name}</h1>
            <p className="text-xs text-zinc-500 hidden sm:block">
              {channel.messages.length} message{channel.messages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* ---> INVISIBLE REALTIME LISTENER ADDED HERE <--- */}
      <RealtimeChat channelId={channelId} />

      {/* 2. Message History Area */}
      <div className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto space-y-2 scrollbar-thin">
        {channel.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center mb-5 border border-zinc-700 shadow-lg">
              <span className="text-3xl">👋</span>
            </div>
            <p className="font-semibold text-zinc-300 text-lg">Welcome to #{channel.name}!</p>
            <p className="text-sm text-zinc-500 mt-1 max-w-sm text-center leading-relaxed">
              This is the start of the channel. Be the first to say something nice.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {channel.messages.map((message: any, idx: number) => {
              const prevMsg = idx > 0 ? channel.messages[idx - 1] : null
              const isSameUser = prevMsg?.userId === message.userId
              const timeDiff = isSameUser && prevMsg
                ? Math.abs(new Date(message.createdAt).getTime() - new Date(prevMsg.createdAt).getTime()) < 300000 // 5 min
                : false

              return (
                <div
                  key={message.id}
                  className="message-card animate-fade-in"
                  style={{ animationDelay: `${Math.min(idx * 20, 300)}ms` }}
                >
                  {/* Show user info header if new user or significant time gap */}
                  {!isSameUser || !timeDiff ? (
                    <div className="flex items-baseline space-x-2 pt-3 first:pt-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300 shrink-0 border border-zinc-700">
                        {(message.user.name || message.user.email)[0].toUpperCase()}
                      </div>
                      <div className="flex items-baseline space-x-2 min-w-0">
                        <span className="font-bold text-[15px] text-zinc-100 hover:text-blue-400 transition-colors cursor-pointer truncate">
                          {message.user.name || message.user.email}
                        </span>
                        <span className="text-[11px] text-zinc-600 font-medium shrink-0">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {/* Message content */}
                  <div className={`${!isSameUser || !timeDiff ? 'pl-10' : 'pl-10'} mt-0.5`}>
                    <p className="text-zinc-300 leading-relaxed text-[15px] break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 3. Chat Input Box */}
      <div className="p-3 sm:p-4 shrink-0 bg-zinc-950 border-t border-zinc-900/50">
        <MessageInput
          channelName={channel.name}
          channelId={channelId}
          workspaceId={workspaceId}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
