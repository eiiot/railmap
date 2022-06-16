import timeDifferenceRing from '../../../../helpers/sidebar/TimeDifferenceRing'
import moment from 'moment'

interface LastUpdatedElementProps {
  RecordedAtTime: string
}

const LastUpdatedElement = (props: LastUpdatedElementProps) => {
  const { RecordedAtTime } = props
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3">
      <h3 className="text-sm font-medium leading-5">Last Updated</h3>
      {/* Red if more than 15 minutes */}
      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>
          {moment.duration(-moment().diff(moment.utc(RecordedAtTime))).humanize(true) ?? 'Unknown'}
        </li>
      </ul>
      <a
        className={
          'absolute inset-0 rounded-md ring-2' +
          ' ' +
          timeDifferenceRing(moment().toISOString(), moment.utc(RecordedAtTime).toISOString())
        }
      />
    </li>
  )
}

export default LastUpdatedElement
