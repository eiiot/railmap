import moment from 'moment'

const timeDifferenceRing = (start: string | null | undefined, end: string | null | undefined) => {
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

export default timeDifferenceRing
