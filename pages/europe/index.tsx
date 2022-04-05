import { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../../components/sidebar'
import { LngLatBoundsLike } from 'react-map-gl'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'
import StylesControl from '../../components/map/StylesControl'
import { MapLayerMouseEvent } from 'mapbox-gl'

const Map = dynamic(() => import('../../components/mapbox'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
})

const Home: NextPage = () => {
  const [featureData, setFeatureData] = useState<{
    [key: string]: unknown
  } | null>(null)

  const featureClickHandler = useCallback((e: MapLayerMouseEvent) => {
    if (e.features) {
      const clickedFeature = e.features[0].properties
      const featureDataObject = {
        ...clickedFeature,
        mapboxLayerId: e.features[0].layer.id,
      }
      setFeatureData(featureDataObject)
    }
  }, [])

  const stylesSwitcherStyles: MapboxStyleDefinition[] = [
    {
      title: 'Satellite',
      uri: 'mapbox://styles/dotly/ckpnekd8308ff18t4n0cc1jo3/draft', // CHANGE TO PRODUCTION
    },
    {
      title: 'Light',
      uri: 'mapbox://styles/dotly/ckpxomwzq0syt17nzenb4p17r',
    },
    {
      title: 'Data',
      uri: 'mapbox://styles/dotly/ckpxomzkq08gp19o8o99y0yut',
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

  const mapInteractiveLayerIds = ['EU-Railroad-Crossings', 'EU-Railroad-Bridges']

  return (
    <>
      <Sidebar featureData={featureData}></Sidebar>
      <div className="h-screen w-screen">
        <Map
          terrain
          initialViewState={mapViewState}
          interactiveLayerIds={mapInteractiveLayerIds}
          locationControlLocation="/"
          mapStyle={stylesSwitcherStyles[0].uri}
          maxBounds={mapMaxBounds}
          onClickHandler={featureClickHandler}
        >
          <StylesControl styles={stylesSwitcherStyles} />
        </Map>
      </div>
    </>
  )
}

export default Home
