interface OSMSidebarContentProps {
  /** Array of style options */
  osmData: { name?: string; operator?: string; usage?: string; electrified?: string }
  ringColor: string
}

function isEmptyOrSpaces(str: string | number | undefined) {
  return typeof str == 'number' || str === undefined || str.match(/^ *$/) !== null
}

const OSMSidebarContent = (props: OSMSidebarContentProps) => {
  const { osmData, ringColor } = props

  if (osmData['name'] || osmData['operator'] || osmData['usage'] || osmData['electrified']) {
    return (
      <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
        <div className="w-full px-2 py-4 text-center text-2xl">
          {osmData['name'] ?? 'Unknown Name'}
        </div>
        <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
          <div className="bg-white p-3">
            <ul className="w-full children:mb-4">
              {!isEmptyOrSpaces(osmData['operator']) ? (
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Operator</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{osmData['operator']}</li>
                  </ul>
                  <a className={'absolute inset-0 rounded-md ring-2 ' + ringColor} />
                </li>
              ) : null}
              {!isEmptyOrSpaces(osmData['usage']) ? (
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Usage</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{osmData['usage']}</li>
                  </ul>
                  <a className={'absolute inset-0 rounded-md ring-2 ' + ringColor} />
                </li>
              ) : null}
              {!isEmptyOrSpaces(osmData['electrified']) ? (
                <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                  <h3 className="text-sm font-medium leading-5">Usage</h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{osmData['electrified']}</li>
                  </ul>
                  <a className={'absolute inset-0 rounded-md ring-2 ' + ringColor} />
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
