import { kv } from "@vercel/kv"
import { unstable_noStore as noStore } from 'next/cache'
import { User } from '../../../src/interfaces'
import { hash } from 'bcrypt'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const body = await request.json()
  const { email, password, name } = body
  const passwordHash = await hash(password, 10)

  await kv.set<User>(email, { email: email, password: passwordHash, name }, { ex: 24 * 60 * 60, nx: true })
  console.log(email, passwordHash, name)

  return Response.json({})
}