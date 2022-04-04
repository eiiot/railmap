import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../components/sidebar'
import Loader from '../components/loader'
import { LngLatBoundsLike } from 'react-map-gl'

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
      console.log('Set feature data:', featureDataObject)
      setFeatureData(featureDataObject)
    }
  }, [])

  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

  const mapInteractiveLayerIds = ['amtrak', 'amtrak-stations']

  const liveTrains = {
    amtrak: true,
  }

  return (
    <>
      <Sidebar featureData={featureData}></Sidebar>
      <div className="h-screen w-screen">
        <Map
          onClickHandler={featureClickHandler}
          mapStyle="mapbox://styles/dotly/ckqim4kef1ubg18pjg02v9zxp"
          liveTrains={liveTrains}
          viewState={mapViewState}
          maxBounds={mapMaxBounds}
          amtrakLocationControlLocation="/"
          interactiveLayerIds={mapInteractiveLayerIds}
          terrain
        />
      </div>
    </>
  )
}

export default Home
