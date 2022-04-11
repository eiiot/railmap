import { USBridgeData } from '../MapDataTypes'

interface BridgeSidebarContentProps {
  /** Array of style options */
  bridgeData: USBridgeData
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + (string.slice(1) ?? '').toLowerCase()
}

function titleCase(input: string | number) {
  if (typeof input === 'string') {
    return (
      input
        // split at non-alphanumeric characters
        .split(/[^\w]/)
        .map((word) => (word.length > 2 ? capitalize(word) : word))
        .join(' ')
    )
  } else {
    return input
  }
}

function isEmptyOrSpaces(str: string | number | undefined) {
  return typeof str == 'number' || str == null || str.match(/^ *$/) !== null
}

const BridgeSidebarContent = (props: BridgeSidebarContentProps) => {
  const { bridgeData } = props
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {titleCase(bridgeData['NAME'] ?? 'Unknown Street')}
      </div>
      {/* <div className="text-md w-full px-2 pb-2 text-center">
        {bridgeData.stations[0].stationName} -&gt;{' '}
        {
          bridgeData.stations[bridgeData.stations.length - 1]
            .stationName
        }
      </div> */}
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="w-full children:mb-4">
            {!isEmptyOrSpaces(bridgeData['RAILWAY_NM']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Railroad Name</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['COUNTY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['FEATURE_TY']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Feature Type</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['FEATURE_TY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['CITY']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">City</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['CITY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['COUNTY']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">County</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['COUNTY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['STATE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">State</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['STATE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['ZIP']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Zip Code</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['ZIP']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['FCODE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Feature Code</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['FCODE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['FDATE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Date of Creation</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['FDATE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['GEODATE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Date of Last Update</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['GEODATE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(bridgeData['NAICSDESCR']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">NAICS Code</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{bridgeData['NAICSDESCR']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BridgeSidebarContent
