// apps/web/app/dashboard/page.tsx
import { createWorkspace } from './actions'

export default function DashboardPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 h-full">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-white">
          Create a new workspace
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          Workspaces are where your team communicates. Set one up to get started.
        </p>

        <form action={createWorkspace} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Workspace Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name"
              placeholder="e.g. Acme Corp, Design Team" 
              className="w-full p-2.5 text-sm rounded-lg bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-zinc-500 transition-colors"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Create Workspace
          </button>
        </form>
      </div>
    </div>
  )
}