import LocationControl from '../../components/map/LocationControl'
import StylesControl from '../../components/map/StylesControl'
import Sidebar from '../../components/sidebar'
import { MapLayerMouseEvent } from 'mapbox-gl'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'
import dynamic from 'next/dynamic'

import { useCallback, useState } from 'react'
import { LngLatBoundsLike, Source } from 'react-map-gl'
import type { NextPage } from 'next'

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
      const clickedFeatureDef = e.features[0]
      if (!clickedFeatureDef) return
      const clickedFeature = clickedFeatureDef.properties
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
      <Sidebar mapboxFeatureData={featureData} />
      <div className="h-screen w-screen">
        <Map
          initialViewState={mapViewState}
          interactiveLayerIds={mapInteractiveLayerIds}
          mapStyle={stylesSwitcherStyles[0].uri}
          maxBounds={mapMaxBounds}
          onClick={featureClickHandler}
          terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        >
          <StylesControl styles={stylesSwitcherStyles} />
          <LocationControl
            location="/"
            svg='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m17.36 2.64l-1.41 1.42A6.978 6.978 0 0 1 18 9a7 7 0 0 1-7 7c-1.85 0-3.63-.74-4.94-2.05l-1.42 1.41A8.945 8.945 0 0 0 10 17.93V20H6v2h10v-2h-4v-2.06c4.55-.51 8-4.36 8-8.94c0-2.38-.95-4.67-2.64-6.36M11 3.5A5.5 5.5 0 0 0 5.5 9a5.5 5.5 0 0 0 5.5 5.5A5.5 5.5 0 0 0 16.5 9A5.5 5.5 0 0 0 11 3.5m0 2c1.94 0 3.5 1.57 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 7.5 9A3.5 3.5 0 0 1 11 5.5Z"/></svg>'
          />

          <Source
            id="mapbox-dem"
            maxzoom={14}
            tileSize={512}
            type="raster-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
          />
        </Map>
      </div>
    </>
  )
}

export default Home
