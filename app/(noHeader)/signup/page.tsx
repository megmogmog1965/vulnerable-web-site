'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, MouseEvent } from 'react'

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, name: '', message: '' }),
    })

    // error handling.
    if (res.status < 200 || res.status >= 400) {
      return
    }

    // redirect.
    router.push('/login')
  }

  // https://flowbite.com/blocks/marketing/login/
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <Image className="mr-2" src="/icon.png" width={32} height={32} alt="https://www.flaticon.com/free-icons/vulnerability - Vulnerability icons created by Dewi Sari - Flaticon" unoptimized />
              Vulnerable Web Site
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign up
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={ false } />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={ false } />
                      </div>
                      <div>
                          <label htmlFor="passwordConfirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                          <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={ false } />
                      </div>
                      <button type="submit" onClick={onSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Do you already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}
