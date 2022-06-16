import EventElement from './elements/amtrak/EventElement'
import LastUpdatedElement from './elements/amtrak/LastUpdatedElement'
import SpeedElement from './elements/amtrak/SpeedElement'
import StationElement from './elements/amtrak/StationElement'
import TimeZoneElement from './elements/amtrak/TimeZoneElement'
import HeadingElement from './elements/HeadingElement'
import { classNames } from '../../helpers/tailwind/classNames'
import { Tab } from '@headlessui/react'
import { station, trainData } from 'amtrak'

interface TrainSidebarContentProps {
  /** Array of style options */
  trainData: trainData
}

const AmtrakSidebarContent = (props: TrainSidebarContentProps) => {
  const { trainData } = props
  console.log(typeof trainData.stations, trainData.stations)
  const stations = trainData.stations

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {trainData.routeName} {trainData.trainNum}
      </div>
      <div className="text-md w-full px-2 pb-2 text-center">
        {stations[0].stationName} -&gt; {stations[stations.length - 1].stationName}
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
                <SpeedElement velocity={trainData.velocity} />
                {/* Red if late, green otherwise */}
                <EventElement
                  eventCode={trainData.eventCode}
                  eventName={trainData.eventName}
                  stations={stations}
                />
                <HeadingElement heading={trainData.heading} />
                <TimeZoneElement timeZone={trainData.trainTimeZone} />
                <LastUpdatedElement lastUpdated={trainData.lastValTS} />
              </ul>
            </Tab.Panel>
            <Tab.Panel className="bg-white p-3">
              <ul className="children:mb-4">
                {stations.map((station: station) => (
                  <StationElement key={station.code} station={station} />
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default AmtrakSidebarContent
