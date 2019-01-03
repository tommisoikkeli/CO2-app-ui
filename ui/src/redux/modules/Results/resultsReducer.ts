import {ResultsActionTypes} from './resultsActions';
import {reduceResponse, filterSearchedCountries} from './resultsUtils';
import {without} from 'lodash';
import {IResultsReduxState} from '../../../models/results';

const initialState: IResultsReduxState = {
  searchedCountries: [],
  emissionData: [],
  loading: false,
  hasErrored: false
};

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ResultsActionTypes.SAVE_COUNTRY_NAME: {
      return {
        ...state,
        searchedCountries: [...state.searchedCountries, action.payload]
      };
    }
    case ResultsActionTypes.FETCH_DATA_EXECUTING:
      return {
        ...state,
        loading: true
      };
    case ResultsActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrored: false,
        emissionData: [...state.emissionData, reduceResponse(action.payload[1])]
      };
    case ResultsActionTypes.CONVERT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        emissionData: action.payload.map(data => reduceResponse(data[1]))
      };
    case ResultsActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrored: true
      };
    case ResultsActionTypes.CLEAR_COUNTRY_FROM_CHART:
      return {
        ...state,
        searchedCountries: filterSearchedCountries(action.payload, state.searchedCountries),
        emissionData: state.emissionData.filter(
          entry => entry.country !== action.payload
        )
      };
    case ResultsActionTypes.CONFIRM_ERROR:
      return {
        ...state,
        hasErrored: false,
        searchedCountries: without(
          state.searchedCountries,
          state.searchedCountries.pop()
        ) // removes the latest search that caused the error
      };
    default:
      return state;
  }
};
