import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { fetchAllTrains } from 'amtrak'
import Loader from '../components/loader'
import Sidebar from '../components/sidebar'
import { Layer, LayerProps, LngLatBoundsLike, MapLayerMouseEvent, Source } from 'react-map-gl'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'
import LayerControl from '../components/map/LayerControl'
import StylesControl from '../components/map/StylesControl'
import { Feature, FeatureCollection } from 'geojson'
import LocationControl from '../components/map/LocationControl'
import Alert from '../components/trainsitionAlert'
import { CaltrainVehicleActivity } from '../components/MapDataTypes'

const Map = dynamic(() => import('../components/mapbox'), {
  loading: () => <Loader />,
  ssr: false,
})

async function getAmtrak() {
  // Make a GET request to the API and return the location of the trains.
  try {
    const trainNums = await fetchAllTrains()
    // returns object of trains with the object num as the train number

    // create a geoJSON object
    const geoJSON: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }

    // iterate through the train numbers
    for (const key in trainNums) {
      const trains = trainNums[key]

      // iterate through trains
      trains.forEach((train) => {
        const trainObject = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [train.lon, train.lat],
          },
          properties: train,
        } as Feature
        // push train to geoJSON
        geoJSON.features.push(trainObject)
      })
    }

    return geoJSON
  } catch (error) {
    console.error(error)
  }
}

async function getCaltrain() {
  // Make a GET request to the API and return the location of the trains.
  try {
    const response = await fetch(`https://api.therailmap.com/v1/caltrain`, { method: 'GET' })
    const responseJSON = await response.json()

    const trains = responseJSON.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity

    if (trains === undefined) {
      throw new Error('No trains found')
    }

    // Fly the map to the location.

    const geoJson: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }

    trains.forEach((train: CaltrainVehicleActivity) => {
      console.log(train)
      const trainObject: Feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            +train.MonitoredVehicleJourney.VehicleLocation.Longitude,
            +train.MonitoredVehicleJourney.VehicleLocation.Latitude,
          ],
        },
        properties: {
          name: train.MonitoredVehicleJourney.VehicleRef,
          ...train,
        },
      }
      geoJson.features.push(trainObject)
    })

    return geoJson

    // Return the location of the trains as GeoJSON.
  } catch (err) {
    console.error(err)
  }
}

const Home: NextPage = () => {
  const [featureData, setFeatureData] = useState<{
    [key: string]: unknown
  } | null>(null)

  const featureClickHandler = useCallback((e: MapLayerMouseEvent) => {
    if (e.features) {
      console.log(e.features)
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
    'caltrain',
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

  const caltrainLayerStyle: LayerProps = {
    id: 'caltrain',
    type: 'circle',
    source: 'caltrain',
    paint: {
      'circle-color': '#db3241',
      'circle-radius': 11,
      'circle-opacity': 1,
    },
    layout: {
      // Make the layer visible by default.
      visibility: 'visible',
    },
  }

  const caltrainLabelsLayerStyle: LayerProps = {
    id: 'caltrain-labels',
    type: 'symbol',
    source: 'amtrak',
    layout: {
      'text-field': ['to-string', ['get', 'name']],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
      visibility: 'visible',
    },
    paint: {
      'text-color': '#fff',
    },
  }

  const [amtrakGeoJSON, setAmtrakGeoJSON] = useState<FeatureCollection | undefined>(undefined)
  const [caltrainGeoJSON, setCaltrainGeoJSON] = useState<FeatureCollection | undefined>(undefined)

  const onLoadHandler = useCallback(() => {
    // integrate the useEffect hook from above but instead run it on load
    getAmtrak()
      .then((geoJSON) => {
        setAmtrakGeoJSON(geoJSON)
      })
      .catch((error) => {
        console.error(error)
      })

    getCaltrain()
      .then((geoJSON) => {
        setCaltrainGeoJSON(geoJSON)
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

      getCaltrain()
        .then((geoJSON) => {
          setCaltrainGeoJSON(geoJSON)
        })
        .catch((error) => {
          console.error(error)
        })
    }, 60000)
  }, [])

  // * End Live Amtrak Trains * //

  async function getFeedStale() {
    try {
      const response = await fetch('https://api.amtraker.com/v2/dataFeedState')
      const data = await response.json()
      return data.isStale
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const [warningOpen, setWarningOpen] = useState<boolean>(false)

  // * Check if the data feed is stale * //
  useEffect(() => {
    getFeedStale().then((isStale) => {
      if (isStale) {
        setWarningOpen(true)
      }
    })
  }, [])

  setTimeout(() => {
    setWarningOpen(false)
  }, 10000)

  return (
    <>
      <Sidebar featureData={featureData}></Sidebar>
      <Alert
        className="fixed top-0 left-0 z-20 m-3 sm:top-auto sm:bottom-0 sm:right-0 sm:left-auto"
        direction="left"
        open={warningOpen}
        severity="error"
        onClose={() => setWarningOpen(false)}
      >
        The Amtrak API is currently stale
      </Alert>
      <Map
        initialViewState={mapViewState}
        interactiveLayerIds={mapInteractiveLayerIds}
        mapStyle={stylesSwitcherStyles[0].uri}
        maxBounds={mapMaxBounds}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        onClick={featureClickHandler}
        onLoad={onLoadHandler}
      >
        <StylesControl styles={stylesSwitcherStyles} />
        <LayerControl layerIds={['amtrak', 'amtrak-numbers']} />
        <LocationControl
          location="/europe"
          svg='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m17.36 2.64l-1.41 1.42A6.978 6.978 0 0 1 18 9a7 7 0 0 1-7 7c-1.85 0-3.63-.74-4.94-2.05l-1.42 1.41A8.945 8.945 0 0 0 10 17.93V20H6v2h10v-2h-4v-2.06c4.55-.51 8-4.36 8-8.94c0-2.38-.95-4.67-2.64-6.36M11 3.5A5.5 5.5 0 0 0 5.5 9a5.5 5.5 0 0 0 5.5 5.5A5.5 5.5 0 0 0 16.5 9A5.5 5.5 0 0 0 11 3.5m0 2c1.94 0 3.5 1.57 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 7.5 9A3.5 3.5 0 0 1 11 5.5Z"/></svg>'
        />
        <LocationControl
          location="/amtrak"
          svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M264.437 173.779C233.5 172.323 71.9 168.216 0 199.364c19.446 11.487 40.304 23.404 64.792 36.321 71.256-33.337 163.7-45.394 248.716-50.033v-2.16c-16.531-2.019-34.781-5.55-49.071-9.712h0zm72.648 13.067c-63.789 6.367-176.712 24.86-241.056 64.925 23.396 11.771 47.86 23.425 72.302 34.315 67.746-57.756 157.356-83.371 248.673-101.323v-2.117c-23.202 2.729-58.256 4.398-79.919 4.2h0zM201.977 300.554c30.862 12.76 62.789 24.496 89.985 32.34 32.769-65.137 92.008-116.773 201.187-164.091v-2.135c-140.237 38.346-227.993 65.821-291.172 133.887h0z"/> </svg>'
        />

        <Source data={amtrakGeoJSON} id="amtrak" type="geojson">
          <Layer {...amtrakLayerStyle} />
          <Layer {...amtrakNumbersLayerStyle} />
        </Source>

        <Source data={caltrainGeoJSON} id="caltrain" type="geojson">
          <Layer {...caltrainLayerStyle} />
          <Layer {...caltrainLabelsLayerStyle} />
        </Source>

        <Source
          id="mapbox-dem"
          maxzoom={14}
          tileSize={512}
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
        />
      </Map>
    </>
  )
}

export default Home
