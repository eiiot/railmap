import { Tab } from '@headlessui/react'
import moment from 'moment'
import { station, trainData } from '../amtrakTypes'

interface TrainSidebarContentProps {
  /** Array of style options */
  trainData: trainData
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

function timeDifferenceRing(start: string | null | undefined, end: string | null | undefined) {
  if (!(start && end)) {
    return 'ring-red-500'
  }
  const diff = 0 - moment(end).diff(moment(start), 'minutes')
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

function findStation(stations: station[], code: string) {
  return (
    stations.find((station?) => station.code == code) ?? {
      trainNum: null,
      code: null,
      tz: null,
      bus: null,
      schArr: null,
      schDep: null,
      schMnt: null,
      autoArr: null,
      autoDep: null,
      postArr: null,
      postDep: null,
      postCmnt: null,
      estArr: null,
      estDep: null,
      estArrCmnt: null,
      estDepCmnt: null,
      stationName: null,
      stationTimely: null,
    }
  )
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const TrainSidebarContent = (props: TrainSidebarContentProps) => {
  const stations =
    typeof props.trainData.stations === 'string'
      ? JSON.parse(props.trainData.stations)
      : props.trainData.stations
  return (
    <div className={props.className}>
      <div className="w-full px-2 py-4 text-center text-2xl">
        {props.trainData.routeName} {props.trainData.trainNum}
      </div>
      <div className="text-md w-full px-2 pb-2 text-center">
        {stations[0].stationName} -&gt; {stations[stations.length - 1].stationName}
      </div>
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-hidden px-2">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
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
              className={({ selected }) =>
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
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Speed</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{(props.trainData.velocity ?? 0).toFixed(1)} mph</li>
                  </ul>
                  <a
                    className={classNames('absolute inset-0 rounded-md', 'ring-2 ring-blue-400')}
                    href="#"
                  />
                </li>
                {/* Red if late, green otherwise */}
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Last Station</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>
                      {props.trainData.eventName ?? 'Unknown'} [{props.trainData.eventCode ?? 'UNK'}
                      ] |{' '}
                      {capitalize(
                        (
                          findStation(stations, props.trainData.eventCode).postCmnt ??
                          findStation(stations, props.trainData.eventCode).estArrCmnt ??
                          findStation(stations, props.trainData.eventCode).estDepCmnt ??
                          'unknown'
                        )
                          .toLowerCase()
                          .replace('mi', 'min')
                          // remove a zero if it's the first character
                          .replace(/^0/, ''),
                      )}
                    </li>
                  </ul>
                  <a
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `ring-2 ${timeDifferenceRing(
                        findStation(stations, props.trainData.eventCode).postDep ??
                          findStation(stations, props.trainData.eventCode).estDep,
                        findStation(stations, props.trainData.eventCode).schDep,
                      )}`,
                    )}
                    href="#"
                  />
                </li>
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Heading</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.trainData.heading ?? 'Unknown'}</li>
                  </ul>
                  <a
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `ring-2 ring-blue-400 ${generateBorder(
                        props.trainData.heading,
                      )} border-blue-400`,
                    )}
                    href="#"
                  />
                </li>
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Time Zone</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.trainData.trainTimeZone ?? 'Unknown'}</li>
                  </ul>
                  <a
                    className={classNames('absolute inset-0 rounded-md', 'ring-2 ring-blue-400')}
                    href="#"
                  />
                </li>
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Last Updated</h3>
                  {/* Red if more than 15 minutes */}
                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>
                      {moment
                        .duration(-moment().diff(moment.utc(props.trainData.lastValTS)))
                        .humanize(true) ?? 'Unknown'}
                    </li>
                  </ul>
                  <a
                    className={
                      'absolute inset-0 rounded-md ring-2' +
                      ' ' +
                      timeDifferenceRing(
                        moment().toISOString(),
                        moment.utc(props.trainData.lastValTS).toISOString(),
                      )
                    }
                    href="#"
                  />
                </li>
              </ul>
            </Tab.Panel>
            <Tab.Panel className="bg-white p-3">
              <ul className="children:mb-4">
                {stations.map((station: station) => (
                  <li key={station.code} className="hover:bg-coolGray-100 relative rounded-md p-3">
                    <h3 className="text-sm font-medium leading-5">{station.stationName}</h3>

                    <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>
                        {station.postCmnt ? (
                          <>
                            Left {station.postCmnt.toLowerCase().replace('mi', 'min')} at{' '}
                            {moment(station.postDep).format('h:mm a')}
                          </>
                        ) : station.estArrCmnt ? (
                          <>
                            Arriving {station.estArrCmnt.toLowerCase().replace('mi', 'min')} at{' '}
                            {moment(station.estArr).format('h:mm a')}
                          </>
                        ) : station.estDepCmnt ? (
                          <>
                            Leaving {station.estDepCmnt.toLowerCase().replace('mi', 'min')} at{' '}
                            {moment(station.estDep).format('h:mm a')}
                          </>
                        ) : null}
                      </li>
                    </ul>

                    <a
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        `${timeDifferenceRing(
                          moment.utc(station.postDep ?? station.estDep).toISOString(),
                          moment.utc(station.schDep).toISOString(),
                        )} ring-2`,
                      )}
                      href="#"
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
