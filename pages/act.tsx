import Loader from '../components/loader'
import LayerControl from '../components/map/LayerControl'
import LocationControl from '../components/map/LocationControl'
import StylesControl from '../components/map/StylesControl'
import { FiveOneOneVehicleActivity } from '../components/MapDataTypes'
import Sidebar from '../components/sidebar'
import Alert from '../components/trainsitionAlert'
import { fetchAllTrains } from 'amtrak'
import { Feature, FeatureCollection } from 'geojson'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { Layer, LayerProps, LngLatBoundsLike, MapLayerMouseEvent, Source } from 'react-map-gl'
import type { NextPage } from 'next'

const Map = dynamic(() => import('../components/mapbox'), {
  loading: () => <Loader />,
  ssr: false,
})

async function getACTransit() {
  // Make a GET request to the API and return the location of the trains.
  try {
    const response = await fetch(`https://api.therailmap.com/v1/act`, { method: 'GET' })
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
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

    trains.forEach((bus: FiveOneOneVehicleActivity) => {
      const trainObject: Feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            +bus.MonitoredVehicleJourney.VehicleLocation.Longitude,
            +bus.MonitoredVehicleJourney.VehicleLocation.Latitude,
          ],
        },
        properties: {
          name: bus.MonitoredVehicleJourney.LineRef,
          ...bus,
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
    longitude: -122.2,
    latitude: 37.7,
    zoom: 9,
  }

  const mapMaxBounds = [
    [-124.258118, 36.974033],
    [-120.30304, 38.6276],
  ] as LngLatBoundsLike

  const mapInteractiveLayerIds = ['act']

  //  * Live Amtrak Trains * //

  const actLayerStyle: LayerProps = {
    id: 'act',
    type: 'circle',
    source: 'act',
    paint: {
      'circle-color': '#087358',
      'circle-radius': 11,
      'circle-opacity': 1,
    },
    layout: {
      // Make the layer visible by default.
      visibility: 'visible',
    },
  }

  const actLabelsLayerStyle: LayerProps = {
    id: 'act-labels',
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

  const [ACTGeoJSON, setACTGeoJSON] = useState<FeatureCollection | undefined>(undefined)

  const [loadingInfo, setLoadingInfo] = useState<boolean>(true)

  const onLoadHandler = useCallback(() => {
    // integrate the useEffect hook from above but instead run it on load

    getACTransit()
      .then((geoJSON) => {
        setLoadingInfo(false)
        setACTGeoJSON(geoJSON)
      })
      .catch((error) => {
        console.error(error)
      })

    setInterval(async () => {
      getACTransit()
        .then((geoJSON) => {
          setACTGeoJSON(geoJSON)
        })
        .catch((error) => {
          console.error(error)
        })
    }, 60000)
  }, [])

  return (
    <>
      <Sidebar featureData={featureData} />

      <Alert
        className="fixed top-0 left-0 z-20 m-3 sm:top-auto sm:bottom-0 sm:right-0 sm:left-auto"
        direction="left"
        onClose={() => setLoadingInfo(false)}
        open={loadingInfo}
        severity="info"
      >
        Loading Busses
      </Alert>

      <Map
        initialViewState={mapViewState}
        interactiveLayerIds={mapInteractiveLayerIds}
        mapStyle="mapbox://styles/dotly/cl1ttcaj3002i15nxjbqjqj00"
        maxBounds={mapMaxBounds}
        onClick={featureClickHandler}
        onLoad={onLoadHandler}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      >
        {/* <StylesControl styles={stylesSwitcherStyles} /> */}

        <Source data={ACTGeoJSON} id="act" type="geojson">
          <Layer {...actLayerStyle} />
          <Layer {...actLabelsLayerStyle} />
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
