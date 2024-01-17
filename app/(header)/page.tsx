import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Home</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">The following URLs are examples of using JSFiddle to replicate vulnerabilities.</p>

          <h3 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">CSRF (Cross-Site Request Forgery)</h3>
          <p className="mb-8 lg:mb-16 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            <Link href="https://jsfiddle.net/megmogmog/yxkcqd42/" className="text-blue-600 hover:underline dark:text-blue-500">https://jsfiddle.net/megmogmog/yxkcqd42/</Link>
          </p>

          <h3 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">Clickjacking</h3>
          <p className="mb-8 lg:mb-16 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            <Link href="https://jsfiddle.net/megmogmog/7w35ry2u/" className="text-blue-600 hover:underline dark:text-blue-500">https://jsfiddle.net/megmogmog/7w35ry2u/</Link>
          </p>

          <h3 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">SSRF (Server-Side Request Forgery)</h3>
          <p className="mb-4 lg:mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">Set environment variable `ENABLE_SSRF=&quot;true&quot;`.</p>
          <p className="mb-4 lg:mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">Create `index.js` file as follows.</p>
          <pre className="mb-4 lg:mb-8 font-light text-sm sm:text-base">
            <code>
{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ id: '......', key: 'xxxxxxx' });
});

app.listen('3001', () => {
    console.log('Application started');
});`}
            </code>
          </pre>
          <p className="mb-4 lg:mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">Run `npm i express`.</p>
          <p className="mb-4 lg:mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">Run `node index.js`.</p>
          <p className="mb-4 lg:mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Then, edit the <Link href="/profile/edit" className="text-blue-600 hover:underline dark:text-blue-500">Image URL</Link> to `http://127.0.0.1:3001/`.
          </p>
        </div>
      </section>
    </>
  )
}
