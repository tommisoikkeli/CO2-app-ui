import {ResultsActionTypes} from './resultsActions';
import {isNull} from 'util';

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

const reduceResponse = data => {
  const filteredData = data.filter(item => !isNull(item.value));
  const reduced = filteredData.reduce((acc, item) => {
    return [...acc, {date: item.date, value: item.value}];
  }, []);
  const countryName = isUnitedStates(data[0].country.value)
    ? 'United States of America'
    : data[0].country.value;
  return {
    country: countryName,
    indicator: data[0].indicator.value,
    entries: reduced
  };
};

// This horrible function checks if the searched country is United States.
// The world bank API must be requested with the name 'United states of america' but in the response the country name is 'United States'.
// This causes deleting this particular country from the line chart to not work since the names do not match.
// I am not proud of this but at least this way it works ¯\_(ツ)_/¯
const isUnitedStates = (countryName: string) => countryName === 'United States';
