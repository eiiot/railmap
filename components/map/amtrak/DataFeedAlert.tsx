import Alert from '../../trainsitionAlert'
import { useEffect, useState } from 'react'

async function getFeedStale() {
  try {
    const response = await fetch('https://api.amtraker.com/v2/dataFeedState')
    const data = await response.json()
    return data.isStale
  } catch (error) {
    console.error(error)
    return false
  }
}

const DataFeedAlert = () => {
  useEffect(() => {
    getFeedStale().then((isStale) => {
      if (isStale) {
        setAmtrakDataStaleWarning(true)
      }
    })
  }, [])

  setTimeout(() => {
    setAmtrakDataStaleWarning(false)
  }, 10000)

  const [amtrakDataStaleWarning, setAmtrakDataStaleWarning] = useState<boolean>(false)

  return (
    <Alert
      className="fixed top-0 left-0 z-20 m-3 "
      direction="left"
      onClose={() => setAmtrakDataStaleWarning(false)}
      open={amtrakDataStaleWarning}
      severity="error"
    >
      The Amtrak API is currently stale
    </Alert>
  )
}

export default DataFeedAlert
