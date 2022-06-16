import generateTimelyStrings from '../../../../helpers/sidebar/GenerateTimelyStrings'
import timeDifferenceRing from '../../../../helpers/sidebar/TimeDifferenceRing'
import { FiveOneOneMonitoredCall } from '../../../MapDataTypes'
import moment from 'moment'

interface MonitoredCallElementProps {
  monitoredCall?: FiveOneOneMonitoredCall
}

const MonitoredCallElement = (props: MonitoredCallElementProps) => {
  const { monitoredCall } = props
  if (!monitoredCall) {
    return null
  }
  const { StopPointName, StopPointRef, ExpectedArrivalTime, AimedArrivalTime } = monitoredCall
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

// default props
MonitoredCallElement.defaultProps = {
  monitoredCall: undefined,
}

export default MonitoredCallElement
