import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Sidebar from '../components/sidebar'
import Loader from '../components/loader'
import { Layer, LayerProps, LngLatBoundsLike, Source } from 'react-map-gl'
import { trainData } from '../components/amtrakTypes'
import { Feature, FeatureCollection } from 'geojson'

const Map = dynamic(() => import('../components/mapbox'), {
  loading: () => <Loader />,
  ssr: false,
})

const Home: NextPage = () => {
  const [featureData, setFeatureData] = useState<{ [key: string]: any } | null>(
    null
  )

  const featureClickHandler = useCallback((e: any) => {
    if (e.features[0]) {
      const clickedFeature = e.features[0].properties
      const featureDataObject = {
        ...clickedFeature,
        mapboxLayerId: e.features[0].layer.id,
      }
      setFeatureData(featureDataObject)
    }
  }, [])

  const onTrainClick = useCallback((train: trainData, mainMapboxMap) => {
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

  const [amtrakGeoJSON, setAmtrakGeoJSON] = useState<
    FeatureCollection | undefined
  >(undefined)

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
  }, [])

  // * End Live Amtrak Trains * //

  return (
    <>
      <Sidebar featureData={featureData} onTrainClick={onTrainClick}></Sidebar>
      <div className="h-screen w-screen">
        <Map
          onClickHandler={featureClickHandler}
          mapStyle="mapbox://styles/dotly/ckqim4kef1ubg18pjg02v9zxp"
          initialViewState={mapViewState}
          maxBounds={mapMaxBounds}
          onLoad={onLoadHandler}
          amtrakLocationControlLocation="/"
          interactiveLayerIds={mapInteractiveLayerIds}
          terrain
        >
          <Source id="amtrak" type="geojson" data={amtrakGeoJSON!}>
            <Layer {...amtrakLayerStyle} />
            <Layer {...amtrakNumbersLayerStyle} />
          </Source>
        </Map>
      </div>
    </>
  )
}

export default Home
