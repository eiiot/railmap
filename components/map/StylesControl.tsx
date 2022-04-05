import { useControl, ControlPosition, MapboxStyle } from 'react-map-gl'
import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherControl,
  MapboxStyleSwitcherOptions,
} from 'mapbox-gl-style-switcher'

interface StylesControlProps {
  styles: MapboxStyleDefinition[]
  position?: ControlPosition
}

/* eslint-disable complexity,max-statements */
export default function MapboxStyleControl(props: StylesControlProps) {
  const styleControl = useControl(
    () => {
      const ctrl = new MapboxStyleSwitcherControl(props.styles)
      return ctrl
    },
    {
      position: props.position,
    }
  )

  return null
}
