import { CSSProperties, ReactNode, useCallback, useState } from 'react'
import Map, { FullscreenControl, GeolocateControl, NavigationControl } from 'react-map-gl'
import GeocoderControl from './map/GeocoderControl'

// This is a terrible solution to this problem, but I just can't figure out how to get the type definitions for the Map component

interface MapTypes {
  mapboxAccessToken?: string
  initialViewState?: Partial<import('react-map-gl/dist/esm/index').ViewState> & {
    bounds?: import('mapbox-gl').LngLatBoundsLike
    fitBoundsOptions?: import('mapbox-gl').FitBoundsOptions
  }
  gl?: WebGLRenderingContext
  antialias?: boolean
  attributionControl?: boolean
  bearingSnap?: number
  clickTolerance?: number
  collectResourceTiming?: boolean
  cooperativeGestures?: boolean
  crossSourceCollisions?: boolean
  customAttribution?: string | string[]
  fadeDuration?: number
  failIfMajorPerformanceCaveat?: boolean
  hash?: string | boolean
  interactive?: boolean
  locale?: {
    [key: string]: string
  }
  localFontFamily?: string
  localIdeographFontFamily?: string
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  maxTileCacheSize?: number
  optimizeForTerrain?: boolean
  pitchWithRotate?: boolean
  preserveDrawingBuffer?: boolean
  refreshExpiredTiles?: boolean
  testMode?: boolean
  trackResize?: boolean
  transformRequest?: import('mapbox-gl').TransformRequestFunction
  boxZoom?: boolean
  doubleClickZoom?: boolean
  dragPan?: boolean | import('mapbox-gl').DragPanOptions
  dragRotate?: boolean
  keyboard?: boolean
  scrollZoom?: boolean | import('mapbox-gl').InteractiveOptions
  touchPitch?: boolean
  touchZoomRotate?: boolean | import('mapbox-gl').InteractiveOptions
  maxBounds?: import('mapbox-gl').LngLatBoundsLike
  maxPitch?: number
  maxZoom?: number
  minPitch?: number
  minZoom?: number
  viewState?: import('react-map-gl/dist/esm/index').ViewState & {
    width: number
    height: number
  }
  mapStyle?:
    | string
    | import('mapbox-gl').Style
    | import('react-map-gl/dist/esm/index').ImmutableLike
  styleDiffing?: boolean
  fog?: import('mapbox-gl').Fog
  light?: import('mapbox-gl').Light
  terrain?: import('mapbox-gl').TerrainSpecification
  interactiveLayerIds?: string[]
  projection?: string | import('react-map-gl/dist/esm/index').ProjectionSpecification
  renderWorldCopies?: boolean
  cursor?: string
  onMouseDown?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onMouseUp?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onMouseOver?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onMouseMove?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onClick?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onDblClick?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onMouseEnter?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onMouseLeave?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onMouseOut?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onContextMenu?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  onTouchStart?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  onTouchEnd?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  onTouchMove?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  onTouchCancel?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  onMoveStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onMove?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onMoveEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onDragStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onDrag?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onDragEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onZoomStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onZoom?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onZoomEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onRotateStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onRotate?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onRotateEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onPitchStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onPitch?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onPitchEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  onWheel?: (e: import('mapbox-gl').MapWheelEvent) => void
  onBoxZoomStart?: (e: import('mapbox-gl').MapBoxZoomEvent) => void
  onBoxZoomEnd?: (e: import('mapbox-gl').MapBoxZoomEvent) => void
  onBoxZoomCancel?: (e: import('mapbox-gl').MapBoxZoomEvent) => void
  onResize?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  onLoad?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  onRender?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  onIdle?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  onError?: (e: import('mapbox-gl').ErrorEvent) => void
  onRemove?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  onData?: (
    e: import('mapbox-gl').MapSourceDataEvent | import('mapbox-gl').MapStyleDataEvent,
  ) => void
  onStyleData?: (e: import('mapbox-gl').MapStyleDataEvent) => void
  onSourceData?: (e: import('mapbox-gl').MapSourceDataEvent) => void
}

interface OtherMapTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapLib?: any
  reuseMaps?: boolean
  /** Map container id */
  id?: string
  /** Map container CSS style */
  style?: CSSProperties
  children?: ReactNode
}

interface CustomMapProps extends MapTypes, OtherMapTypes {
  cursor?: never
  id?: never
  mapboxAccessToken?: never
  style?: never
  onMouseEnter?: never
  onMouseLeave?: never
}

// End bad code (maybe)

const MapboxGlMap = (props: CustomMapProps) => {
  const [cursorSate, setCursorState] = useState('unset')

  const onMouseEnter = useCallback(() => {
    setCursorState('pointer')
  }, [])
  const onMouseLeave = useCallback(() => {
    setCursorState('unset')
  }, [])

  return (
    <Map
      cursor={cursorSate}
      id="railmap"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <GeocoderControl
        collapsed
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string}
      />
      <GeolocateControl />
      <NavigationControl />
      <FullscreenControl containerId="body" />

      {props.children}
    </Map>
  )
}

export default MapboxGlMap
