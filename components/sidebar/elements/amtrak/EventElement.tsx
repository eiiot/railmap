import capitalize from '../../../../helpers/capitalize'
import findStation from '../../../../helpers/sidebar/amtrak/FindStation'
import TimeDifferenceRing from '../../../TimeDifferenceRing'
import { station } from 'amtrak'

interface EventElementProps {
  eventName: string | null
  eventCode: string | null
  stations: station[]
}

const EventElement = (props: EventElementProps) => {
  const { eventName, eventCode, stations } = props

  if (!eventCode) {
    return null
  }

  const station = findStation(stations, eventCode)

  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3">
      <h3 className="text-sm font-medium leading-5">
        {station.postCmnt ? 'Last Station' : 'Next Station'}
      </h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>
          {eventName ?? 'Unknown Station'} {eventCode} |{' '}
          {capitalize(
            (station.postCmnt ?? station.estArrCmnt ?? station.estDepCmnt ?? 'unknown')
              .toLowerCase()
              .replace('mi', 'min')
              // remove a zero if it's the first character
              .replace(/^0/, ''),
          )}
        </li>
      </ul>
      <TimeDifferenceRing end={station.schDep} start={station.postDep ?? station.estDep} />
    </li>
  )
}

export default EventElement
