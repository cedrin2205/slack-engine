import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden selection:bg-zinc-700">
      {/* Sidebar Container: You may need to add 'hidden md:flex' inside the Sidebar component itself later */}
      <Sidebar />
      
      {/* 
        Main Content: 
        Uses w-full to ensure it takes 100% of mobile screens. 
        min-w-0 prevents flexbox overflowing issues.
      */}
      <main className="flex-1 flex flex-col min-w-0 w-full bg-zinc-950 relative h-full">
        {children}
      </main>
    </div>
  )
}