export interface _any extends BaseType {
  content: any;
}

export interface _boolean extends BaseType {
  content: boolean;
}

export interface _Date extends BaseType {
  content: Date;
}

export interface _number extends BaseType {
  content: number;
}

export interface _string extends BaseType {
  content: string;
}

// Source files:
// http://localhost/location2.xsd

interface BaseType {
  _exists: boolean;
  _namespace: string;
}
/** Element denoting the cloudiness in percent or eights. */
interface _cloudiness extends BaseType {
  eights?: number;
  id?: string;
  percent?: string;
}
export interface cloudiness extends _cloudiness {
  constructor: { new (): cloudiness };
}
export var cloudiness: { new (): cloudiness };

type cloudinessEightsType = number;
type _cloudinessEightsType = _number;

interface _groundcover extends BaseType {
  id?: string;
  name?: string;
  number: number;
}
export interface groundcover extends _groundcover {
  constructor: { new (): groundcover };
}
export var groundcover: { new (): groundcover };

type groundcoverNumberType = number;
type _groundcoverNumberType = _number;

/** Element containing weather parameters for this location */
interface _locationType extends BaseType {
  altitude?: string;
  country?: string;
  county?: string;
  id?: string;
  latitude?: string;
  longitude?: string;
  name?: string;
  stationid?: number;
  areaMaxWindSpeed?: windspeed[];
  bias?: unit_value[];
  cloudiness?: cloudiness[];
  currentDirection?: unit_value[];
  dewpointTemperature?: temperature[];
  fog?: cloudiness[];
  forestFire?: locationTypeForestFireType[];
  groundCover?: groundcover[];
  highClouds?: cloudiness[];
  highestTemperature?: temperature[];
  humidity?: unit_value[];
  lowClouds?: cloudiness[];
  lowestTemperature?: temperature[];
  maximumPrecipitation?: precipitation[];
  maxTemperature?: temperature[];
  maxTemperatureDay?: temperature[];
  maxTemperatureNight?: temperature[];
  maxWaveHeight?: unit_value[];
  maxWindSpeed?: windspeed[];
  meanabsoluteerror?: unit_value[];
  mediumClouds?: cloudiness[];
  minTemperature?: temperature[];
  minTemperatureDay?: temperature[];
  minTemperatureNight?: temperature[];
  numberofobservations?: unit_value[];
  precipitation?: precipitation[];
  pressure?: pressure[];
  score?: score[];
  snowDepth?: locationTypeSnowDepthType[];
  stateOfTheSea?: locationTypeStateOfTheSeaType[];
  surfaceTemperature?: unit_value[];
  symbol?: locationTypeSymbolType[];
  symbolProbability?: unit_value[];
  temperature?: temperature[];
  temperatureProbability?: unit_value[];
  tidalwater?: tidalwater[];
  uv?: uv[];
  waveDirection?: unit_value[];
  waveHeight?: unit_value[];
  wavePeriod?: unit_value[];
  weather?: locationTypeWeatherType[];
  windDirection?: locationTypeWindDirectionType[];
  windGust?: windspeed[];
  windProbability?: unit_value[];
  windSpeed?: windspeed[];
}
export interface locationType extends _locationType {
  constructor: { new (): locationType };
}
export var locationType: { new (): locationType };

interface _locationTypeForestFireType extends BaseType {
  unit: string;
  value: string;
}
interface locationTypeForestFireType extends _locationTypeForestFireType {
  constructor: { new (): locationTypeForestFireType };
}

interface _locationTypeSnowDepthType extends BaseType {
  cm: number;
  id?: string;
}
interface locationTypeSnowDepthType extends _locationTypeSnowDepthType {
  constructor: { new (): locationTypeSnowDepthType };
}

type locationTypeSnowDepthTypeCmType = number;
type _locationTypeSnowDepthTypeCmType = _number;

interface _locationTypeStateOfTheSeaType extends BaseType {
  id?: string;
  meter?: string;
  name?: string;
  number: number;
}
interface locationTypeStateOfTheSeaType extends _locationTypeStateOfTheSeaType {
  constructor: { new (): locationTypeStateOfTheSeaType };
}

type locationTypeStateOfTheSeaTypeNumberType = number;
type _locationTypeStateOfTheSeaTypeNumberType = _number;

interface _locationTypeSymbolType extends BaseType {
  id?: string;
  name?: string;
  number: number;
}
interface locationTypeSymbolType extends _locationTypeSymbolType {
  constructor: { new (): locationTypeSymbolType };
}

/** Element denoting a weather symbol by name or number. */
interface _locationTypeWeatherType extends BaseType {
  id?: string;
  name?: string;
  number: number;
  symbol?: number;
}
interface locationTypeWeatherType extends _locationTypeWeatherType {
  constructor: { new (): locationTypeWeatherType };
}

type locationTypeWeatherTypeNameType = string;
type _locationTypeWeatherTypeNameType = _string;

type locationTypeWeatherTypeNumberType = number;
type _locationTypeWeatherTypeNumberType = _number;

/** Element denoting the wind direction by angle or
 * compass direction. */
