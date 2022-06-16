import {
  CNCrossingData,
  FiveOneOneVehicleActivity,
  USBridgeData,
  USCrossingData,
} from './MapDataTypes'
import AmtrakSidebarContent from './sidebar/AmtrakSidebarContent'
import AmtrakStationSidebarContent from './sidebar/AmtrakStationSidebarContent'
import BridgeSidebarContent from './sidebar/BridgeSidebarContent'
import CaltrainSidebarContent from './sidebar/CaltrainSidebarContent'
import CNCrossingSidebarContent from './sidebar/CNCrossingSidebarContent'
import CrossingSidebarContent from './sidebar/CrossingSidebarContent'
import OSMSidebarContent from './sidebar/OSMSidebarContent'
import { classNames } from '../helpers/tailwind/classNames'
import { trainData } from 'amtrak'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'

interface SidebarProps {
  mapboxFeatureData: { [key: string]: unknown } | null
  onTrainClick?: (train: trainData, railmap: MapRef) => void
}

const usePrevious = (value: any) => {
  const previousValueRef = useRef()

  useEffect(() => {
    previousValueRef.current = value
  }, [value])

  return previousValueRef.current
}

const useMediaQuery = (query: any) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    addEventListener('resize', listener)
    // media.addListener(listener)
    return () => removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

const Sidebar = (props: SidebarProps) => {
  const { mapboxFeatureData, onTrainClick } = props

  const isMedium = useMediaQuery('(min-width: 768px)')

  const fixEntry = (v: unknown): unknown => {
    if (typeof v === 'string') {
      try {
        return JSON.parse(v)
      } catch (e) {
        return v
      }
    } else {
      return v
    }
  }

  const featureData = mapboxFeatureData
    ? Object.fromEntries(Object.entries(mapboxFeatureData).map(([k, v]) => [k, fixEntry(v)]))
    : null

  // sidebar swiping

  const [isOpen, setIsOpen] = useState(false)

  const prevIsOpen = usePrevious(isOpen)

  function onClose() {
    setIsOpen(false)
  }

  function onOpen() {
    setIsOpen(true)
  }

  const controls = useAnimation()

  // on change of featureData show sidebar
  useEffect(() => {
    if (mapboxFeatureData) {
      setIsOpen(true)
    }
  }, [mapboxFeatureData])

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden')
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible')
    }
  }, [controls, isOpen, prevIsOpen])

  function onClickHandler() {
    setIsOpen((isOpen) => (isOpen ? false : true))
  }

  function onDragEnd(_: any, info: any) {
    console.log(info.point.y)
    if (isMedium) {
      if (isOpen) {
        const shouldClose = info.velocity.x < -40
        if (shouldClose) {
          controls.start('hidden')
          onClose()
        } else {
          controls.start('visible')
          onOpen()
        }
      }
    } else {
      if (isOpen) {
        const shouldClose = info.velocity.y > 0
        if (shouldClose) {
          controls.start('hidden')
          onClose()
        } else {
          controls.start('visible')
          onOpen()
        }
      } else {
        const shouldOpen = info.velocity.y < 0
        if (shouldOpen) {
          controls.start('visible')
          onOpen()
        } else {
          controls.start('hidden')
          onClose()
        }
      }
    }
  }

  useEffect(() => {
    controls.start('hidden')
  }, [isMedium, controls]) // hide on window resize

  return (
    <motion.div
      animate={controls}
      className={classNames(
        'fixed bottom-[32px] z-10 flex h-[calc(70vh-32px)] w-full translate-x-0 cursor-grab flex-col active:cursor-grabbing md:top-0 md:bottom-auto md:m-[10px] md:h-5/6 md:w-[300px] md:translate-x-[calc(-100%-10px)] md:translate-y-0 md:flex-row',
      )}
      drag={isMedium ? 'x' : 'y'}
      dragConstraints={{ top: 0, right: 0 }}
      dragElastic={{
        top: 0,
        right: 0,
        bottom: 0.2,
        left: 0.2,
      }}
      initial="hidden"
      onDragEnd={onDragEnd}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400,
      }}
      variants={
        isMedium
          ? {
              visible: { x: 0, y: 0 },
              hidden: { x: 'calc(-100% - 10px)', y: 0 },
            }
          : {
              visible: { y: 0, x: 0 },
              hidden: { y: '100%', x: 0 },
            }
      }
    >
      <div
        className={classNames(
          'relative mx-[20%] mb-2 cursor-grab rounded-md bg-white active:cursor-grabbing md:hidden',
        )}
      >
        <div className="z-30 py-3" />
      </div>
      {featureData ? (
        featureData.mapboxLayerId === 'amtrak' ? (
          <AmtrakSidebarContent trainData={featureData as unknown as trainData} />
        ) : featureData.mapboxLayerId === 'amtrak-stations' && onTrainClick ? (
          <AmtrakStationSidebarContent onTrainClick={onTrainClick} stationData={featureData} />
        ) : featureData.mapboxLayerId === 'caltrain' ? (
          <CaltrainSidebarContent trainData={featureData as unknown as FiveOneOneVehicleActivity} />
        ) : featureData.mapboxLayerId === 'Railroad-Crossings' ? (
          <CrossingSidebarContent crossingData={featureData as unknown as USCrossingData} />
        ) : featureData.mapboxLayerId === 'Railroad-Bridges' ? (
          <BridgeSidebarContent bridgeData={featureData as unknown as USBridgeData} />
        ) : featureData.mapboxLayerId === 'CN-Railroad-Crossings' ? (
          <CNCrossingSidebarContent crossingData={featureData as unknown as CNCrossingData} />
        ) : featureData.mapboxLayerId === 'CN-Railroad-Bridges' ||
          featureData.mapboxLayerId === 'EU-Railroad-Bridges' ? (
          <OSMSidebarContent osmData={featureData} ringColor="ring-blue-400" />
        ) : featureData.mapboxLayerId === 'EU-Railroad-Crossings' ? (
          <OSMSidebarContent osmData={featureData} ringColor="ring-red-400" />
        ) : (
          <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-t-md bg-white text-center md:rounded-md">
            <span>No additional information is available for this object</span>
          </div>
        )
      ) : (
        <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-t-md bg-white md:rounded-md">
          <span>No Content Selected</span>
        </div>
      )}
      <div
        className={classNames(
          'my-[35vh] mx-2 hidden rounded-md bg-white shadow-lg md:block',
          isOpen ? 'cursor-w-resize' : 'cursor-e-resize',
        )}
        onClick={onClickHandler}
      >
        <div className="z-30 px-2" />
      </div>
    </motion.div>
  )
}

Sidebar.defaultProps = {
  onTrainClick: () => {},
}

export default Sidebar
