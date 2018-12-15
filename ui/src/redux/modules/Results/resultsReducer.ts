import {ResultsActionTypes} from './resultsActions';
import {isNull} from 'util';
import {includes} from 'lodash';

export interface IResultsReduxState {
  searchedCountries: string[];
  totalEmissionsForCountries: any;
  emissionsPerCapita: any;
  loading: boolean;
  isPerCapita: boolean;
}

const initialState: IResultsReduxState = {
  searchedCountries: [],
  totalEmissionsForCountries: [],
  emissionsPerCapita: [],
  loading: false,
  isPerCapita: false
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
    case ResultsActionTypes.FETCH_TOTAL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        totalEmissionsForCountries: [
          ...state.totalEmissionsForCountries,
          reduceResponse(action.payload[1])
        ]
      };
    case ResultsActionTypes.FETCH_PC_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        emissionsPerCapita: action.payload.map(data => reduceResponse(data[1])),
        isPerCapita: true
      };
    case ResultsActionTypes.CONVERT_FROM_PC_TO_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        totalEmissionsForCountries: action.payload.map(data =>
          reduceResponse(data[1])
        ),
        isPerCapita: false
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
        totalEmissionsForCountries: state.totalEmissionsForCountries.filter(
          entry => entry.country !== action.payload
        ),
        emissionsPerCapita: state.emissionsPerCapita.filter(
          entry => entry.country !== action.payload
        )
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
    country: data[0].country.value,
    indicator: data[0].indicator.value,
    entries: reduced
  };
};
