import {createAction} from '../../actionHelper';

export enum SearchActionTypes {
  FILTER_COUNTRIES = 'search/FILTER_COUNTRIES',
  SEARCH_DATA_FOR_COUNTRY = 'search/SEARCH_DATA_FOR_COUNTRY'
}

export const filterCountries = (searchTerm: string) =>
  createAction(SearchActionTypes.FILTER_COUNTRIES, searchTerm);

export const searchDataForCountry = (searchTerm: string) =>
  createAction(SearchActionTypes.SEARCH_DATA_FOR_COUNTRY, searchTerm);
