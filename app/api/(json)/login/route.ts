import { unstable_noStore as noStore } from 'next/cache'
import { UserStore, TokenStore } from '@/src/store'
import { hash, compare } from 'bcrypt'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const body = await request.json()
  const { email, password } = body

  const user = await UserStore.get(email)

  // user existence.
  if (user === null) {
    return Response.json({ message: 'Invalid email or password.' }, { status: 401 })
  }

  // password validation.
  if (!await compare(password, user.password)) {
    return Response.json({ message: 'Invalid email or password.' }, { status: 401 })
  }

  const token = btoa(await hash(Math.random().toString(32), 1))
  await TokenStore.set(token, user)

  return Response.json({ token: token })
}