import { Station } from '../../../types/amtraker'

const findStation = (stations: Station[], code: string) => {
  return (
    stations.find((station) => station.code == code) ?? {
      trainNum: null,
      code: null,
      tz: null,
      bus: null,
      schArr: null,
      schDep: null,
      schMnt: null,
      autoArr: null,
      autoDep: null,
      postArr: null,
      postDep: null,
      postCmnt: null,
      estArr: null,
      estDep: null,
      estArrCmnt: null,
      estDepCmnt: null,
      stationName: null,
      stationTimely: null,
    }
  )
}

export default findStation