interface _locationTypeWindDirectionType extends BaseType {
  deg: number;
  id?: string;
  name?: string;
}
interface locationTypeWindDirectionType extends _locationTypeWindDirectionType {
  constructor: { new (): locationTypeWindDirectionType };
}

type locationTypeWindDirectionTypeDegType = number;
type _locationTypeWindDirectionTypeDegType = _number;

type locationTypeWindDirectionTypeNameType = string;
type _locationTypeWindDirectionTypeNameType = _string;

/** Element for naming the
 * forecast models used, and the respective time
 * intervals for each of them. */
interface _metaType extends BaseType {
  licenseurl?: string;
  model: modelType[];
}
export interface metaType extends _metaType {
  constructor: { new (): metaType };
}
export var metaType: { new (): metaType };

interface _modelType extends BaseType {
  from: string;
  name: string;
  nextrun: string;
  runended: string;
  termin: string;
  to: string;
}
export interface modelType extends _modelType {
  constructor: { new (): modelType };
}
export var modelType: { new (): modelType };

/** Element denoting the precipitation in mm. */
interface _precipitation extends BaseType {
  id?: string;
  maxvalue?: number;
  minvalue?: number;
  probability?: number;
  unit: string;
  value: number;
}
export interface precipitation extends _precipitation {
  constructor: { new (): precipitation };
}
export var precipitation: { new (): precipitation };

type precipitationValueType = number;
type _precipitationValueType = _number;

interface _pressure extends BaseType {
  id?: string;
  unit: string;
  value: number;
}
export interface pressure extends _pressure {
  constructor: { new (): pressure };
}
export var pressure: { new (): pressure };

type pressureValueType = number;
type _pressureValueType = _number;

/** Element describing a weatherproduct by
 * time-elements, location-elements and a set of weather-elements. */
interface _productType extends BaseType {
  class: productTypeClassType;
  time: timeType[];
}
export interface productType extends _productType {
  constructor: { new (): productType };
}
export var productType: { new (): productType };

type productTypeClassType =
  | "pointData"
  | "extremes"
  | "forestfireindex"
  | "uvforecast"
  | "tidalwater"
  | "buoy"
  | "stavernodden"
  | "seaapproachforecast"
  | "temperatureverification";
interface _productTypeClassType extends _string {
  content: productTypeClassType;
}

interface _score extends BaseType {
  good: number;
  mediocre: number;
  overall: number;
  unit: string;
  very_good: number;
}
export interface score extends _score {
  constructor: { new (): score };
}
export var score: { new (): score };

interface _temperature extends BaseType {
  id?: string;
  unit: string;
  value: number;
}
export interface temperature extends _temperature {
  constructor: { new (): temperature };
}
export var temperature: { new (): temperature };

interface _tidalwater extends BaseType {
  tidal: number;
  unit: string;
  weathercorrection?: number;
}
export interface tidalwater extends _tidalwater {
  constructor: { new (): tidalwater };
}
export var tidalwater: { new (): tidalwater };

/** Element containing forecasts
 * for the specified time and duration. */
interface _timeType extends BaseType {
  datatype?: timeTypeDatatypeType;
  from: Date;
  to: Date;
  location: locationType[];
}
export interface timeType extends _timeType {
  constructor: { new (): timeType };
}
export var timeType: { new (): timeType };

type timeTypeDatatypeType = "observation" | "forecast";
interface _timeTypeDatatypeType extends _string {
  content: timeTypeDatatypeType;
}

interface _unit_value extends BaseType {
  unit: string;
  value: number;
}
export interface unit_value extends _unit_value {
  constructor: { new (): unit_value };
}
export var unit_value: { new (): unit_value };

interface _uv extends BaseType {
  albedo: unit_value;
  cloudcover: unit_value;
  ozon: unit_value;
  snowcover: unit_value;
  solar_zenith: unit_value;
  uvi_clear: unit_value;
  uvi_cloudy: unit_value;
  uvi_forecast: unit_value;
  uvi_partly_cloudy: unit_value;
}
export interface uv extends _uv {
  constructor: { new (): uv };
}
export var uv: { new (): uv };

/** Schema to be used for
 * presenting weather parameters for specific locations. */
interface _WeatherdataType extends BaseType {
  created: Date;
  meta?: metaType;
  product?: productType[];
}
interface WeatherdataType extends _WeatherdataType {
  constructor: { new (): WeatherdataType };
}

/** Element denoting the wind speed by name, at 10 m above ground,
 * in meters per second or the Beaufort scale. */
interface _windspeed extends BaseType {
  beaufort?: number;
  id?: string;
  mps: number;
  name?: string;
}
export interface windspeed extends _windspeed {
  constructor: { new (): windspeed };
}
export var windspeed: { new (): windspeed };

type windspeedBeaufortType = number;
type _windspeedBeaufortType = _number;

type windspeedMpsType = number;
type _windspeedMpsType = _number;

type windspeedNameType = string;
type _windspeedNameType = _string;

export interface document extends BaseType {
  weatherdata: WeatherdataType;
}
export var document: document;
