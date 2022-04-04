interface CNCrossingSidebarContentProps {
  /** Array of style options */
  crossingData: { [key: string]: string | number | boolean }
  className: string
}

function isEmptyOrSpaces(input: any) {
  console.log(typeof input)
  if (typeof input !== 'string') {
    return false
  }
  return input === null || input.match(/^ *$/) !== null
}

const CNCrossingSidebarContent = (props: CNCrossingSidebarContentProps) => {
  return (
    <div className={props.className}>
      <div className="w-full px-2 py-4 text-center text-2xl">
        {props.crossingData['Location'] ?? 'Unknown Location'}
      </div>
      {/* <div className="text-md w-full px-2 pb-2 text-center">
        {props.crossingData.stations[0].stationName} -&gt;{' '}
        {
          props.crossingData.stations[props.crossingData.stations.length - 1]
            .stationName
        }
      </div> */}
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="w-full children:mb-4">
            {!isEmptyOrSpaces(props.crossingData['Railway']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Railroad</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Railway']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Subdivision']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Subdivision</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Subdivision']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Mile']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Milepost</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Mile']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Spur Name']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Spur Name</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Spur Name']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Spur Mile']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Spur Mile</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Spur Mile']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['TC Number']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">TC Number</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['TC Number']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Tracks']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Tracks</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Tracks']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Total Trains Daily']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  Total Trains Daily
                </h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Total Trains Daily']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Vehicles Daily']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  Vehicles Daily
                </h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Vehicles Daily']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Train Max Speed (mph)']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  Train Max Speed
                </h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Train Max Speed (mph)']} mph</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Road Speed (km/h)']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Road Speed</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>
                    {(
                      (props.crossingData['Road Speed (km/h)'] as number) /
                      1.609
                    ).toFixed(1)}{' '}
                    mph
                  </li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Lanes']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Road Lanes</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Lanes']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Access']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Access</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Access']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Protection']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Protection</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Protection']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Province']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Province</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Province']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Region']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Region</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Region']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Urban Y/N']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Urban</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>
                    {props.crossingData['Urban Y/N'] == 'Y' ? 'Yes' : 'No'}
                  </li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Regulator']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Regulator</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Railway'] ? 'Yes' : 'No'}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Road Authority']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">
                  Road Authority
                </h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Road Authority']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Accident']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Accidents</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Accident']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Fatality']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Fatalities</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Fatality']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
            {!isEmptyOrSpaces(props.crossingData['Injury']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Injuries</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>{props.crossingData['Injury']}</li>
                </ul>
                <a className="absolute inset-0 rounded-md ring-2 ring-red-400" />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CNCrossingSidebarContent
