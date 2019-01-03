import {createAction} from '../../actionHelper';
import {fetchDataFromUrl} from '../../../rest/restUtils';
import {isNil, upperFirst} from 'lodash';
import { IEmissionData } from '../../../models/results';

export enum ResultsActionTypes {
  SAVE_COUNTRY_NAME = 'results/SAVE_COUNTRY_NAME',
  FETCH_DATA_EXECUTING = 'results/FETCH_DATA_EXECUTING',
  FETCH_DATA_SUCCESS = 'results/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'results/FETCH_DATA_FAILURE',
  CONVERT_DATA_SUCCESS = 'results/CONVERT_DATA_SUCCESS',
  CLEAR_COUNTRY_FROM_CHART = 'results/CLEAR_COUNTRY_FROM_CHART',
  CONFIRM_ERROR = 'results/CONFIRM_ERROR'
}

export const saveCountryName = (country: string) =>
  createAction(ResultsActionTypes.SAVE_COUNTRY_NAME, upperFirst(country));

export const fetchDataExecuting = () =>
  createAction(ResultsActionTypes.FETCH_DATA_EXECUTING);

export const fetchDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_DATA_SUCCESS, data);

export const convertDataSuccess = data =>
  createAction(ResultsActionTypes.CONVERT_DATA_SUCCESS, data);

export const fetchDataFailure = () =>
  createAction(ResultsActionTypes.FETCH_DATA_FAILURE);

export const clearCountryFromChart = (country: string) =>
  createAction(ResultsActionTypes.CLEAR_COUNTRY_FROM_CHART, country);

export const confirmError = () =>
  createAction(ResultsActionTypes.CONFIRM_ERROR);

export const getEmissionData = (endpoint: string, country: string) => {
  return async (dispatch: any): Promise<any> => {
    dispatch(fetchDataExecuting());
    return fetchDataFromUrl(endpoint, country)
      .then(emissionData => {
        if (isNil(emissionData[1])) {
          dispatch(fetchDataFailure());
        }
        dispatch(fetchDataSuccess(emissionData));
      })
      .catch(e => dispatch(fetchDataFailure()));
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
      .catch(e => dispatch(fetchDataFailure()));
  };
};
