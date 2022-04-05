interface OSMSidebarContentProps {
  /** Array of style options */
  osmData: { [key: string]: string }
  className: string
  ringColor: string
}

function isEmptyOrSpaces(input: any) {
  if (typeof input !== 'string') {
    if (input === undefined || input === null) {
      return true
    }
    return false
  }
  return input.match(/^ *$/) !== null
}

const OSMSidebarContent = (props: OSMSidebarContentProps) => {
  if (
    props.osmData['name'] ||
    props.osmData['operator'] ||
    props.osmData['usage'] ||
    props.osmData['electrified']
  ) {
    return (
      <div className={props.className}>
        <div className="w-full px-2 py-4 text-center text-2xl">
          {props.osmData['name'] ?? 'Unknown Name'}
        </div>
        <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
          <div className="bg-white p-3">
            <ul className="w-full children:mb-4">
              {!isEmptyOrSpaces(props.osmData['operator']) ? (
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Operator</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.osmData['operator']}</li>
                  </ul>
                  <a
                    className={
                      'absolute inset-0 rounded-md ring-2 ' + props.ringColor
                    }
                  />
                </li>
              ) : null}
              {!isEmptyOrSpaces(props.osmData['usage']) ? (
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Usage</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.osmData['usage']}</li>
                  </ul>
                  <a
                    className={
                      'absolute inset-0 rounded-md ring-2 ' + props.ringColor
                    }
                  />
                </li>
              ) : null}
              {!isEmptyOrSpaces(props.osmData['electrified']) ? (
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Usage</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{props.osmData['electrified']}</li>
                  </ul>
                  <a
                    className={
                      'absolute inset-0 rounded-md ring-2 ' + props.ringColor
                    }
                  />
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-md bg-white text-center">
        <span>No additional information is available for this object</span>
      </div>
    )
  }
}

export default OSMSidebarContent
