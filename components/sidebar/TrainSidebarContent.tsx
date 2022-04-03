import { Tab } from '@headlessui/react'
import moment from 'moment'

interface TrainSidebarContentProps {
  /** Array of style options */
  trainData: any
  className: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function generateBorder(dir: string) {
  if (dir === 'N') {
    return 'border-t-2'
  }
  if (dir === 'S') {
    return 'border-b-2'
  }
  if (dir === 'E') {
    return 'border-r-2'
  }
  if (dir === 'W') {
    return 'border-l-2'
  }
  if (dir === 'NE') {
    return 'border-t-2 border-r-2'
  }
  if (dir === 'NW') {
    return 'border-t-2 border-l-2'
  }
  if (dir === 'SE') {
    return 'border-b-2 border-r-2'
  }
  if (dir === 'SW') {
    return 'border-b-2 border-l-2'
  }
  return ''
}

function timeDifferenceRing(start: string, end: string) {
  start = start ?? 0
  end = end ?? new Date().toISOString()
  const endMoment = moment(end)
  const diff = moment(start).diff(endMoment, 'minutes')
  if (diff < 5) {
    return 'ring-green-500'
  }
  if (diff < 10) {
    return 'ring-yellow-500'
  }
  if (diff < 30) {
    return 'ring-orange-500'
  }
  return 'ring-red-500'
}

function findStation(stations: Array<{ [key: string]: string }>, code: string) {
  return stations.find((station) => station.code == code)
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const TrainSidebarContent = (props: TrainSidebarContentProps) => {
  props.trainData.stations =
    typeof props.trainData.stations === 'string'
      ? JSON.parse(props.trainData.stations)
      : props.trainData.stations
  return (
    <div className={props.className}>
      <div className="w-full px-2 py-4 text-center text-2xl">
        {props.trainData.routeName}
      </div>
      <div className="text-md w-full px-2 pb-2 text-center">
        {props.trainData.stations[0].stationName} -&gt;{' '}
        {
          props.trainData.stations[props.trainData.stations.length - 1]
            .stationName
        }
      </div>

      <div className="w-full px-2 pb-4 text-center">
        {capitalize(
          (
            findStation(props.trainData.stations, props.trainData.eventCode)!
              .postCmnt ??
            findStation(props.trainData.stations, props.trainData.eventCode)!
              .estArrCmnt ??
            findStation(props.trainData.stations, props.trainData.eventCode)!
              .estDepCmnt ??
            'unknown'
          )
            .toLowerCase()
            .replace('mi', 'min')
        )}{' '}
        @ {props.trainData.eventName}
      </div>
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-hidden px-2">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              key="Info"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2  focus:outline-none ',
                  selected
                    ? 'bg-white text-black shadow'
                    : 'text-white hover:bg-white/[0.12] hover:text-gray-100'
                )
              }
            >
              Information
            </Tab>
            <Tab
              key="Stations"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2  focus:outline-none ',
                  selected
                    ? 'bg-white text-black shadow'
                    : 'text-white hover:bg-white/[0.12] hover:text-gray-100'
                )
              }
            >
              Stations
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 flex-[1] overflow-auto">
            <Tab.Panel key="Speed" className="bg-white p-3">
              <ul className="children:mb-4">
                <li
                  key="speed"
                  className="hover:bg-coolGray-100 relative rounded-md p-3"
                >
                  <h3 className="text-sm font-medium leading-5">Speed</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{(props.trainData.velocity ?? 0).toFixed(1)}mph</li>
                  </ul>
                  <a
                    href="#"
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      'ring-2 ring-blue-400'
                    )}
                  />
                </li>
                {/* Red if late, green otherwise */}
                <li
                  key="station"
                  className="hover:bg-coolGray-100 relative rounded-md p-3"
                >
                  <h3 className="text-sm font-medium leading-5">
                    Last Station
                  </h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>
                      {props.trainData.eventName ?? 'Unknown'} |{' '}
                      {props.trainData.eventCode ?? 'UNK'}
                    </li>
                  </ul>
                  <a
                    href="#"
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `ring-2 ${timeDifferenceRing(
                        findStation(
                          props.trainData.stations,
                          props.trainData.eventCode
                        )!.postDep ??
                          findStation(
                            props.trainData.stations,
                            props.trainData.eventCode
                          )!.estDep,
                        findStation(
                          props.trainData.stations,
                          props.trainData.eventCode
                        )!.schDep
                      )}`
                    )}
                  />
                </li>
                <li
                  key="heading"
                  className="hover:bg-coolGray-100 relative rounded-md p-3"
                >
                  <h3 className="text-sm font-medium leading-5">Heading</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.trainData.heading ?? 'Unknown'}</li>
                  </ul>
                  <a
                    href="#"
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `ring-2 ring-blue-400 ${generateBorder(
                        props.trainData.heading
                      )} border-blue-400`
                    )}
                  />
                </li>
                <li
                  key="tz"
                  className="hover:bg-coolGray-100 relative rounded-md p-3"
                >
                  <h3 className="text-sm font-medium leading-5">Time Zone</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.trainData.trainTimeZone ?? 'Unknown'}</li>
                  </ul>
                  <a
                    href="#"
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      'ring-2 ring-blue-400'
                    )}
                  />
                </li>
                <li
                  key="key"
                  className="hover:bg-coolGray-100 relative rounded-md p-3"
                >
                  <h3 className="text-sm font-medium leading-5">
                    Last Updated
                  </h3>
                  {/* Red if more than 15 minutes */}
                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>
                      {moment
                        .duration(-moment().diff(props.trainData.lastValTS))
                        .humanize(true) ?? 'Unknown'}
                    </li>
                  </ul>
                  <a
                    href="#"
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `${timeDifferenceRing(
                        moment().toString(),
                        props.trainData.lastValTS
                      )} ring-2`
                    )}
                  />
                </li>
              </ul>
            </Tab.Panel>
            <Tab.Panel key="Stations" className="bg-white p-3">
              <ul className="children:mb-4">
                {props.trainData.stations.map((station: any, index: number) => (
                  <li
                    key={station.code}
                    className="hover:bg-coolGray-100 relative rounded-md p-3"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {station.stationName}
                    </h3>

                    <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>
                        {station.postCmnt ? (
                          <>
                            Left{' '}
                            {station.postCmnt
                              .toLowerCase()
                              .replace('mi', 'min')}{' '}
                            at {moment(station.postDep).format('h:mm a')}
                          </>
                        ) : station.estArrCmnt ? (
                          <>
                            Arriving{' '}
                            {station.estArrCmnt
                              .toLowerCase()
                              .replace('mi', 'min')}{' '}
                            at {moment(station.estArr).format('h:mm a')}
                          </>
                        ) : station.estDepCmnt ? (
                          <>
                            Leaving{' '}
                            {station.estDepCmnt
                              .toLowerCase()
                              .replace('mi', 'min')}{' '}
                            at {moment(station.estDep).format('h:mm a')}
                          </>
                        ) : null}
                      </li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        `${timeDifferenceRing(
                          station.postDep ?? station.estDep,
                          station.schDep
                        )} ring-2`
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default TrainSidebarContent
