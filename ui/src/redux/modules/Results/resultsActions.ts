import {createAction} from '../../actionHelper';
import {fetchDataFromUrl} from '../../../rest/restUtils';

export enum ResultsActionTypes {
  FETCH_DATA_EXECUTING = 'results/FETCH_DATA_EXECUTING',
  FETCH_DATA_SUCCESS = 'results/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'results/FETCH_DATA_FAILURE'
}

export const fetchDataExecuting = () =>
  createAction(ResultsActionTypes.FETCH_DATA_EXECUTING);

export const fetchEmissionDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_DATA_SUCCESS, data);

export const fetchPopulationDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_DATA_SUCCESS, data);

export const fetchDataFailure = () =>
  createAction(ResultsActionTypes.FETCH_DATA_FAILURE);

export const getEmissionData = (endpoint: string, country: string) => {
  return dispatch => {
    dispatch(fetchDataExecuting());
    return fetchDataFromUrl(endpoint, country)
      .then(emissions => dispatch(fetchEmissionDataSuccess(emissions))
    );
  };
};
