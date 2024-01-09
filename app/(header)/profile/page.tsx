import Link from 'next/link'
import { cookies } from 'next/headers'
import { kv } from "@vercel/kv"
import { User } from '../../../src/interfaces'

export default async function Home() {
  const token = cookies().get('token')?.value
  console.log(`token: ${token}`)
  if (!token) {
    throw new Error()
  }

  const user = await kv.get<User>(`token:${token}`)
  console.log(`user: ${user}`)
  if (!user) {
    throw new Error()
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Your Profile</h2>
          {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p> */}
          <form action="#" className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
              <span id="email" className="">{user.email}</span>
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
              <span id="name" className="">{user.name}</span>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Memo</label>
              <span id="message" className="">{user.message}</span>
            </div>
            <Link href="/profile/edit" className="block py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit</Link>
          </form>
        </div>
      </section>
    </>
  )
}
