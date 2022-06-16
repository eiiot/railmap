import TimeDifferenceRing from '../../../TimeDifferenceRing'
import { station, trainData } from 'amtrak'
import moment from 'moment'
import { MapRef, useMap } from 'react-map-gl'

interface stationTrain extends station {
  train: trainData
}

interface TrainElementProps {
  train: stationTrain
  onTrainClick: (train: trainData, railmap: MapRef) => void
}

const TrainElement = (props: TrainElementProps) => {
  const { train, onTrainClick } = props

  const { railmap } = useMap()

  return (
    <li
      className="hover:bg-coolGray-100 relative cursor-pointer rounded-md p-3"
      key={train.train.trainNum}
      onClick={() => {
        onTrainClick(train.train, railmap!)
      }}
    >
      <h3 className="text-sm font-medium leading-5">
        {train.train.routeName} {train.train.trainNum}
      </h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>
          Arriving{' '}
          {train.estArrCmnt
            ?.toLowerCase()
            .replace('mi', 'min') // remove a zero if it's the first character
            .replace(/^0/, '')}{' '}
          {moment(train.estArr).fromNow()} ({moment(train.estArr).format('h:mm a')})
        </li>
      </ul>

      <TimeDifferenceRing
        end={moment.utc(train.schArr).toISOString()}
        start={moment.utc(train.estArr).toISOString()}
      />
    </li>
  )
}

export default TrainElement
