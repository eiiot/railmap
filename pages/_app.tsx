import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl-style-switcher/styles.css'
import '@fontsource/inter'
import Head from 'next/head'
import { MapProvider } from 'react-map-gl'
import type { AppProps } from 'next/app'

var MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>The Rail Map</title>
        <meta content="The Rail Map" name="title" />
        <meta content="width=device-width" name="viewport" />
        {/* Analytics */}
        <script
          data-domain="therailmap.com"
          defer
          src="https://analytics.eliothertenstein.com/js/plausible.js"
         />
      </Head>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </>
  )
}

export default MyApp
