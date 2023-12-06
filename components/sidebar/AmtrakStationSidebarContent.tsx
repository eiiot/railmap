import TrainElement from './elements/amtrak/TrainElement'
import { TrainResponse } from '../../types/amtraker'
import { station, trainData } from '../../types/amtraker'
import moment from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { MapRef, useMap } from 'react-map-gl'

interface StationData {
  id?: number
  city2?: string
  objectid?: number
  state?: string
  stfips?: number
  stncode?: string
  stnname?: string
  urban?: string
  mapboxLayerId?: 'amtrak'
}

interface AmtrakStationSidebarContentProps {
  /** Array of style options */
  stationData: StationData
  onTrainClick: (train: trainData, railmap: MapRef) => void
}

interface stationTrain extends station {
  train: trainData
}

const AmtrakStationSidebarContent = (props: AmtrakStationSidebarContentProps) => {
  const { stationData, onTrainClick } = props

  const [stationTrains, setStationTrains] = useState([] as stationTrain[])

  // set the station trains to an API call
  const getStationTrains = useCallback(async () => {
    const response = await fetch(`https://api-v3.amtraker.com/v3/trains`)
    const trainNums: TrainResponse = await response.json()
    console.log(stationData)
    const trains: stationTrain[] = []
    for (const trainNum in trainNums) {
      trainNums[trainNum].forEach((train: trainData) => {
        train.stations.forEach((station: station) => {
          if (
            station.code === stationData['stncode'] &&
            station.status.toLowerCase() === 'enroute'
          ) {
            trains.push({
              ...station,
              train: train,
            } as stationTrain)
          }
        })
      })
    }

    console.log('trains', trains)

    // order stations by closest estArr
    trains.sort((a, b) => {
      return moment(a.train.estArr).diff(moment(b.train.estArr))
    })
    setStationTrains(trains)
  }, [stationData])

  useEffect(() => {
    getStationTrains()
  }, [getStationTrains])

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {stationData['stnname'] ?? 'Unknown Station'}
      </div>
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="children:mb-4 w-full">
            {stationTrains.length > 0 ? (
              stationTrains.map((train) => (
                <TrainElement
                  key={train.train.trainNum}
                  onTrainClick={onTrainClick}
                  train={train}
                />
              ))
            ) : (
              <li className="hover:bg-coolGray-100 relative flex h-full w-full items-center justify-center rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">No Trains Available</h3>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AmtrakStationSidebarContent
