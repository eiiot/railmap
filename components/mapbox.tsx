import { useState, useCallback } from 'react'
import Map, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  Source,
  Layer,
  LngLatBoundsLike,
} from 'react-map-gl'
import StylesControl from './map/StylesControl'
import LayerControl from './map/LayerControl'
import GeocoderControl from './map/GeocoderControl'
import LocationControl from './map/LocationControl'
import { LayerProps } from 'react-map-gl'
import { Feature, FeatureCollection } from 'geojson'

interface CustomMapProps {
  stylesArray?: { label: string; styleName: string; styleUrl: string }[]
  mapStyle?: string
  viewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  interactiveLayerIds: string[]
  onClickHandler: (e: any) => void
  maxBounds: LngLatBoundsLike
  layerControl?: boolean
  locationControlLocation?: string
  terrain?: boolean
  liveTrains: { [key: string]: boolean }
}

async function getAmtrak() {
  // Make a GET request to the API and return the location of the trains.
  try {
    const response = await fetch('https://api.amtraker.com/v1/trains', {
      method: 'GET',
    })
    const trainNums = await response.json()
    // returns object of trains with the object num as the train number

    // create a geoJSON object
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    } as FeatureCollection

    // iterate through the train numbers
    Object.keys(trainNums).forEach((num) => {
      const trains = trainNums[num]

      // iterate through trains
      Object.keys(trains).forEach((key) => {
        const train = trains[key] // type of train is object
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

const amtrakLayerStyle = {
  id: 'amtrak',
  type: 'circle',
  source: 'amtrak',
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

const amtrakNumbersLayerStyle = {
  id: 'amtrak-numbers',
  type: 'symbol',
  source: 'amtrak',
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

export default function MapboxMap(props: CustomMapProps) {
  const [amtrakGeoJSON, setAmtrakGeoJSON] = useState<FeatureCollection | null>(
    null
  )
  const [cursorSate, setCursorState] = useState('unset')

  const onMouseEnter = useCallback((e: any) => {
    console.log('mouse enter')
    setCursorState('pointer')
  }, [])
  const onMouseLeave = useCallback((e: any) => {
    console.log('mouse leave')
    setCursorState('unset')
  }, [])

  const onLoadHandler = useCallback(() => {
    // integrate the useEffect hook from above but instead run it on load
    if (props.liveTrains.amtrak) {
      getAmtrak()
        .then((geoJSON) => {
          setAmtrakGeoJSON(geoJSON!)
        })
        .catch((error) => {
          console.error(error)
        })

      const interval = setInterval(async () => {
        getAmtrak()
          .then((geoJSON) => {
            setAmtrakGeoJSON(geoJSON!)
          })
          .catch((error) => {
            console.error(error)
          })
      }, 60000)
    }
  }, [])

  let terrainProps = props.terrain
    ? {
        terrain: { source: 'mapbox-dem', exaggeration: 1.5 },
      }
    : null

  return (
    <Map
      initialViewState={props.viewState}
      mapStyle={
        props.stylesArray ? props.stylesArray[0].styleUrl : props.mapStyle
      }
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      interactiveLayerIds={props.interactiveLayerIds}
      cursor={cursorSate}
      onClick={props.onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onLoad={onLoadHandler}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      maxBounds={props.maxBounds}
      {...terrainProps}
    >
      {props.stylesArray ? <StylesControl styles={props.stylesArray} /> : null}
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

      {props.locationControlLocation ? (
        <LocationControl location={props.locationControlLocation} />
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

      {props.liveTrains.amtrak ? (
        <Source id="amtrak" type="geojson" data={amtrakGeoJSON!}>
          <Layer {...amtrakLayerStyle} />
          <Layer {...amtrakNumbersLayerStyle} />
        </Source>
      ) : null}
    </Map>
  )
}
