'use client';

import { useState } from 'react';
import { createWorkspace } from './actions';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      await createWorkspace(formData);
      // We don't set isLoading to false here because Next.js will likely redirect the user away upon success!
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Only stop the loading spinner if there's an error
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 h-full bg-zinc-950">
      
      {/* Responsive Card Container */}
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
            Create a new workspace
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Workspaces are where your team communicates. Set one up to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
              Workspace Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name"
              placeholder="e.g. Acme Corp, Design Team" 
              disabled={isLoading}
              className="w-full px-4 py-3 text-white placeholder-zinc-500 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Workspace'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}