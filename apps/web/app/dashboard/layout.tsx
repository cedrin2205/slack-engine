// apps/web/app/dashboard/layout.tsx
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* 1. This keeps the Global Sidebar on the screen! */}
      <Sidebar />
      
      {/* 2. The Create form will render inside here */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        {children}
      </main>
    </div>
  )
}