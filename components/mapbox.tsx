import { useState, useEffect, useCallback } from 'react'
import Map, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  Source,
  Layer,
} from 'react-map-gl'
import StylesControl from './map/StylesControl'
import MapboxLayerControl from './map/LayerControl'
import { LayerProps } from 'react-map-gl'
import { Feature, FeatureCollection } from 'geojson'

const accessToken =
  'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ'

const styles = [
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

export default function MapboxMap(props: any) {
  const [trainsGeoJSON, setTrainsGeoJSON] = useState<FeatureCollection | null>(
    null
  )

  const [showTrains, setShowTrains] = useState(true)

  const [cursorSate, setCursorState] = useState('unset')

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
        setTrainsGeoJSON(geoJSON!)
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
      initialViewState={{
        longitude: -96,
        latitude: 37.8,
        zoom: 3.5,
      }}
      mapStyle="mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy"
      mapboxAccessToken={accessToken}
      interactiveLayerIds={['trains', 'Railroad-Crossings', 'Railroad-Bridges']}
      cursor={cursorSate}
      onClick={props.onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ position: 'absolute', width: '100vw', height: '100vh' }}
    >
      <StylesControl styles={styles} />
      <GeolocateControl />
      <NavigationControl />
      <FullscreenControl />
      <MapboxLayerControl layerIds={['trains', 'train-numbers']} />
      {/* <GeocoderControl mapboxAccessToken={accessToken} position="top-left" /> */}

      {showTrains ? (
        <Source id="trains" type="geojson" data={trainsGeoJSON!}>
          <Layer {...trainLayerStyle} />
          <Layer {...trainNumbersLayerStyle} />
        </Source>
      ) : null}
    </Map>
  )
}
