import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { TokenStore } from '@/src/store'

export async function POST(request: Request) {
  noStore()  // https://github.com/vercel/storage/issues/510

  const token = cookies().get('token')

  if (token) {
    await TokenStore.delete(token.value)
  }

  return Response.json({})
}