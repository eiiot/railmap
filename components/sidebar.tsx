import { useEffect, useState } from 'react'
import AmtrakSidebarContent from './sidebar/AmtrakSidebarContent'
import CrossingSidebarContent from './sidebar/CrossingSidebarContent'
import CNCrossingSidebarContent from './sidebar/CNCrossingSidebarContent'
import BridgeSidebarContent from './sidebar/BridgeSidebarContent'
import OSMSidebarContent from './sidebar/OSMSidebarContent'
import AmtrakStationSidebarContent from './sidebar/AmtrakStationSidebarContent'
import { MapRef } from 'react-map-gl'
import { trainData } from 'amtrak'
import { CNCrossingData, CaltrainApiResponse, USBridgeData, USCrossingData } from './MapDataTypes'
import CaltrainSidebarContent from './sidebar/CaltrainSidebarContent'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SidebarProps {
  featureData: { [key: string]: unknown } | null
  onTrainClick?: (train: trainData, railmap: MapRef) => void
}

export default function Sidebar(props: SidebarProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  // on change of featureData show sidebar
  useEffect(() => {
    if (props.featureData) {
      setShowSidebar(true)
    }
  }, [props.featureData])

  function onClickHandler() {
    setShowSidebar(!showSidebar)
  }

  return (
    <div
      className={classNames(
        'fixed bottom-[32px] z-10 flex h-[calc(70vh-32px)] w-full flex-col transition-transform duration-300 md:top-0 md:m-[10px] md:h-5/6 md:w-[300px] md:translate-y-0 md:flex-row',
        showSidebar
          ? 'translate-y-0 md:translate-y-0 md:translate-x-0'
          : 'translate-y-[calc(100%)] md:translate-y-0 md:translate-x-[calc(-100%-10px)]',
      )}
    >
      <div
        className={classNames(
          'my-2 mx-32 rounded-md bg-white md:hidden',
          showSidebar ? 'cursor-s-resize' : 'cursor-n-resize',
        )}
        onClick={onClickHandler}
      >
        <div className="py-2"></div>
      </div>
      {props.featureData ? (
        props.featureData.mapboxLayerId === 'amtrak' ? (
          <AmtrakSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            trainData={props.featureData as unknown as trainData}
          />
        ) : props.featureData.mapboxLayerId === 'caltrain' ? (
          <CaltrainSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            trainData={props.featureData as unknown as CaltrainApiResponse}
          />
        ) : props.featureData.mapboxLayerId === 'Railroad-Crossings' ? (
          <CrossingSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            crossingData={props.featureData as unknown as USCrossingData}
          />
        ) : props.featureData.mapboxLayerId === 'Railroad-Bridges' ? (
          <BridgeSidebarContent
            bridgeData={props.featureData as unknown as USBridgeData}
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
          />
        ) : props.featureData.mapboxLayerId === 'CN-Railroad-Crossings' ? (
          <CNCrossingSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            crossingData={props.featureData as unknown as CNCrossingData}
          />
        ) : props.featureData.mapboxLayerId === 'CN-Railroad-Bridges' ||
          props.featureData.mapboxLayerId === 'EU-Railroad-Bridges' ? (
          <OSMSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            osmData={props.featureData}
            ringColor="ring-blue-400"
          />
        ) : props.featureData.mapboxLayerId === 'EU-Railroad-Crossings' ? (
          <OSMSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            osmData={props.featureData}
            ringColor="ring-red-400"
          />
        ) : props.featureData.mapboxLayerId === 'amtrak-stations' && props.onTrainClick ? (
          <AmtrakStationSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md"
            stationData={props.featureData}
            onTrainClick={props.onTrainClick}
          />
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
          showSidebar ? 'cursor-w-resize' : 'cursor-e-resize',
        )}
        onClick={onClickHandler}
      >
        <div className="px-2"></div>
      </div>
    </div>
  )
}
