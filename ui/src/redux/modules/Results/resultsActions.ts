import {createAction} from '../../actionHelper';
import {
  fetchDataFromUrl,
  EMISSIONS_ENDPOINT,
  PER_CAPITA_ENDPOINT
} from '../../../rest/restUtils';

export enum ResultsActionTypes {
  FETCH_DATA_EXECUTING = 'results/FETCH_DATA_EXECUTING',
  FETCH_TOTAL_DATA_SUCCESS = 'results/FETCH_TOTAL_DATA_SUCCESS',
  FETCH_PC_DATA_SUCCESS = 'results/FETCH_PC_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'results/FETCH_DATA_FAILURE',
  CONVERT_FROM_PC_TO_TOTAL_SUCCESS = 'results/CONVERT_FROM_PC_TO_TOTAL_SUCCESS'
}

export const fetchDataExecuting = () =>
  createAction(ResultsActionTypes.FETCH_DATA_EXECUTING);

export const fetchEmissionDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_TOTAL_DATA_SUCCESS, data);

export const fetchPerCapitaDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_PC_DATA_SUCCESS, data);

export const convertFromPerCapitaToTotalSuccess = data =>
  createAction(ResultsActionTypes.CONVERT_FROM_PC_TO_TOTAL_SUCCESS, data);

export const fetchDataFailure = () =>
  createAction(ResultsActionTypes.FETCH_DATA_FAILURE);

export const getEmissionData = (country: string) => {
  return dispatch => {
    dispatch(fetchDataExecuting());
    return fetchDataFromUrl(EMISSIONS_ENDPOINT, country).then(emissions =>
      dispatch(fetchEmissionDataSuccess(emissions))
    );
  };
};

export const getEmissionsPerCapita = (countries: string[]) => {
  const requests = countries.map(country =>
    fetchDataFromUrl(PER_CAPITA_ENDPOINT, country)
  );
  return dispatch => {
    dispatch(fetchDataExecuting());
    return Promise.all(requests).then(emissions =>
      dispatch(fetchPerCapitaDataSuccess(emissions))
    );
  };
};

export const convertPerCapitaResultsToTotal = (countries: string[]) => {
  const requests = countries.map(country =>
    fetchDataFromUrl(EMISSIONS_ENDPOINT, country)
  );
  return dispatch => {
    dispatch(fetchDataExecuting());
    return Promise.all(requests).then(emissions =>
      dispatch(convertFromPerCapitaToTotalSuccess(emissions))
    );
  };
};
