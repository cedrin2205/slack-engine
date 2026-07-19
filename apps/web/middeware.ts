import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Create a response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Initialize Supabase client for Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Check auth status
  const { data: { user } } = await supabase.auth.getUser()

  // 4. Define route logic
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/dashboard') || 
    request.nextUrl.pathname.startsWith('/workspace')

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/login', request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    
    // CRITICAL: Copy the newly refreshed cookies over to the redirect!
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    
    return redirectResponse
  }

  // Redirect authenticated users away from login
  if (user && request.nextUrl.pathname === '/login') {
    const redirectUrl = new URL('/dashboard', request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    
    // CRITICAL: Copy the newly refreshed cookies over to the redirect!
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    
    return redirectResponse
  }

  return response
}

// 5. Ensure middleware runs on the correct paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}