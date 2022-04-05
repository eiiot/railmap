import { useControl, ControlPosition, MapboxMap } from 'react-map-gl'
import { useRouter } from 'next/router'

interface LocationControlProps {
  position?: ControlPosition
  svg: string
  location: string
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
      mapboxCtrlButtonIcon.innerHTML = props.svg
      mapboxCtrlButton.appendChild(mapboxCtrlButtonIcon)
      mapboxCtrlGroup.appendChild(mapboxCtrlButton)
      this._container.appendChild(mapboxCtrlGroup)

      mapboxCtrlButton.addEventListener('click', () => {
        router.push(props.location)
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
