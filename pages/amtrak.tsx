import { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../components/sidebar'
import Loader from '../components/loader'
import { Layer, LayerProps, LngLatBoundsLike, MapLayerMouseEvent, Source } from 'react-map-gl'
import { trainData } from '../components/amtrakTypes'
import { Feature, FeatureCollection } from 'geojson'
import LocationControl from '../components/map/LocationControl'

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

  const trainButtonClickHandler = useCallback((train: trainData, mainMapboxMap) => {
    const { lon, lat } = train
    console.log(lon, lat)
    console.log(train)
    console.log(mainMapboxMap)
    mainMapboxMap.flyTo({ center: [lon, lat], zoom: 13, duration: 2000 })
    const featureDataObject = {
      ...train,
      mapboxLayerId: 'amtrak',
    }
    setFeatureData(featureDataObject)
  }, [])

  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

  const mapInteractiveLayerIds = ['amtrak', 'amtrak-stations']

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
      <Sidebar featureData={featureData} onTrainClick={trainButtonClickHandler}></Sidebar>
      <div className="h-screen w-screen">
        <Map
          initialViewState={mapViewState}
          interactiveLayerIds={mapInteractiveLayerIds}
          mapStyle="mapbox://styles/dotly/ckqim4kef1ubg18pjg02v9zxp"
          maxBounds={mapMaxBounds}
          terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
          onClick={featureClickHandler}
          onLoad={onLoadHandler}
        >
          <LocationControl
            location="/"
            svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M264.437 173.779C233.5 172.323 71.9 168.216 0 199.364c19.446 11.487 40.304 23.404 64.792 36.321 71.256-33.337 163.7-45.394 248.716-50.033v-2.16c-16.531-2.019-34.781-5.55-49.071-9.712h0zm72.648 13.067c-63.789 6.367-176.712 24.86-241.056 64.925 23.396 11.771 47.86 23.425 72.302 34.315 67.746-57.756 157.356-83.371 248.673-101.323v-2.117c-23.202 2.729-58.256 4.398-79.919 4.2h0zM201.977 300.554c30.862 12.76 62.789 24.496 89.985 32.34 32.769-65.137 92.008-116.773 201.187-164.091v-2.135c-140.237 38.346-227.993 65.821-291.172 133.887h0z"/> </svg>'
          />

          <Source data={amtrakGeoJSON} id="amtrak" type="geojson">
            <Layer {...amtrakLayerStyle} />
            <Layer {...amtrakNumbersLayerStyle} />
          </Source>
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
