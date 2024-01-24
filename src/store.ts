import { createClient } from '@vercel/kv'
import { User } from '@/src/interfaces'

// disable automatic deserialization.
// https://github.com/vercel/storage/tree/main/packages/kv#automatic-deserialization
const kvc = createClient({
  url: process.env.KV_REST_API_URL ?? '',
  token: process.env.KV_REST_API_TOKEN ?? '',
  automaticDeserialization: false,
})

export class UserStore {
  static async get(email: string): Promise<User|null> {
    const str = await kvc.get<string>(`user:${email}`)
    return str ? deserializeUser(str) : null
  }

  static async set(email: string, user: User) {
    const str = serializeUser(user)
    await kvc.set<string>(`user:${email}`, str, { ex: 24 * 60 * 60 })
  }
}

export class TokenStore {
  static async get(token: string): Promise<User|null> {
    const str = await kvc.get<string>(`token:${token}`)
    return str ? deserializeUser(str) : null
  }

  static async set(token: string, user: User) {
    const str = serializeUser(user)
    await kvc.set<string>(`token:${token}`, str, { ex: 60 * 60 })
  }

  static async delete(token: string) {
    await kvc.del(`token:${token}`)
  }
}

function serializeUser(user: User): string {
  return JSON.stringify(user)
}

function deserializeUser(user: string): User {
  const obj = JSON.parse(user)
  return { ...obj, imageUrl: new URL(obj.imageUrl) }
}