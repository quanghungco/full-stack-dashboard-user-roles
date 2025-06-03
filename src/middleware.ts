import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const baseRoutes = [
  '/superadmin',
  '/admin',
  '/accountant',
  '/teacher',
  '/student',
  '/parent',
] as const

type BaseRoute = typeof baseRoutes[number]

const rolePathMap: Record<BaseRoute, string[]> = {
  '/superadmin': ['superadmin'],
  '/admin': ['superadmin', 'admin'],
  '/accountant': ['superadmin', 'admin', 'accountant'],
  '/teacher': ['superadmin', 'admin', 'teacher'],
  '/student': ['superadmin', 'admin', 'student'],
  '/parent': ['superadmin', 'admin', 'parent'],
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          response.cookies.set(name, value, options)
        },
        remove: (name, options) => {
          response.cookies.set(name, '', options)
        },
      },
    }
  )

  const path = request.nextUrl.pathname
  const baseRoute = ('/' + path.split('/')[1]) as BaseRoute

  // Get the current session to access the user ID
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Get user's school context
  if (session?.user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', session.user.id)
      .single()

    if (!userData?.school_id) {
      return NextResponse.redirect(new URL('/school-selection', request.url))
    }

    // Add school_id to request headers for use in API routes
    request.headers.set('x-school-id', userData.school_id)
  }

  if (baseRoutes.includes(baseRoute)) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!userData || !rolePathMap[baseRoute].includes(userData.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  if (rolePathMap[baseRoute]) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!userData || !rolePathMap[baseRoute].includes(userData.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/superadmin/:path*',
    '/admin/:path*',
    '/accountant/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/parent/:path*',
  ],
}

