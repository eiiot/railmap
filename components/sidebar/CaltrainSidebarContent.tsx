import { Tab } from '@headlessui/react'
import moment from 'moment'
import { CaltrainOnwardCall, CaltrainVehicleActivity } from '../MapDataTypes'

interface TrainSidebarContentProps {
  /** Array of style options */
  trainData: CaltrainVehicleActivity
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

function generateTimelyStrings(start: string, end: string) {
  if (!(start && end)) {
    return '-'
  }
  console.log(start, end)
  const diff = moment(end).diff(moment(start), 'minutes')
  console.log(diff)
  if (-3 < diff && diff < 3) {
    return 'on time'
  }
  if (diff >= 3) {
    return moment.duration(moment.utc(start).diff(end)).humanize() + ' late'
  }
  if (diff <= -3) {
    return moment.duration(moment.utc(end).diff(start)).humanize() + ' early'
  }
}

function timeDifferenceRing(start: string, end: string) {
  const diff = moment(end).diff(moment(start), 'minutes')
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

const CaltrainSidebarContent = (props: TrainSidebarContentProps) => {
  console.log('Hello, world')

  const train =
    typeof props.trainData.MonitoredVehicleJourney === 'string'
      ? JSON.parse(props.trainData.MonitoredVehicleJourney)
      : props.trainData.MonitoredVehicleJourney
  return (
    <div className={props.className}>
      <div className="w-full px-2 py-4 text-center text-2xl">
        {train.VehicleRef} - {train.LineRef}
      </div>
      <div className="text-md w-full px-2 pb-2 text-center">
        {train.OriginName} -&gt; {train.DestinationName}
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
                {/* Red if late, green otherwise */}
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Next Station</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{train.MonitoredCall.StopPointName ?? 'Unknown'}</li>
                  </ul>
                  <a
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `ring-2 ${timeDifferenceRing(
                        train.MonitoredCall.ExpectedArrivalTime,
                        train.MonitoredCall.AimedArrivalTime,
                      )}`,
                    )}
                  />
                </li>
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Heading</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{train.DirectionRef ?? 'Unknown'}</li>
                  </ul>
                  <a
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      `ring-2 ring-blue-400 ${generateBorder(train.DirectionRef)} border-blue-400`,
                    )}
                  />
                </li>
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Last Updated</h3>
                  {/* Red if more than 15 minutes */}
                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>
                      {moment
                        .duration(-moment().diff(moment.utc(props.trainData.RecordedAtTime)))
                        .humanize(true) ?? 'Unknown'}
                    </li>
                  </ul>
                  <a
                    className={
                      'absolute inset-0 rounded-md ring-2' +
                      ' ' +
                      timeDifferenceRing(
                        moment().toISOString(),
                        moment.utc(props.trainData.RecordedAtTime).toISOString(),
                      )
                    }
                  />
                </li>
              </ul>
            </Tab.Panel>
            <Tab.Panel className="bg-white p-3">
              <ul className="children:mb-4">
                {train.MonitoredCall ? (
                  <li
                    key={train.MonitoredCall.StopPointRef}
                    className="hover:bg-coolGray-100 relative rounded-md p-3"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {train.MonitoredCall.StopPointName}
                    </h3>

                    <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>
                        Arriving{' '}
                        {generateTimelyStrings(
                          train.MonitoredCall.ExpectedArrivalTime,
                          train.MonitoredCall.AimedArrivalTime,
                        )}{' '}
                        at {moment(train.MonitoredCall.ExpectedArrivalTime).format('h:mm a')}
                      </li>
                    </ul>

                    <a
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        `${timeDifferenceRing(
                          train.MonitoredCall.ExpectedArrivalTime,
                          train.MonitoredCall.AimedArrivalTime,
                        )} ring-2`,
                      )}
                    />
                  </li>
                ) : null}
                {train.OnwardCalls.OnwardCall.map((station: CaltrainOnwardCall) => (
                  <li
                    key={station.StopPointRef}
                    className="hover:bg-coolGray-100 relative rounded-md p-3"
                  >
                    <h3 className="text-sm font-medium leading-5">{station.StopPointName}</h3>

                    <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>
                        Arriving{' '}
                        {generateTimelyStrings(
                          station.ExpectedArrivalTime,
                          station.AimedArrivalTime,
                        )}{' '}
                        at {moment(station.ExpectedArrivalTime).format('h:mm a')}
                      </li>
                    </ul>

                    <a
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        `${timeDifferenceRing(
                          station.ExpectedArrivalTime,
                          station.AimedArrivalTime,
                        )} ring-2`,
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

export default CaltrainSidebarContent
