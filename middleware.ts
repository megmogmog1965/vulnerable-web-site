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
 
  if (process.env.ENABLE_CSP === 'true') {
    return responseWithCSP(request)
  }
}

// See "Matching Paths"
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: '/((?!_next|_vercel|.*\\..*|login|api/login|signup|api/user).*)',
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

// https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
function responseWithCSP(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
  .replace(/\s{2,}/g, ' ')
  .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return response
}