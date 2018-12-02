import {createAction} from '../../actionHelper';

export enum SearchActionTypes {
  FILTER_COUNTRIES = 'search/FILTER_COUNTRIES',
  FETCH_DATA_EXECUTING = 'search/FETCH_DATA_EXECUTING',
  FETCH_DATA_SUCCESS = 'search/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'search/FETCH_DATA_FAILURE'
}

export const filterCountries = (searchTerm: string) =>
  createAction(SearchActionTypes.FILTER_COUNTRIES, searchTerm);

export const fetchDataExecuting = createAction(SearchActionTypes.FETCH_DATA_EXECUTING);
