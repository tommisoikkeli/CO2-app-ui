import {createAction} from '../../actionHelper';
import {fetchDataFromUrl} from '../../../rest/restUtils';

export enum ResultsActionTypes {
  SAVE_COUNTRY_NAME = 'results/SAVE_COUNTRY_NAME',
  FETCH_DATA_EXECUTING = 'results/FETCH_DATA_EXECUTING',
  FETCH_DATA_SUCCESS = 'results/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'results/FETCH_DATA_FAILURE',
  CONVERT_DATA_SUCCESS = 'results/CONVERT_DATA_SUCCESS',
  CLEAR_COUNTRY_FROM_CHART = 'results/CLEAR_COUNTRY_FROM_CHART'
}

export const saveCountryName = (country: string) =>
  createAction(ResultsActionTypes.SAVE_COUNTRY_NAME, country);

export const fetchDataExecuting = () =>
  createAction(ResultsActionTypes.FETCH_DATA_EXECUTING);

export const fetchDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_DATA_SUCCESS, data);

export const convertDataSuccess = data =>
  createAction(ResultsActionTypes.CONVERT_DATA_SUCCESS, data);

export const fetchDataFailure = error =>
  createAction(ResultsActionTypes.FETCH_DATA_FAILURE, error);

export const clearCountryFromChart = (country: string) =>
  createAction(ResultsActionTypes.CLEAR_COUNTRY_FROM_CHART, country);

export const getEmissionData = (endpoint: string, country: string) => {
  return async (dispatch: any): Promise<any> => {
    dispatch(fetchDataExecuting());
    return fetchDataFromUrl(endpoint, country)
      .then(emissions => dispatch(fetchDataSuccess(emissions)))
      .catch(e => dispatch(fetchDataFailure(e)));
  };
};

export const convertData = (endpoint: string, countries: string[]) => {
  const requests = countries.map(country =>
    fetchDataFromUrl(endpoint, country)
  );
  return async (dispatch: any): Promise<any> => {
    dispatch(fetchDataExecuting());
    return Promise.all(requests)
      .then(emissions => dispatch(convertDataSuccess(emissions)))
      .catch(e => dispatch(fetchDataFailure(e)));
  };
};
