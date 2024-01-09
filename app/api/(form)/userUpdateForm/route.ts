import { kv } from "@vercel/kv"
import { unstable_noStore as noStore } from 'next/cache'
import { User } from '../../../../src/interfaces'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const form = await request.formData()
  const name = form.get('name')?.valueOf()?.toString() ?? ''
  const message = form.get('message')?.valueOf()?.toString() ?? ''

  const token = cookies().get('token')?.value
  console.log(token)
  if (!token) {
    throw new Error('This is a bug.')
  }

  const user = await kv.get<User>(`token:${token}`)
  if (!user) {
    throw new Error('This is a bug.')
  }

  const email = user.email
  const updatedUser: User = { ...user, name: name, message: message }

  await kv.set<User>(email, updatedUser, { ex: 24 * 60 * 60, xx: true })
  await kv.set<User>(`token:${token}`, updatedUser, { ex: 24 * 60 * 60, xx: true })

  const url = new URL(request.url)
  const redirectUrl = new URL('profile', `${url.protocol}//${url.host}`)

  return Response.redirect(redirectUrl)
}