import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { LngLatBoundsLike } from 'react-map-gl'

const Map = dynamic(() => import('react-map-gl'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
})

const Home: NextPage = () => {
  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

  return (
    <div className="h-screen w-screen">
      <Map
        initialViewState={mapViewState}
        mapStyle="mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        maxBounds={mapMaxBounds}
        style={{ position: 'absolute', width: '100vw', height: '100vh' }}
      />
    </div>
  )
}

export default Home
