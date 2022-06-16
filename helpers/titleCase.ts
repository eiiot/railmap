import capitalize from './capitalize'

const titleCase = (input: unknown) => {
  if (typeof input === 'string') {
    return (
      input
        // split at non-alphanumeric characters
        .split(/[^\w]/)
        .map((word) => (word.length > 2 ? capitalize(word) : word))
        .join(' ')
    )
  } else if (typeof input === 'number') {
    return input.toString()
  } else {
    return ''
  }
}

export default titleCase
