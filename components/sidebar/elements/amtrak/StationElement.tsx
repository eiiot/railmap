import timeDifferenceRing from '../functions/TimeDifferenceRing'
import { station } from 'amtrak'
import moment from 'moment'

interface StationElementProps {
  station: station
}

const StationElement = (props: StationElementProps) => {
  const { station } = props
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3" key={station.code}>
      <h3 className="text-sm font-medium leading-5">
        {station.stationName ?? station.code ?? 'Unknown Station'}
      </h3>

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
        className={
          'absolute inset-0 rounded-md ring-2' +
          ' ' +
          timeDifferenceRing(
            moment.utc(station.postDep ?? station.estDep).toISOString(),
            moment.utc(station.schDep).toISOString(),
          )
        }
      />
    </li>
  )
}

export default StationElement
