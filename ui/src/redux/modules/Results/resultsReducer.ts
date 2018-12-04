import {ResultsActionTypes} from './resultsActions';

export interface IResultsReduxState {
  emissionsForCountry: any;
  loading: boolean;
}

const initialState: IResultsReduxState = {
  emissionsForCountry: [],
  loading: false
};

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ResultsActionTypes.FETCH_DATA_EXECUTING:
      return {
        ...state,
        loading: true
      };
    case ResultsActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        emissionsForCountry: action.payload
      };
    case ResultsActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        emissionsForCountry: []
      };
    default:
      return state;
  }
};
