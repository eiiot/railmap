import { useControl, ControlPosition, MapboxMap } from 'react-map-gl'
import { useRouter } from 'next/router'

interface LocationControlProps {
  position?: ControlPosition
  // locationIds: Array<string>
}
// set onClick using props.onClick

/* eslint-disable complexity,max-statements */
export default function MapboxLocationControl(props: LocationControlProps) {
  const router = useRouter()

  class LocationControl {
    locationIds: any
    _map: any
    _container: HTMLDivElement | undefined
    className: string | undefined
    // constructor(options?: LocationControlProps) {
    //   this.locationIds = options?.locationIds
    // }

    onAdd(map: MapboxMap) {
      this._map = map
      this._container = document.createElement('div')
      this._container.className = 'mapboxgl-ctrl mapbox-Location-control'
      const mapboxCtrlGroup = document.createElement('div')
      mapboxCtrlGroup.className = 'mapboxgl-ctrl-group'
      const mapboxCtrlButton = document.createElement('button')
      const mapboxCtrlButtonIcon = document.createElement('span')
      mapboxCtrlButtonIcon.innerHTML =
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m17.36 2.64l-1.41 1.42A6.978 6.978 0 0 1 18 9a7 7 0 0 1-7 7c-1.85 0-3.63-.74-4.94-2.05l-1.42 1.41A8.945 8.945 0 0 0 10 17.93V20H6v2h10v-2h-4v-2.06c4.55-.51 8-4.36 8-8.94c0-2.38-.95-4.67-2.64-6.36M11 3.5A5.5 5.5 0 0 0 5.5 9a5.5 5.5 0 0 0 5.5 5.5A5.5 5.5 0 0 0 16.5 9A5.5 5.5 0 0 0 11 3.5m0 2c1.94 0 3.5 1.57 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 7.5 9A3.5 3.5 0 0 1 11 5.5Z"/></svg>'
      mapboxCtrlButton.appendChild(mapboxCtrlButtonIcon)
      mapboxCtrlGroup.appendChild(mapboxCtrlButton)
      this._container.appendChild(mapboxCtrlGroup)

      mapboxCtrlButton.addEventListener('click', () => {
        console.log('click')
        router.push('/europe')
      })

      return this._container
    }

    onRemove() {
      this._container!.parentNode!.removeChild(this._container!)
      this._map = undefined
    }
  }

  const locationControl = useControl(
    () => {
      const ctrl = new LocationControl()
      return ctrl
    },
    {
      position: props.position,
    }
  )

  return null
}
