export interface USCrossingData {
  OBJECTID?: number
  CROSSING?: string
  EFFDATE?: string
  EDATE?: string
  REASON?: string
  StateCode?: number
  CountyCode?: number
  STCYFIPS?: string
  CITYCD?: string
  RAILROAD?: string
  RRDIV?: string
  RRSUBDIV?: string
  HIGHWAY?: string
  STREET?: string
  TTSTN?: string
  MILEPOST?: string
  TYPEXING?: string
  POSXING?: string
  PRVCAT?: string
  PRVIND?: string
  PRVSIGN?: string
  INIT?: string
  LATITUDE?: number
  LONGITUD?: number
  LLSOURCE?: string
  WHISTBAN?: string
  RRCONT?: string
  POLCONT?: string
  INV_LINK?: string
  ACC_LINK?: string
  TTSTNNAM?: string
  XPURPOSE?: string
  OPERATINGR?: string
  DAYTHRU?: number
  NGHTTHRU?: number
  MAINTRK?: number
  SIDINGTRK?: number
  YARDTRK?: number
  TRANSITTRK?: number
  INDUSTRYTR?: number
  OTHRTRK?: number
  REVISIONDA?: string
  LASTUPDATE?: string
  AADT?: string
  AADTYEAR?: string
  STATENAME?: string
  STATEAB?: string
  COUNTYNAME?: string
  CITYNAME?: string
  LATDD?: number
  LONGDD?: number
}

export interface USBridgeData {
  ID?: string
  SECCLASS?: string
  NAME?: string
  CITY?: string
  STATE?: string
  ZIP?: string
  COUNTY?: string
  FIPS?: string
  DIRECTIONS?: string
  EMERGTITLE?: string
  EMERGTEL?: string
  EMERGEXT?: string
  CONTDATE?: string
  CONTHOW?: string
  GEODATE?: string
  GEOHOW?: string
  HSIPTHEMES?: string
  NAICSCODE?: string
  NAICSDESCR?: string
  GEOLINKID?: string
  X?: number
  Y?: number
  ST_VENDOR?: string
  ST_VERSION?: string
  GEOPREC?: string
  QC_QA?: string
  NRRN_ID?: string
  LINK_ID?: string
  RAILWAY_NM?: string
  NTAD_ID?: string
  OAK_ID?: string
  COM_ID?: number
  FDATE?: string
  GNIS_ID?: string
  GNIS_NAME?: string
  FTYPE?: number
  FCODE?: number
  FEATURE_TY?: string
  DESCRIPTIO?: string
  REACHCODE?: string
  FLOWDIR?: number
  STATE_CODE?: string
  STRUCT_NUM?: string
  INV_ROUTE?: string
  HWYAGDIST?: string
  CNTY_CODE?: string
  PLACE_CODE?: string
  FEAT_INTER?: string
  FACCARIED?: string
  LOCATION?: string
  MINVERTINR?: string
  KM_POINT?: string
  BASHWYNTWK?: string
  LRS_INVRTE?: string
  QLATITUDE?: string
  QLONGITUDE?: string
  DETOURLGTH?: string
  TOLL?: string
  MAINTNCE?: string
  OWNER?: string
  CLASINVRTE?: string
  YEAR_BUILT?: string
  LNSONUNDR?: string
  AVEDAYTRAF?: string
  YRAVEDTRAF?: string
  DESIGNLOAD?: string
  APPRRDWDTH?: string
  BRDGMEDIAN?: string
  SKEW?: string
  STRUCFLARE?: string
  TRFSFTYFET?: string
  HISTSIGNIF?: string
  NAVCONTROL?: string
  NAVVERTCLR?: string
  NAVHORZCLR?: string
  STRUCSTAT?: string
  TYPEOFSVC?: string
  STRTYPMAIN?: string
  STRTYPAPSP?: string
  NUMSPNMAIN?: string
  NUMAPPRSPN?: string
  IRTEHORZCL?: string
  LGTHMAXSPN?: string
  STRUCTLGTH?: string
  CRBSDWKWID?: string
  BRDGRDWDTH?: string
  DECKWDTH?: string
  MINVERTOBR?: string
  MINVERTUCL?: string
  MINLATUCLR?: string
  MINLATUCLL?: string
  DECK?: string
  SUPERSTRUC?: string
  SUBSTRUCT?: string
  CHANPROTEC?: string
  CULVERTS?: string
  METHOPRATE?: string
  OP_RATE?: string
  METHINVRAT?: string
  INV_RATE?: string
  STRUCTEVAL?: string
  DECKGEOMET?: string
  UCLVERTHOR?: string
  BRDGPOSTNG?: string
  H2OWYADEQU?: string
  APRRDALIGN?: string
  WORK_TYPE?: string
  LGTHSTRIMP?: string
  INSPCTDATE?: string
  INSPCTFRQU?: string
  CRFTINSPCT?: string
  CFINSPDATE?: string
  BRDGIMCOST?: string
  RDWYIMCOST?: string
  PROJCTCOST?: string
  YRIMCSTEST?: string
  BRDGBORDER?: string
  BRGBRDRNUM?: string
  STRAHNETHD?: string
  PARSTRDSGN?: string
  DIRTRAFFIC?: string
  TEMPSTRDES?: string
  HWYSYSIRTE?: string
  FEDLNDHWYS?: string
  YRRECONSTR?: string
  DECKSTRTYP?: string
  WEARSFRACE?: string
  AVDYTRCKTR?: string
  DSNNTINTWK?: string
  PIERPROTCT?: string
  NBISBRGLEN?: string
  SCRCRITBRG?: string
  FUTAVGTRAF?: string
  YRFUTAVGTR?: string
  MINAVERCLR?: string
  FEDAGENCY?: string
  WASHHQUSE?: string
  STATUS?: string
  ATSRKFLDSR?: string
  SUFFNCYRAT?: string
}

