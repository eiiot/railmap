import { useState, useEffect, useCallback, useRef } from 'react'
import Map, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  Source,
  Layer,
  MapRef,
  LngLatBoundsLike,
} from 'react-map-gl'
import StylesControl from './map/StylesControl'
import LayerControl from './map/LayerControl'
import GeocoderControl from './map/GeocoderControl'
import LocationControl from './map/LocationControl'
import { LayerProps } from 'react-map-gl'
import { Feature, FeatureCollection } from 'geojson'

interface CustomMapProps {
  stylesArray: { label: string; styleName: string; styleUrl: string }[]
  viewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  interactiveLayerIds: string[]
  onClickHandler: (e: any) => void
  maxBounds: LngLatBoundsLike
  layerControl?: boolean
  locationControlLocation: string
}

export default function MapboxMap(props: CustomMapProps) {
  const [trainsGeoJSON, setTrainsGeoJSON] = useState<FeatureCollection | null>(
    null
  )

  const [cursorSate, setCursorState] = useState('unset')

  const mapRef = useRef<MapRef | null>(null)

  const onLoad = useCallback(() => {
    console.log('Map loaded')
    // mapRef.current?.on('click', (e: any) => {
    //   console.log(e)
    // })
  }, [])

  async function getTrains() {
    // Make a GET request to the API and return the location of the trains.
    try {
      const response = await fetch('https://api.amtraker.com/v1/trains', {
        method: 'GET',
      })
      const trains = await response.json()
      // returns object of trains with the object num as the train number

      // create a geoJSON object
      const geoJSON = {
        type: 'FeatureCollection',
        features: [],
      } as FeatureCollection

      // iterate through trains
      Object.keys(trains).forEach((key) => {
        const activeTrains = trains[key]

        // iterate through active trains
        Object.keys(activeTrains).forEach((key) => {
          const train = activeTrains[key] // type of train is object
          const trainObject = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [train.lon, train.lat],
            },
            properties: { ...train },
          } as Feature
          // push train to geoJSON
          geoJSON.features.push(trainObject)
        })
      })

      return geoJSON
    } catch (error) {
      console.error(error)
    }
  }

  const onMouseEnter = useCallback((e: any) => {
    console.log('mouse enter')
    setCursorState('pointer')
  }, [])
  const onMouseLeave = useCallback((e: any) => {
    console.log('mouse leave')
    setCursorState('unset')
  }, [])

  useEffect(() => {
    getTrains()
      .then((geoJSON) => {
        try {
          setTrainsGeoJSON(geoJSON!)
        } catch (error) {
          console.error(error)
        }
      })
      .catch((error) => {
        console.error(error)
      })

    const interval = setInterval(async () => {
      getTrains()
        .then((geoJSON) => {
          setTrainsGeoJSON(geoJSON!)
        })
        .catch((error) => {
          console.error(error)
        })
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const trainLayerStyle = {
    id: 'trains',
    type: 'circle',
    source: 'trains',
    paint: {
      'circle-color': 'hsl(203, 68%, 29%)',
      'circle-radius': 11,
      'circle-opacity': 1,
    },
    layout: {
      // Make the layer visible by default.
      visibility: 'visible',
    },
  } as LayerProps

  const trainNumbersLayerStyle = {
    id: 'train-numbers',
    type: 'symbol',
    source: 'trains',
    layout: {
      'text-field': ['to-string', ['get', 'trainNum']],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
      visibility: 'visible',
    },
    paint: {
      'text-color': '#fff',
    },
  } as LayerProps

  return (
    <Map
      initialViewState={props.viewState}
      mapStyle={props.stylesArray[0].styleUrl}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      interactiveLayerIds={props.interactiveLayerIds}
      cursor={cursorSate}
      onClick={props.onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onLoad={onLoad}
      ref={mapRef}
      style={{ position: 'absolute', width: '100vw', height: '100vh' }}
      maxBounds={props.maxBounds}
    >
      <StylesControl styles={props.stylesArray} />
      <GeocoderControl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        collapsed
      />
      <GeolocateControl />
      <NavigationControl />
      <FullscreenControl />
      {props.layerControl ? (
        <LayerControl layerIds={['trains', 'train-numbers']} />
      ) : null}
      <LocationControl location={props.locationControlLocation} />

      <Source id="trains" type="geojson" data={trainsGeoJSON!}>
        <Layer {...trainLayerStyle} />
        <Layer {...trainNumbersLayerStyle} />
      </Source>
    </Map>
  )
}
