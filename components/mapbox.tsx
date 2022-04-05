import { useState, useCallback, forwardRef } from 'react'
import Map, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  Source,
  Layer,
  LngLatBoundsLike,
  MapRef,
  MapboxMap,
  useMap,
  MapboxEvent,
} from 'react-map-gl'
import StylesControl from './map/StylesControl'
import LayerControl from './map/LayerControl'
import GeocoderControl from './map/GeocoderControl'
import LocationControl from './map/LocationControl'
import { LayerProps } from 'react-map-gl'
import { Feature, FeatureCollection } from 'geojson'

interface CustomMapProps {
  mapStyle: string
  interactiveLayerIds: string[]
  onClickHandler: (e: any) => void
  maxBounds: LngLatBoundsLike
  initialViewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  layerControl?: boolean
  locationControlLocation?: string
  amtrakLocationControlLocation?: string
  terrain?: boolean
  children?: React.ReactNode
  onLoad?: (map: MapboxEvent) => void
}

const MapboxGlMap = (props: CustomMapProps) => {
  const [cursorSate, setCursorState] = useState('unset')

  const onMouseEnter = useCallback((e: any) => {
    setCursorState('pointer')
  }, [])
  const onMouseLeave = useCallback((e: any) => {
    setCursorState('unset')
  }, [])

  let terrainProps = props.terrain
    ? {
        terrain: { source: 'mapbox-dem', exaggeration: 1.5 },
      }
    : null

  return (
    <Map
      id="mainMapboxMap"
      initialViewState={props.initialViewState}
      mapStyle={props.mapStyle}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      interactiveLayerIds={props.interactiveLayerIds}
      cursor={cursorSate}
      onClick={props.onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onLoad={props.onLoad ? props.onLoad : void 0}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      maxBounds={props.maxBounds}
      {...terrainProps}
    >
      <GeocoderControl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        collapsed
      />
      <GeolocateControl />
      <NavigationControl />
      <FullscreenControl containerId="body" />

      {props.locationControlLocation ? (
        <LocationControl
          location={props.locationControlLocation}
          svg='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m17.36 2.64l-1.41 1.42A6.978 6.978 0 0 1 18 9a7 7 0 0 1-7 7c-1.85 0-3.63-.74-4.94-2.05l-1.42 1.41A8.945 8.945 0 0 0 10 17.93V20H6v2h10v-2h-4v-2.06c4.55-.51 8-4.36 8-8.94c0-2.38-.95-4.67-2.64-6.36M11 3.5A5.5 5.5 0 0 0 5.5 9a5.5 5.5 0 0 0 5.5 5.5A5.5 5.5 0 0 0 16.5 9A5.5 5.5 0 0 0 11 3.5m0 2c1.94 0 3.5 1.57 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 7.5 9A3.5 3.5 0 0 1 11 5.5Z"/></svg>'
        />
      ) : null}

      {props.amtrakLocationControlLocation ? (
        <LocationControl
          location={props.amtrakLocationControlLocation}
          svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M264.437 173.779C233.5 172.323 71.9 168.216 0 199.364c19.446 11.487 40.304 23.404 64.792 36.321 71.256-33.337 163.7-45.394 248.716-50.033v-2.16c-16.531-2.019-34.781-5.55-49.071-9.712h0zm72.648 13.067c-63.789 6.367-176.712 24.86-241.056 64.925 23.396 11.771 47.86 23.425 72.302 34.315 67.746-57.756 157.356-83.371 248.673-101.323v-2.117c-23.202 2.729-58.256 4.398-79.919 4.2h0zM201.977 300.554c30.862 12.76 62.789 24.496 89.985 32.34 32.769-65.137 92.008-116.773 201.187-164.091v-2.135c-140.237 38.346-227.993 65.821-291.172 133.887h0z"/> </svg>'
        />
      ) : null}

      {props.terrain ? (
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
      ) : null}

      {props.children}
    </Map>
  )
}

export default MapboxGlMap
