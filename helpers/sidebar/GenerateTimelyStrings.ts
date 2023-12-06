import moment from 'dayjs'

const generateTimelyStrings = (start: string, end: string) => {
  if (!(start && end)) {
    return '-'
  }
  const diff = moment(end).diff(moment(start), 'minutes')
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

export default generateTimelyStrings
