import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Sidebar from '../../components/sidebar'
import { LngLatBoundsLike } from 'react-map-gl'

const Map = dynamic(() => import('../../components/mapbox'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
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
      console.log('Set feature data:', featureDataObject)
      setFeatureData(featureDataObject)
    }
  }, [])

  const mapStyles = [
    {
      label: 'Satellite',
      styleName: 'Satellite',
      styleUrl: 'mapbox://styles/dotly/ckpnekd8308ff18t4n0cc1jo3/draft', // CHANGE TO PRODUCTION
    },
    {
      label: 'Light',
      styleName: 'Light',
      styleUrl: 'mapbox://styles/dotly/ckpxomwzq0syt17nzenb4p17r',
    },
    {
      label: 'Data',
      styleName: 'Data',
      styleUrl: 'mapbox://styles/dotly/ckpxomzkq08gp19o8o99y0yut',
    },
  ]

  const mapViewState = {
    longitude: 8,
    latitude: 49,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-28.9, 23.2],
    [125.5, 75.5],
  ] as LngLatBoundsLike

  const mapInteractiveLayerIds = [
    'EU-Railroad-Crossings',
    'EU-Railroad-Bridges',
  ]

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
      <Map
        onClickHandler={featureClickHandler}
        stylesArray={mapStyles}
        viewState={mapViewState}
        maxBounds={mapMaxBounds}
        interactiveLayerIds={mapInteractiveLayerIds}
        locationControlLocation="/"
      />
    </>
  )
}

export default Home
