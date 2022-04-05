import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Layer, LayerProps, LngLatBoundsLike, Source } from 'react-map-gl'
import { Feature, FeatureCollection } from 'geojson'

const Map = dynamic(() => import('react-map-gl'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
})

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

async function getCameras() {
  // Make a GET request to the API and return the location of the cameras.
  try {
    const response = await fetch('https://console.vrf.tv/api/statusmap/get', {
      method: 'GET',
    })

    const cameras: [
      {
        lat: number
        lng: number
        name: string
        type: string
      }
    ] = await response.json()

    console.log(cameras)

    // create a geoJSON object
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    } as FeatureCollection

    // iterate through the camera numbers
    cameras.forEach((camera) => {
      // replace "_"  with " " in name, capitalize the first letter of each word
      const name = camera.name
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
        .replace('Ptz', 'PTZ')
      const cameraObject = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [camera.lng, camera.lat],
        },
        properties: {
          name,
          type: camera.type,
        },
      } as Feature
      // push camera to geoJSON
      geoJSON.features.push(cameraObject)
    })

    return geoJSON
  } catch (error) {
    console.error(error)
  }
}

const Home: NextPage = () => {
  const [amtrakGeoJSON, setAmtrakGeoJSON] = useState<
    FeatureCollection | undefined
  >(undefined)

  const [camerasGeoJSON, setCamerasGeoJSON] = useState<
    FeatureCollection | undefined
  >(undefined)

  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

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

  const camerasLayerStyle = {
    id: 'cameras',
    type: 'circle',
    source: 'cameras',
    paint: {
      // 'circle-color': 'hsl(35, 97%, 50%)',
      // conditional circle color, based on camera status
      // if type = st_online, color = green
      // if type = st_offline, color = red
      'circle-color': [
        'case',
        ['==', ['get', 'type'], 'st_online'],
        '#00ff00',
        '#ff0000',
      ],
      'circle-radius': 7,
      'circle-opacity': [
        'interpolate',
        ['exponential', 0.66],
        ['zoom'],
        2,
        0,
        22,
        1,
      ],
    },
    layout: {
      // Make the layer visible by default.
      visibility: 'visible',
    },
  } as LayerProps

  const cameraLabelsLayerStyle = {
    id: 'camera-labels',
    type: 'symbol',
    source: 'cameras',
    layout: {
      'text-field': ['to-string', ['get', 'name']],
      'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
      'text-size': 12,
      'text-anchor': 'bottom',
      'text-offset': [0, -0.5],
      visibility: 'visible',
    },
    paint: {
      'text-color': 'hsl(0, 0%, 100%)',
      'text-halo-color': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        'hsla(0, 0%, 0%, 0.77)',
        10,
        'hsla(0, 0%, 0%, 0)',
      ],
      'text-halo-width': 1,
      'text-halo-blur': 2,
      'text-opacity': [
        'interpolate',
        ['exponential', 0.66],
        ['zoom'],
        6,
        0,
        22,
        1,
      ],
    },
  } as LayerProps

  const onLoadHandler = useCallback(() => {
    // integrate the useEffect hook from above but instead run it on load
    getAmtrak()
      .then((geoJSON) => {
        setAmtrakGeoJSON(geoJSON!)
        console.log(geoJSON)
      })
      .catch((error) => {
        console.error(error)
      })

    getCameras()
      .then((geoJSON) => {
        setCamerasGeoJSON(geoJSON!)
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

      getCameras()
        .then((geoJSON) => {
          setCamerasGeoJSON(geoJSON!)
        })
        .catch((error) => {
          console.error(error)
        })
    }, 60000)
  }, [])

  return (
    <div className="h-screen w-screen">
      <Map
        initialViewState={mapViewState}
        maxBounds={mapMaxBounds}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/dotly/ckqo4p5i80jyj19oie9icbu52"
        style={{ position: 'absolute', width: '100vw', height: '100vh' }}
        onLoad={onLoadHandler}
      >
        <Source id="amtrak" type="geojson" data={amtrakGeoJSON!}>
          <Layer {...amtrakLayerStyle} />
          <Layer {...amtrakNumbersLayerStyle} />
        </Source>

        <Source id="cameras" type="geojson" data={camerasGeoJSON}>
          <Layer {...camerasLayerStyle} />
          <Layer {...cameraLabelsLayerStyle} />
        </Source>
      </Map>
    </div>
  )
}

export default Home