export interface CNCrossingData {
  Rank?: number;
  "TC Number"?: string;
  "Railway"?: string;
  Region?: string;
  Province?: string;
  Access?: string;
  Jurisdiction?: string;
  Mile?: number;
  Subdivision?: string;
  "Spur Mile"?: number;
  "Spur Name"?: string;
  Location?: string;
  Latitude?: number;
  Longitude?: number;
  "Road Authority"?: string;
  Protection?: string;
  Accident?: string;
  Facility?: string;
  Injury?: string;
  "Total Trains Daily"?: number;
  "Vehicles Daily"?: number;
  "Train Max Speed (mph)"?: number;
  "Road Speed (km/h)"?: number;
  Lanes?: number;
  Tracks?: number;
  Regulator?: string;
  Fatality?: number;
  "Urban Y/N"?: string;
}

export interface Station {
  id: number
  city2: string
  objectid: number
  state: string
  stfips: number
  stncode: string
  stnname: string
  urban: string
}

export interface CaltrainOnwardCall {
  StopPointRef: string
  StopPointName: string
  AimedArrivalTime: string
  AimedDepartureTime: string
  ExpectedArrivalTime: string
  ExpectedDepartureTime: string
}

export interface CaltrainApiResponse {
  RecordedAtTime: string
  ValidUntilTime: string
  MonitoredVehicleJourney: {
    LineRef: string
    DirectionRef: string
    FramedVehicleJourneyRef: {
      DataFrameRef: string
      DatedVehicleJourneyRef: string
    }
    PublishedLineName: string
    OperatorRef: string
    OriginRef: string
    OriginName: string
    DestinationRef: string
    DestinationName: string
    Monitored: boolean
    InCongestion?: boolean
    VehicleLocation: {
      Longitude: string
      Latitude: string
    }
    Bearing?: string
    Occupancy?: string
    VehicleRef?: string
    MonitoredCall?: {
      StopPointRef: string
      StopPointName: string
      VehicleLocationAtStop: string
      VehicleAtStop: string
      AimedArrivalTime: string
      AimedDepartureTime: string
      ExpectedArrivalTime: string
      ExpectedDepartureTime: string
    }
    OnwardCalls?: {
      OnwardCall: CaltrainOnwardCall[]
    }
  }
}