import { kv } from "@vercel/kv"
import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const token = cookies().get('token')

  if (token) {
    await kv.del(`token:${token.value}`)
  }

  return Response.json({})
}