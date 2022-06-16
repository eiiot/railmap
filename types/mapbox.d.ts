export interface mapboxTrainData extends Omit<trainData, 'stations'> {
  stations: string
}

interface mapboxFiveOneOneVehicleActivity
  extends Omit<FiveOneOneVehicleActivity, 'MonitoredVehicleJourney'> {
  MonitoredVehicleJourney: string
}
