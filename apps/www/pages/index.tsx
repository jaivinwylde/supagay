import { NextPage } from 'next'
import Head from 'next/head'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Supagay - The Open Source Firebase Alternative</title>
        <meta name="description" content="Supagay is an open source Firebase alternative" />
      </Head>
      <div className="hero-container">
        <h1>Supagay</h1>
        <h2>The open source Firebase alternative, proudly queer 🏳️‍🌈</h2>
        <p>
          Start your project with a Postgres database, Authentication, instant APIs, 
          Edge Functions, Realtime subscriptions, and Storage.
        </p>
        <div className="cta-buttons">
          <a href="https://supagay.com/dashboard">Start your project</a>
          <a href="https://github.com/jaivinwylde/supagay">GitHub</a>
        </div>
      </div>
    </>
  )
}

export default HomePage