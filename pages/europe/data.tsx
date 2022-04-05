import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { LngLatBoundsLike } from 'react-map-gl'

const Map = dynamic(() => import('react-map-gl'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
})

const Home: NextPage = () => {
  const mapViewState = {
    longitude: 8,
    latitude: 49,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-28.9, 23.2],
    [125.5, 75.5],
  ] as LngLatBoundsLike

  return (
    <div className="h-screen w-screen">
      <Map
        initialViewState={mapViewState}
        mapStyle="mapbox://styles/dotly/ckpxomzkq08gp19o8o99y0yut"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        maxBounds={mapMaxBounds}
        style={{ position: 'absolute', width: '100vw', height: '100vh' }}
      />
    </div>
  )
}

export default Home
