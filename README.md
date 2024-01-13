[volta]:https://volta.sh/

# vulnerable-web-site

This is a project to reproduce following web application vulnerabilities.

* CSRF (Cross-Site Request Forgery)
* Clickjacking

## Demo on Vercel

https://vulnerable-web-site.vercel.app/

## Getting Started (Dev)

First, install Node.js `v20.10.0`, or [volta].

```bash
node -v
# v20.10.0
```

Install Node.js modules.

```bash
npm install
```

This project uses Vercel KV. Please follow the following instructions.

* [Prerequisites](https://vercel.com/docs/storage/vercel-kv/quickstart#prerequisites)
* [Quickstart - Create a KV database](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database)
* [Quickstart - Preparing your local project](https://vercel.com/docs/storage/vercel-kv/quickstart#preparing-your-local-project)

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy 

### Deploy on Server

Build and start the server.

```bash
npm run build
npm run start
```

Open [http://{server-ip-address}:3000](http://localhost:3000) with your browser to see the result.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Deploy on AWS Amplify

How to deploy Next.js with AWS Amplify.

* [English](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
* [日本語](https://docs.aws.amazon.com/ja_jp/amplify/latest/userguide/deploy-nextjs-app.html)
