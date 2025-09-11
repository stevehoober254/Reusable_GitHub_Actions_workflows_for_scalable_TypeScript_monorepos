import Head from 'next/head'

export default function Home() {
  return (
    <div className="px-8">
      <Head>
        <title>Web App - TypeScript Monorepo</title>
        <meta name="description" content="Next.js web app in TypeScript monorepo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center">
        <h1 className="m-0 text-6xl text-center leading-tight">
          Welcome to the Web App!
        </h1>

        <p className="my-16 text-2xl text-center">
          Next.js web application in TypeScript monorepo
        </p>

        <div className="flex items-center justify-center flex-wrap max-w-4xl">
          <a
            target='_blank'
            href="http://localhost:4000/api/health"
            className="m-4 p-6 text-left no-underline border border-gray-300 rounded-lg transition-colors duration-150 ease-in-out max-w-xs hover:text-blue-600 hover:border-blue-600"
          >
            <h2 className="mb-4 text-2xl">API Health &rarr;</h2>
            <p className="m-0 text-xl leading-6">Check the health of the API service</p>
          </a>

          <a
            href="https://nextjs.org/docs"
            className="m-4 p-6 text-left no-underline border border-gray-300 rounded-lg transition-colors duration-150 ease-in-out max-w-xs hover:text-blue-600 hover:border-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-4 text-2xl">Documentation &rarr;</h2>
            <p className="m-0 text-xl leading-6">Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="m-4 p-6 text-left no-underline border border-gray-300 rounded-lg transition-colors duration-150 ease-in-out max-w-xs hover:text-blue-600 hover:border-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-4 text-2xl">Learn &rarr;</h2>
            <p className="m-0 text-xl leading-6">Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="m-4 p-6 text-left no-underline border border-gray-300 rounded-lg transition-colors duration-150 ease-in-out max-w-xs hover:text-blue-600 hover:border-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-4 text-2xl">Examples &rarr;</h2>
            <p className="m-0 text-xl leading-6">Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>
      </main>
    </div>
  )
}
