const isEmptyOrSpaces = (str: string | number | undefined) => {
  return typeof str == 'number' || str == null || str.match(/^ *$/) !== null
}

export default isEmptyOrSpaces
