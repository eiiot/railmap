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
    longitude: 8,
    latitude: 49,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-28.9, 23.2],
    [125.5, 75.5],
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
        mapStyle="mapbox://styles/dotly/ckpxomzkq08gp19o8o99y0yut"
        style={{ position: 'absolute', width: '100vw', height: '100vh' }}
      ></Map>
    </>
  )
}

export default Home
