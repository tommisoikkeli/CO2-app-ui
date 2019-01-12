import {createAction} from '../../actionHelper';

export enum SearchActionTypes {
  FILTER_COUNTRIES = 'search/FILTER_COUNTRIES',
}

export const filterCountries = (searchTerm: string) =>
  createAction(SearchActionTypes.FILTER_COUNTRIES, searchTerm);
