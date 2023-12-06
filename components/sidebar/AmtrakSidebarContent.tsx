import moment from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Navigation2, PauseCircle, PlayCircle, StopCircle } from 'react-feather'
import { Station, Train } from '../../types/amtraker'
import clsx from 'clsx'
import StationElement from './elements/amtrak/StationElement'

moment.extend(duration)

interface TrainSidebarContentProps {
  /** Array of style options */
  trainData: Train
}

const headingToDegrees = (heading: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW') => {
  switch (heading) {
    case 'N':
      return 0
    case 'NE':
      return 45
    case 'E':
      return 90
    case 'SE':
      return 135
    case 'S':
      return 180
    case 'SW':
      return 225
    case 'W':
      return 270
    case 'NW':
      return 315
  }
}

export const cmntGenerator = (
  sch: string,
  act: string,
): {
  diff: number
  text: string
  color: string
} => {
  // display the minutes early or minutes late based on the difference between the scheduled and actual time. If the differnce is below 3 minutes, display "On Time". Only display hours if the difference is more than 60 minutes.

  const diff = moment.duration(moment(act).diff(moment(sch)))

  if (diff.asMinutes() === 0) {
    return {
      diff: diff.asMinutes(),
      text: 'On Time',
      color: 'text-green-500',
    }
  } else if (diff.asMinutes() < 0) {
    if (diff.asMinutes() <= -60) {
      return {
        diff: diff.asMinutes(),
        text: `${Math.abs(diff.hours())}h ${Math.abs(diff.minutes())}m early`,
        color: 'text-green-500',
      }
    }

    return {
      diff: diff.asMinutes(),
      text: `${Math.abs(diff.minutes())}m early`,
      color: 'text-green-500',
    }
  } else {
    if (diff.asMinutes() >= 60) {
      return {
        diff: diff.asMinutes(),
        text: `${diff.hours()}h ${diff.minutes()}m late`,
        color: 'text-red-500',
      }
    }

    return {
      diff: diff.asMinutes(),
      text: `${diff.minutes()}m late`,
      color: 'text-red-500',
    }
  }
}

export const diffGenerator = (time: string) => {
  // output either "in 5m" or "5m ago" or "in 1h 3m", etc. based on the time passed in minutes and hours

  const diff = moment.duration(moment(time).diff(moment()))

  if (diff.asMinutes() < 0) {
    if (diff.asMinutes() < -60) {
      return `${Math.abs(diff.hours())}h ${Math.abs(diff.minutes())}m ago`
    }

    return `${Math.abs(diff.minutes())}m ago`
  } else {
    if (diff.asMinutes() > 60) {
      return `in ${diff.hours()}h ${diff.minutes()}m`
    }

    return `in ${diff.minutes()}m`
  }
}

const AmtrakSidebarContent = (props: TrainSidebarContentProps) => {
  const { trainData } = props
  console.log(typeof trainData.stations, trainData.stations)
  const { stations, heading } = trainData

  const nextStation = stations.find((station) => station.status === 'Enroute') || stations[0]

  const nextStationCMNT = cmntGenerator(nextStation.schArr, nextStation.arr)

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col space-y-2 overflow-y-auto scroll-smooth rounded-t-md bg-neutral-900 text-white md:rounded-md">
      <div className="flex w-full flex-row justify-start space-x-2 p-2">
        <div className="flex aspect-square items-center justify-center">
          <Navigation2
            fill="#ffff"
            size={30}
            style={{
              transform: `rotate(${headingToDegrees(heading)}deg)`,
            }}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-full text-left text-xs font-semibold capitalize text-neutral-400">
            {moment(trainData.stations[0].schDep).format('ddd, D MMM')}
          </div>
          <div className="w-full text-left text-sm font-bold">
            {trainData.trainNum} {trainData.routeName}
          </div>
        </div>
      </div>
      <a
        href={`#${nextStation.code}`}
        className={clsx(
          'flex w-full flex-row justify-between px-2 py-3 text-sm',
          nextStationCMNT.color === 'text-green-500'
            ? 'bg-[#052e16] text-green-500'
            : 'bg-[#450a0a] text-red-500',
        )}
      >
        <span className="font-semibold">
          {nextStation.name} {diffGenerator(nextStation.arr)}
        </span>
        <span>{nextStationCMNT.text}</span>
      </a>
      <div className="flex flex-row space-x-2 px-2">
        <div className="mt-[7px] flex flex-col items-center">
          {stations.map((station, index) => (
            <>
              {index == 0 ? (
                <PlayCircle
                  size={18}
                  fill={station.status === 'Departed' ? 'rgb(163 163 163)' : '#fff'}
                  stroke="rgb(23 23 23)"
                />
              ) : index !== stations.length - 1 ? (
                <PauseCircle
                  size={18}
                  fill={station.status === 'Departed' ? 'rgb(163 163 163)' : '#fff'}
                  stroke="rgb(23 23 23)"
                />
              ) : (
                <StopCircle
                  size={18}
                  fill={station.status === 'Departed' ? 'rgb(163 163 163)' : '#fff'}
                  stroke="rgb(23 23 23)"
                />
              )}
              {index !== stations.length - 1 && (
                <div className="h-[93px] w-[1px] bg-neutral-700"></div>
              )}
            </>
          ))}
        </div>
        <div className="flex flex-1 flex-col space-y-4">
          {stations.map((station, index) => (
            <StationElement
              station={station}
              nextStation={stations[index + 1]}
              key={station.code}
            />
          ))}
        </div>
      </div>
      <div className="p-2 text-xs text-neutral-400">
        Last Updated {moment(trainData.lastValTS).format('h:mm A')}
      </div>
    </div>
  )
}

export default AmtrakSidebarContent
