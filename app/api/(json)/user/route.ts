import { unstable_noStore as noStore } from 'next/cache'
import { isValidUrl } from "@/src/url"
import { UserStore } from '@/src/store'
import { hash } from 'bcrypt'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const body = await request.json()
  const { email, password, name, message } = body
  const passwordHash = await hash(password, 10)

  if (!isValidUrl(request.url)) {
    return Response.json({ message: 'Invalid URL.' }, { status: 400 })
  }

  const imageUrl = new URL('/user.png', request.url)

  if (await UserStore.get(email)) {
    return Response.json({ message: 'User already exists.' }, { status: 400 })
  }

  await UserStore.set(
    email,
    { email: email, password: passwordHash, name: name, message: message, imageUrl: imageUrl },
  )

  return Response.json({})
}