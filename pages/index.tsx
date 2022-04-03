import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

import Sidebar from '../components/sidebar'

const Map = dynamic(() => import('../components/mapbox'), {
  loading: () => <p>...</p>,
  ssr: false,
  // suspense: true,
})

const Home: NextPage = () => {
  const [featureData, setFeatureData] = useState(null)

  const featureClickHandler = useCallback((e: any) => {
    if (e.features[0]) {
      const clickedFeature = e.features[0].properties
      const featureDataObject = {
        ...clickedFeature,
        mapboxLayerId: e.features[0].layer.id,
      }
      console.log(featureDataObject)
      setFeatureData(featureDataObject)
    }
  }, [])

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
      <Sidebar featureData={featureData}></Sidebar>
      <Map onClickHandler={featureClickHandler} />
    </>
  )
}

export default Home
