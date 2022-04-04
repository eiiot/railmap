import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-controls/lib/controls.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@fontsource/inter'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Rail Map</title>
        <meta name="title" content="The Rail Map" />
        <meta
          name="description"
          content="View Railroad Crossings, Live Amtrak, & More!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://therailmap.com/" />
        <meta property="og:title" content="The Rail Map" />
        <meta
          property="og:description"
          content="View Railroad Crossings, Live Amtrak, & More!"
        />
        <meta property="og:image" content="/meta.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://therailmap.com" />
        <meta property="twitter:title" content="The Rail Map" />
        <meta
          property="twitter:description"
          content="View Railroad Crossings, Live Amtrak, & More!"
        />
        <meta property="twitter:image" content="/meta.png" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffeb60" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
