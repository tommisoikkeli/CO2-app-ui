import {createAction} from '../../actionHelper';
import {fetchDataFromUrl, EMISSIONS_ENDPOINT} from '../../../rest/restUtils';

export enum SearchActionTypes {
  FILTER_COUNTRIES = 'search/FILTER_COUNTRIES',
  FETCH_DATA_EXECUTING = 'search/FETCH_DATA_EXECUTING',
  FETCH_DATA_SUCCESS = 'search/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'search/FETCH_DATA_FAILURE'
}

export const filterCountries = (searchTerm: string) =>
  createAction(SearchActionTypes.FILTER_COUNTRIES, searchTerm);

export const fetchDataExecuting = () =>
  createAction(SearchActionTypes.FETCH_DATA_EXECUTING);

export const fetchDataSuccess = data =>
  createAction(SearchActionTypes.FETCH_DATA_SUCCESS, data);

export const fetchDataFailure = () =>
  createAction(SearchActionTypes.FETCH_DATA_FAILURE);

export const getEmissionData = (country: string) => {
  return dispatch => {
    dispatch(fetchDataExecuting());
    return fetchDataFromUrl(EMISSIONS_ENDPOINT, country)
      .then(emissions => dispatch(fetchDataSuccess(emissions))
    );
  };
};
