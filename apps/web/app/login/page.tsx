import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  // Await searchParams for Next.js 16 compatibility
  const params = await searchParams;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <form className="flex w-full max-w-md flex-col gap-4 rounded-md bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Slack Engine</h1>
        
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md border bg-inherit px-4 py-2 mb-2"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md border bg-inherit px-4 py-2 mb-4"
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
        
        {params?.error && (
          <p className="mt-4 bg-red-100 p-3 text-center text-sm text-red-500 rounded-md">
            {params.error}
          </p>
        )}

        <button
          formAction={async (formData) => {
            await login(formData);
          }}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Log In
        </button>
        <button
          formAction={signup}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}