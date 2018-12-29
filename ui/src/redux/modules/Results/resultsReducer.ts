import {ResultsActionTypes} from './resultsActions';;
import {reduceResponse} from './resultsUtils';

export interface IResultsReduxState {
  searchedCountries: string[];
  emissionData: IEmissionData[];
  loading: boolean;
}

export interface IEmissionData {
  country: string;
  indicator: string;
  entries: IDataEntry[];
}

interface IDataEntry {
  date: string;
  value: number;
}

const initialState: IResultsReduxState = {
  searchedCountries: [],
  emissionData: [],
  loading: false
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
        totalEmissionsForCountries: []
      };
    case ResultsActionTypes.CLEAR_COUNTRY_FROM_CHART:
      return {
        ...state,
        searchedCountries: state.searchedCountries.filter(
          country => country !== action.payload
        ),
        emissionData: state.emissionData.filter(
          entry => entry.country !== action.payload
        )
      };
    default:
      return state;
  }
};
