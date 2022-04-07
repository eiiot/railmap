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
        <meta content="width=device-width" name="viewport" />
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
