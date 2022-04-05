import { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../components/sidebar'
import Loader from '../components/loader'
import { Layer, LayerProps, LngLatBoundsLike, MapLayerMouseEvent, Source } from 'react-map-gl'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'
import LayerControl from '../components/map/LayerControl'
import StylesControl from '../components/map/StylesControl'
import { Feature, FeatureCollection } from 'geojson'

const Map = dynamic(() => import('../components/mapbox'), {
  loading: () => <Loader />,
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

  //  * Live Amtrak Trains * //

  const amtrakLayerStyle: LayerProps = {
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
  }

  const amtrakNumbersLayerStyle: LayerProps = {
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
  }

  const [amtrakGeoJSON, setAmtrakGeoJSON] = useState<FeatureCollection | undefined>(undefined)

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

  const onLoadHandler = useCallback(() => {
    // integrate the useEffect hook from above but instead run it on load
    getAmtrak()
      .then((geoJSON) => {
        setAmtrakGeoJSON(geoJSON)
      })
      .catch((error) => {
        console.error(error)
      })

    setInterval(async () => {
      getAmtrak()
        .then((geoJSON) => {
          setAmtrakGeoJSON(geoJSON)
        })
        .catch((error) => {
          console.error(error)
        })
    }, 60000)
  }, [])

  // * End Live Amtrak Trains * //

  return (
    <>
      <Sidebar featureData={featureData}></Sidebar>
      <div className="h-screen w-screen">
        <Map
          terrain
          amtrakLocationControlLocation="/amtrak"
          initialViewState={mapViewState}
          interactiveLayerIds={mapInteractiveLayerIds}
          locationControlLocation="/europe"
          mapStyle={stylesSwitcherStyles[0].uri}
          maxBounds={mapMaxBounds}
          onClickHandler={featureClickHandler}
          onLoad={onLoadHandler}
        >
          <StylesControl styles={stylesSwitcherStyles} />
          <LayerControl layerIds={['amtrak', 'amtrak-numbers']} />
          <Source data={amtrakGeoJSON} id="amtrak" type="geojson">
            <Layer {...amtrakLayerStyle} />
            <Layer {...amtrakNumbersLayerStyle} />
          </Source>
        </Map>
      </div>
    </>
  )
}

export default Home
