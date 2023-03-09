import '../styles/globals.css'
import { Fragment } from 'react'
import Providers from '../contexts/Providers'
import Head from 'next/head'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

function MyApp(props: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="description" content="" />
        <meta name="theme-color" content="#1FC7D4" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/font.css" />
        <title>Lenen</title>
      </Head>
      <Providers>
        <App {...props} />
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.Layout || Fragment
  return (
    <main className="min-w-[320px] min-h-screen flex max-w-[1920px] mx-auto xl:min-w-[1900px]">
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </main>
  )
}

export default MyApp
