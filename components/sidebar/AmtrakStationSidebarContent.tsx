import { useCallback, useState, useEffect } from 'react'
import moment from 'moment'
import { trainData, station } from '../amtrakTypes'
import { MapboxMap, MapRef, useMap } from 'react-map-gl'

interface AmtrakStationSidebarContentProps {
  /** Array of style options */
  stationData: { [key: string]: string }
  className: string
  onTrainClick?: (train: trainData, mainMapboxMap: MapRef) => void
}

interface stationTrains extends station {
  train: trainData
}

function timeDifferenceRing(start: string, end: string) {
  start = start ?? 0
  end = end ?? new Date().toISOString()
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

const AmtrakStationSidebarContent = (
  props: AmtrakStationSidebarContentProps
) => {
  const [stationTrains, setStationTrains] = useState([] as stationTrains[])

  // set the station trains to an API call
  const getStationTrains = useCallback(async () => {
    const response = await fetch(`https://api.amtraker.com/v1/trains`)
    const trainNums: { [key: number]: trainData[] } = await response.json()
    const stations: stationTrains[] = []
    for (const trainNum in trainNums) {
      trainNums[trainNum].forEach((train: trainData) => {
        train.stations.forEach((station: station) => {
          if (station.code === props.stationData['stncode'] && station.estArr) {
            stations.push({
              ...station,
              train: train,
            })
          }
        })
      })
    }
    // order stations by closest estArr
    stations.sort((a, b) => {
      return moment(a.estArr).diff(moment(b.estArr))
    })
    setStationTrains(stations)
  }, [props.stationData['stncode']])

  useEffect(() => {
    getStationTrains()
  }, [getStationTrains])

  const { mainMapboxMap } = useMap()

  return (
    <div className={props.className}>
      <div className="w-full px-2 py-4 text-center text-2xl">
        {props.stationData['stnname'] ?? 'Unknown Station'}
      </div>
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="w-full children:mb-4">
            {stationTrains.length > 0 ? (
              stationTrains.map((train) => (
                <li
                  className="hover:bg-coolGray-100 relative cursor-pointer rounded-md p-3"
                  onClick={() => {
                    if (props.onTrainClick) {
                      props.onTrainClick(train.train, mainMapboxMap!)
                    }
                  }}
                >
                  <h3 className="text-sm font-medium leading-5">
                    {train.train.routeName} {train.train.trainNum}
                  </h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>
                      Arriving{' '}
                      {train.estArrCmnt!.toLowerCase().replace('mi', 'min')}{' '}
                      {moment(train.estArr).fromNow()} (
                      {moment(train.estArr).format('h:mm a')})
                    </li>
                  </ul>

                  <a
                    href="#"
                    className={
                      'absolute inset-0 rounded-md ring-2' +
                      ' ' +
                      timeDifferenceRing(
                        moment.utc(train.estArr).toISOString(),
                        moment.utc(train.schArr).toISOString()
                      )
                    }
                  />
                </li>
              ))
            ) : (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  No Trains Available
                </h3>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AmtrakStationSidebarContent
