import {createAction} from '../../actionHelper';
import {fetchDataFromUrl, EMISSIONS_ENDPOINT} from '../../../rest/restUtils';

export enum ResultsActionTypes {
  FETCH_DATA_EXECUTING = 'results/FETCH_DATA_EXECUTING',
  FETCH_DATA_SUCCESS = 'results/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE = 'results/FETCH_DATA_FAILURE'
}

export const fetchDataExecuting = () =>
  createAction(ResultsActionTypes.FETCH_DATA_EXECUTING);

export const fetchDataSuccess = data =>
  createAction(ResultsActionTypes.FETCH_DATA_SUCCESS, data);

export const fetchDataFailure = () =>
  createAction(ResultsActionTypes.FETCH_DATA_FAILURE);

export const getEmissionData = (country: string) => {
  return dispatch => {
    dispatch(fetchDataExecuting());
    return fetchDataFromUrl(EMISSIONS_ENDPOINT, country)
      .then(emissions => dispatch(fetchDataSuccess(emissions))
    );
  };
};
