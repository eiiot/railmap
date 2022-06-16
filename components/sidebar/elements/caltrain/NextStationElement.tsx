import { FiveOneOneMonitoredCall, FiveOneOneOnwardCall } from '../../../MapDataTypes'
import timeDifferenceRing from '../functions/TimeDifferenceRing'

interface NextStationElementProps {
  monitoredCall?: FiveOneOneMonitoredCall
}

const NextStationElement = (props: NextStationElementProps) => {
  const { monitoredCall } = props
  if (!monitoredCall) {
    return null
  }
  const { StopPointName, ExpectedArrivalTime, AimedArrivalTime } = monitoredCall
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3">
      <h3 className="text-sm font-medium leading-5">Next Station</h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>{StopPointName ?? 'Unknown'}</li>
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

NextStationElement.defaultProps = {
  monitoredCall: undefined,
}

export default NextStationElement
