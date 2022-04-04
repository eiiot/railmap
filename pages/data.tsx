import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { LngLatBoundsLike } from 'react-map-gl'

const Map = dynamic(() => import('react-map-gl'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
})

const Home: NextPage = () => {
  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

  return (
    <>
      <Head>
        <title>The Rail Map</title>
        <meta
          name="viewport"
          content="initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="icon" type="image/png" href="/images/favicon.png" />

        <meta
          name="description"
          content="View Railroad Crossings, Live Amtrak, & More!"
        />
      </Head>
      <Map
        initialViewState={mapViewState}
        maxBounds={mapMaxBounds}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig"
        style={{ position: 'absolute', width: '100vw', height: '100vh' }}
      ></Map>
    </>
  )
}

export default Home
