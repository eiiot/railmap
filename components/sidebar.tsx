import { useState, useEffect } from 'react'
import TrainSidebarContent from './sidebar/AmtrakSidebarContent'
import CrossingSidebarContent from './sidebar/CrossingSidebarContent'
import CNCrossingSidebarContent from './sidebar/CNCrossingSidebarContent'
import BridgeSidebarContent from './sidebar/BridgeSidebarContent'
import OSMSidebarContent from './sidebar/OSMSidebarContent'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar(props: any) {
  const [showSidebar, setShowSidebar] = useState(false)

  // on change of featureData show sidebar
  useEffect(() => {
    if (props.featureData) {
      setShowSidebar(true)
    }
  }, [props.featureData])

  function onClickHandler(e: any) {
    console.log('click', e)
    setShowSidebar(!showSidebar)
  }

  return (
    <div
      className={classNames(
        'absolute top-0 z-10 flex h-[calc(100vh-32px)] w-full flex-col transition-transform duration-300 md:top-0 md:m-[10px] md:h-5/6 md:w-[275px] md:translate-y-0 md:flex-row',
        showSidebar
          ? 'translate-y-0 md:translate-y-0 md:translate-x-0'
          : 'translate-y-[calc(100%)] md:translate-y-0 md:translate-x-[calc(-100%-10px)]'
      )}
    >
      <div
        className={classNames(
          'my-2 mx-32 rounded-md bg-white md:hidden',
          showSidebar ? 'cursor-s-resize' : 'cursor-n-resize'
        )}
        onClick={onClickHandler}
      >
        <div className="py-2"></div>
      </div>
      {props.featureData ? (
        props.featureData.mapboxLayerId === 'amtrak' ? (
          <TrainSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-md bg-white"
            trainData={props.featureData}
          />
        ) : props.featureData.mapboxLayerId === 'Railroad-Crossings' ? (
          <CrossingSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-md bg-white"
            crossingData={props.featureData}
          />
        ) : props.featureData.mapboxLayerId === 'Railroad-Bridges' ? (
          <BridgeSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-md bg-white"
            bridgeData={props.featureData}
          />
        ) : props.featureData.mapboxLayerId === 'CN-Railroad-Crossings' ? (
          <CNCrossingSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-md bg-white"
            crossingData={props.featureData}
          />
        ) : props.featureData.mapboxLayerId === 'CN-Railroad-Bridges' ||
          props.featureData.mapboxLayerId === 'EU-Railroad-Bridges' ? (
          <OSMSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-md bg-white"
            osmData={props.featureData}
            ringColor="ring-blue-400"
          />
        ) : props.featureData.mapboxLayerId === 'EU-Railroad-Crossings' ? (
          <OSMSidebarContent
            className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-md bg-white"
            osmData={props.featureData}
            ringColor="ring-red-400"
          />
        ) : (
          <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-md bg-white text-center">
            <span>No additional information is available for this object</span>
          </div>
        )
      ) : (
        <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-md bg-white">
          <span>No Content Selected</span>
        </div>
      )}
      <div
        className={classNames(
          'my-[35vh] mx-2 hidden rounded-md bg-white md:block',
          showSidebar ? 'cursor-w-resize' : 'cursor-e-resize'
        )}
        onClick={onClickHandler}
      >
        <div className="px-2"></div>
      </div>
    </div>
  )
}
