import { unstable_noStore as noStore } from 'next/cache'
import { User } from '@/src/interfaces'
import { isValidUrl } from '@/src/url'
import { UserStore, TokenStore } from '@/src/store'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const form = await request.formData()
  const name = form.get('name')?.valueOf()?.toString() ?? ''
  const message = form.get('message')?.valueOf()?.toString() ?? ''
  const imageUrlStr = form.get('imageUrl')?.valueOf()?.toString() ?? ''

  if (!isValidUrl(imageUrlStr)) {
    const url = new URL(request.url)
    const redirectUrl = new URL(`profile/edit?error=Invalid Image URL: ${imageUrlStr}`, `${url.protocol}//${url.host}`)
    return Response.redirect(redirectUrl)
  }

  const imageUrl = new URL(imageUrlStr)

  const token = cookies().get('token')?.value
  if (!token) {
    throw new Error('This is a bug.')
  }

  const user = await TokenStore.get(token)
  if (!user) {
    throw new Error('This is a bug.')
  }

  const email = user.email
  const updatedUser: User = { ...user, name: name, message: message, imageUrl: imageUrl }

  await UserStore.set(email, updatedUser)
  await TokenStore.set(token, updatedUser)

  const url = new URL(request.url)
  const redirectUrl = new URL('profile', `${url.protocol}//${url.host}`)

  return Response.redirect(redirectUrl)
}
