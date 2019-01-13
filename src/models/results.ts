export interface IResultsReduxState {
  searchedCountries: string[];
  emissionData: IEmissionData[];
  loading: boolean;
  hasErrored: boolean;
}

export interface IEmissionData {
  country: string;
  indicator: string;
  iso3Code: string;
  entries: IDataEntry[];
}

export interface IDataEntry {
  date: string;
  value: number;
}

export interface IEmissionDataResponseEntry {
  indicator: IBasicResponseObject;
  country: IBasicResponseObject;
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  obs_status: string;
  decimal: number;
}

interface IBasicResponseObject {
  id: string;
  value: string;
}
