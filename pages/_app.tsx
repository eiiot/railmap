import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl-style-switcher/styles.css'
import '@fontsource/inter'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MapProvider } from 'react-map-gl'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Rail Map</title>
        <meta content="The Rail Map" name="title" />
        <meta content="View Railroad Crossings, Live Amtrak, & More!" name="description" />

        <meta content="website" property="og:type" />
        <meta content="https://therailmap.com/" property="og:url" />
        <meta content="The Rail Map" property="og:title" />
        <meta content="View Railroad Crossings, Live Amtrak, & More!" property="og:description" />
        <meta content="/meta.png" property="og:image" />

        <meta content="summary_large_image" property="twitter:card" />
        <meta content="https://therailmap.com" property="twitter:url" />
        <meta content="The Rail Map" property="twitter:title" />
        <meta
          content="View Railroad Crossings, Live Amtrak, & More!"
          property="twitter:description"
        />
        <meta content="/meta.png" property="twitter:image" />

        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#ffeb60" name="msapplication-TileColor" />
        <meta content="#ffeb60" name="theme-color" />
        <meta content="#ffeb60" name="og:theme-color" />

        {/* Analytics */}
        <script
          defer
          data-domain="therailmap.com"
          src="https://analytics.eliothertenstein.com/js/plausible.js"
        ></script>
      </Head>
      <MapProvider>
        <Component {...pageProps}></Component>
      </MapProvider>
    </>
  )
}

export default MyApp
