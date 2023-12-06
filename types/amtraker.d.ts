export interface Train {
  routeName: string
  trainNum: number
  trainID: string
  lat: number
  lon: number
  trainTimely: string
  stations: Station[]
  heading: 'N' | 'NE' | 'NW' | 'S' | 'SE' | 'SW' | 'E' | 'W'
  eventCode: string
  eventTZ: string[]
  eventName: string
  origCode: string
  originTZ: string[]
  origName: string
  destCode: string
  destTZ: string[]
  destName: string
  trainState: 'Active' | 'Predeparture'
  velocity: number
  statusMsg: string
  createdAt: string
  updatedAt: string
  lastValTS: string
  objectID: number
}

export interface Station {
  name: string
  code: string
  tz: string
  bus: boolean
  schArr: string
  schDep: string
  arr: string
  dep: string
  arrCmnt: string
  depCmnt: string
  status: 'Enroute' | 'Station' | 'Departed' | 'Unknown'
}

export interface StationMeta {
  name: string
  code: string
  tz: string
  lat: number
  lon: number
  address1: string
  address2: string
  city: string
  state: string
  zip: number
  trains: string[]
}

export interface TrainResponse {
  [key: string]: Train[]
}

export interface StationResponse {
  [key: string]: StationMeta
}

export interface StaleData {
  avgLastUpdate: number
  activeTrains: number
  stale: boolean
}
