import {
  CNCrossingData,
  FiveOneOneVehicleActivity,
  USBridgeData,
  USCrossingData,
} from './MapDataTypes'
import ACTSidebarContent from './sidebar/ACTSidebarContent'
import AmtrakSidebarContent from './sidebar/AmtrakSidebarContent'
import AmtrakStationSidebarContent from './sidebar/AmtrakStationSidebarContent'
import BridgeSidebarContent from './sidebar/BridgeSidebarContent'
import CaltrainSidebarContent from './sidebar/CaltrainSidebarContent'
import CNCrossingSidebarContent from './sidebar/CNCrossingSidebarContent'
import CrossingSidebarContent from './sidebar/CrossingSidebarContent'
import OSMSidebarContent from './sidebar/OSMSidebarContent'
import { trainData } from 'amtrak'
import { useEffect, useState } from 'react'
import { MapRef } from 'react-map-gl'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
interface SidebarProps {
  featureData: { [key: string]: unknown } | null
  onTrainClick?: (train: trainData, railmap: MapRef) => void
}

const Sidebar = (props: SidebarProps) => {
  const { featureData, onTrainClick } = props

  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  // on change of featureData show sidebar
  useEffect(() => {
    if (featureData) {
      setShowSidebar(true)
    }
  }, [featureData])

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
        <div className="py-2" />
      </div>
      {featureData ? (
        featureData.mapboxLayerId === 'amtrak' ? (
          <AmtrakSidebarContent trainData={featureData as unknown as trainData} />
        ) : featureData.mapboxLayerId === 'caltrain' ? (
          <CaltrainSidebarContent trainData={featureData as unknown as FiveOneOneVehicleActivity} />
        ) : featureData.mapboxLayerId === 'act' ? (
          <ACTSidebarContent busData={featureData as unknown as FiveOneOneVehicleActivity} />
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
        ) : featureData.mapboxLayerId === 'amtrak-stations' && onTrainClick ? (
          <AmtrakStationSidebarContent onTrainClick={onTrainClick} stationData={featureData} />
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
        <div className="px-2" />
      </div>
    </div>
  )
}

Sidebar.defaultProps = {
  onTrainClick: () => {},
}

export default Sidebar
