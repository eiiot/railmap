interface BridgeSidebarContentProps {
  /** Array of style options */
  bridgeData: {
    NAME: string
    [key: string]: string | number
  }
  className: string
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + (string.slice(1) ?? '').toLowerCase()
}

function titleCase(string: string) {
  return (
    string
      // split at non-alphanumeric characters
      .split(/[^\w]/)
      .map((word) => (word.length > 2 ? capitalize(word) : word))
      .join(' ')
  )
}

// NAME: 'UNION PACIFIC; STREAM/RIVER' // Name
// RAILWAY_NM: 'UNION PACIFIC' // Railroad Name
// FEATURE_TY: 'STREAM/RIVER' // Feature Type
// CITY: 'CALIENTE' // City
// COUNTY: 'LINCOLN' // County
// STATE: 'NV' // State
// ZIP: '89008' // Zip Code
// FCODE: 46003 // Feature Code
// FDATE: '1999/08/20 00:00:00+00' // Date of Creation
// GEODATE: '2009/01/22 00:00:00+00' // Date of Last Update
// NAICSDESCR: 'BRIDGE, TUNNEL, AND HIGHWAY OPERATIONS' // NAICS Description

function isEmptyOrSpaces(str: any) {
  return typeof str == 'number' || str == null || str.match(/^ *$/) !== null
}

const BridgeSidebarContent = (props: BridgeSidebarContentProps) => {
  return (
    <div className={props.className}>
      <div className="w-full px-2 py-4 text-center text-2xl">
        {titleCase(props.bridgeData['NAME'] ?? 'Unknown Street')}
      </div>
      {/* <div className="text-md w-full px-2 pb-2 text-center">
        {props.bridgeData.stations[0].stationName} -&gt;{' '}
        {
          props.bridgeData.stations[props.bridgeData.stations.length - 1]
            .stationName
        }
      </div> */}
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="w-full children:mb-4">
            {!isEmptyOrSpaces(props.bridgeData['RAILWAY_NM']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Railroad Name</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['COUNTY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['FEATURE_TY']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Feature Type</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['FEATURE_TY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['CITY']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">City</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['CITY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['COUNTY']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">County</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['COUNTY']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['STATE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">State</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['STATE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['ZIP']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Zip Code</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['ZIP']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['FCODE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Feature Code</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['FCODE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['FDATE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  Date of Creation
                </h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['FDATE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['GEODATE']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  Date of Last Update
                </h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['GEODATE']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.bridgeData['NAICSDESCR']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">NAICS Code</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.bridgeData['NAICSDESCR']}</li>
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
