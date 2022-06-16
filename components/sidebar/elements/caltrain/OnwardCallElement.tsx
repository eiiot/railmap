import generateTimelyStrings from '../../../../helpers/sidebar/GenerateTimelyStrings'
import timeDifferenceRing from '../../../../helpers/sidebar/TimeDifferenceRing'
import { FiveOneOneOnwardCall } from '../../../MapDataTypes'
import moment from 'moment'

interface OnwardCallElementProps {
  station: FiveOneOneOnwardCall
}

const OnewardCallElement = (props: OnwardCallElementProps) => {
  const { station } = props
  const { StopPointName, StopPointRef, ExpectedArrivalTime, AimedArrivalTime } = station
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3" key={StopPointRef}>
      <h3 className="text-sm font-medium leading-5">{StopPointName}</h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>
          Arriving {generateTimelyStrings(ExpectedArrivalTime, AimedArrivalTime)} at{' '}
          {moment(ExpectedArrivalTime).format('h:mm a')}
        </li>
      </ul>

      <a
        className={
          'absolute inset-0 rounded-md ring-2' +
          ' ' +
          timeDifferenceRing(ExpectedArrivalTime, AimedArrivalTime)
        }
      />
    </li>
  )
}

export default OnewardCallElement
