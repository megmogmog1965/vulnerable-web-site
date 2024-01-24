import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TokenStore } from '@/src/store'

// https://nextjs.org/docs/app/building-your-application/routing/middleware
export async function middleware(request: NextRequest) {
  if (!await validToken(request)) {
    const res = request.url.startsWith('/api/')
      ? NextResponse.json({}, { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url))

    return res
  }
}

async function validToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('token')

  if (!token) {
    return false
  }

  if (await TokenStore.get(token.value) === null) {
    return false
  }

  return true
}

// See "Matching Paths"
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: '/((?!_next|_vercel|.*\\..*|login|api/login|signup|api/user).*)',
}