import LastUpdatedElement from './elements/caltrain/LastUpdatedElement'
import MonitoredCallElement from './elements/caltrain/MonitoredCallElement'
import NextStationElement from './elements/caltrain/NextStationElement'
import OnewardCallElement from './elements/caltrain/OnwardCallElement'
import HeadingElement from './elements/HeadingElement'
import { classNames } from '../../helpers/tailwind/classNames'
import {
  FiveOneOneMonitoredVehicleJourney,
  FiveOneOneOnwardCall,
  FiveOneOneVehicleActivity,
} from '../MapDataTypes'
import { Tab } from '@headlessui/react'
import moment from 'moment'

interface TrainSidebarContentProps {
  /** Array of style options */
  trainData: FiveOneOneVehicleActivity
}

const CaltrainSidebarContent = (props: TrainSidebarContentProps) => {
  const { trainData } = props

  const train = trainData.MonitoredVehicleJourney

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {train.VehicleRef}
        {' - '}
        {train.LineRef}
      </div>
      <div className="text-md w-full px-2 pb-2 text-center">
        {train.OriginName} -&gt; {train.DestinationName}
      </div>
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-hidden px-2">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }: { selected: boolean }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2  focus:outline-none ',
                  selected
                    ? 'bg-white text-black shadow'
                    : 'text-white hover:bg-white/[0.12] hover:text-gray-100',
                )
              }
            >
              Information
            </Tab>
            <Tab
              className={({ selected }: { selected: boolean }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2  focus:outline-none ',
                  selected
                    ? 'bg-white text-black shadow'
                    : 'text-white hover:bg-white/[0.12] hover:text-gray-100',
                )
              }
            >
              Stations
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 flex-[1] overflow-auto">
            <Tab.Panel className="bg-white p-3">
              <ul className="children:mb-4">
                {/* Red if late, green otherwise */}
                <MonitoredCallElement monitoredCall={train.MonitoredCall} />
                <NextStationElement monitoredCall={train.MonitoredCall} />
                <HeadingElement heading={train.DirectionRef} />
                <LastUpdatedElement RecordedAtTime={trainData.RecordedAtTime} />
              </ul>
            </Tab.Panel>
            <Tab.Panel className="bg-white p-3">
              <ul className="children:mb-4">
                {train.OnwardCalls ? (
                  train.OnwardCalls.OnwardCall.map((station: FiveOneOneOnwardCall) => (
                    <OnewardCallElement key={station.StopPointRef} station={station} />
                  ))
                ) : (
                  <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-t-md bg-white text-center md:rounded-md">
                    <span>There are no additional stations</span>
                  </div>
                )}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default CaltrainSidebarContent
