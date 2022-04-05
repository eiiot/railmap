import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../components/sidebar'
import Loader from '../components/loader'
import { LngLatBoundsLike } from 'react-map-gl'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'

const Map = dynamic(() => import('../components/mapbox'), {
  loading: () => <Loader />,
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
      setFeatureData(featureDataObject)
    }
  }, [])

  const mapStyles: MapboxStyleDefinition[] = [
    {
      title: 'Satellite',
      uri: 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy',
    },
    {
      title: 'Light',
      uri: 'mapbox://styles/dotly/ckoz6vsl50kv117pg6tbt6icm',
    },
    {
      title: 'Data',
      uri: 'mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig',
    },
  ]

  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

  const mapInteractiveLayerIds = [
    'amtrak',
    'Railroad-Crossings',
    'Railroad-Bridges',
    'CN-Railroad-Crossings',
    'CN-Railroad-Bridges',
  ]

  const liveTrains = {
    amtrak: true,
  }

  return (
    <>
      <Sidebar featureData={featureData}></Sidebar>
      <div className="h-screen w-screen">
        <Map
          onClickHandler={featureClickHandler}
          stylesArray={mapStyles}
          viewState={mapViewState}
          maxBounds={mapMaxBounds}
          interactiveLayerIds={mapInteractiveLayerIds}
          liveTrains={liveTrains}
          layerControl
          locationControlLocation="/europe"
          amtrakLocationControlLocation="/amtrak"
          terrain
        />
      </div>
    </>
  )
}

export default Home
