import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../components/sidebar'
import { LngLatBoundsLike } from 'react-map-gl'

const Map = dynamic(() => import('../components/mapbox'), {
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
      styleUrl: 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy',
    },
    {
      label: 'Light',
      styleName: 'Light',
      styleUrl: 'mapbox://styles/dotly/ckoz6vsl50kv117pg6tbt6icm',
    },
    {
      label: 'Data',
      styleName: 'Data',
      styleUrl: 'mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig',
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
    'trains',
    'Railroad-Crossings',
    'Railroad-Bridges',
    'CN-Railroad-Crossings',
    'CN-Railroad-Bridges',
  ]

  return (
    <>
      <Sidebar featureData={featureData}></Sidebar>
      <Map
        onClickHandler={featureClickHandler}
        stylesArray={mapStyles}
        viewState={mapViewState}
        maxBounds={mapMaxBounds}
        interactiveLayerIds={mapInteractiveLayerIds}
        layerControl
        locationControlLocation="/europe"
        terrain
      />
    </>
  )
}

export default Home
