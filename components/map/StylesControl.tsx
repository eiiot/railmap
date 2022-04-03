import { useControl, ControlPosition } from 'react-map-gl'
import { StylesControl } from 'mapbox-gl-controls'
import { StyleOption } from 'mapbox-gl-controls/lib/StylesControl/types'

interface StylesControlProps {
  /** Array of style options */
  styles?: StyleOption[]

  /** Triggered on style change */
  position?: ControlPosition

  onLoading?: (e: object) => void
  onChange?: (e: object) => void
  onError?: (e: object) => void
}

/* eslint-disable complexity,max-statements */
export default function MapboxStyleControl(props: StylesControlProps) {
  const styleControl = useControl(
    () => {
      const ctrl = new StylesControl({
        ...props,
      })
      return ctrl
    },
    {
      position: props.position,
    }
  )

  return null
}
