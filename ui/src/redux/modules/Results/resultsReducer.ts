import {ResultsActionTypes} from './resultsActions';
import { isNull } from 'util';

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
        emissionsForCountry: [...state.emissionsForCountry, reduceResponse(action.payload[1])]
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

const reduceResponse = data => {
  const filteredData = data.filter(item => !isNull(item.value));
  const reduced = filteredData.reduce((acc, item) => {
    acc.push({date: item.date, value: item.value});
    return acc;
  }, []);
  return {
    key: data[0].country.value,
    entries: reduced
  }
}
