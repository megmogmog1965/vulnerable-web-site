import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Home</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">The following URLs are examples of using JSFiddle to replicate vulnerabilities.</p>

          <h3 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">CSRF (Cross-Site Request Forgery)</h3>
          <p className="mb-8 lg:mb-16 font-light text-gray-500 dark:text-gray-400 sm:text-xl"><Link href="https://jsfiddle.net/megmogmog/yxkcqd42/">https://jsfiddle.net/megmogmog/yxkcqd42/</Link></p>

          <h3 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">Clickjacking</h3>
          <p className="mb-8 lg:mb-16 font-light text-gray-500 dark:text-gray-400 sm:text-xl"><Link href="https://jsfiddle.net/megmogmog/7w35ry2u/">https://jsfiddle.net/megmogmog/7w35ry2u/</Link></p>
        </div>
      </section>
    </>
  )
}
