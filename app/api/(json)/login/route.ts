import { kv } from "@vercel/kv"
import { unstable_noStore as noStore } from 'next/cache'
import { User } from '@/src/interfaces'
import { hash, compare } from 'bcrypt'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const body = await request.json()
  const { email, password } = body

  const user = await kv.get<User>(email)
  console.log(user)

  // user existence.
  if (user === null) {
    return Response.json({ message: 'Invalid email or password.' }, { status: 401 })
  }

  // password validation.
  if (!await compare(password, user.password)) {
    return Response.json({ message: 'Invalid email or password.' }, { status: 401 })
  }

  const token = btoa(await hash(Math.random().toString(32), 1))
  await kv.set<User>(`token:${token}`, user, { ex: 60 * 60 })
  console.log(token)

  return Response.json({ token: token })
}