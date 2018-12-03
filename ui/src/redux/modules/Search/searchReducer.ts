import {SearchActionTypes} from './searchActions';
import {countries} from '../../../data/countries';
import {includes, isEmpty} from 'lodash';

export interface ISearchReduxState {
  filteredCountries: string[];
  emissionsForCountry: any;
  loading: boolean;
}

const initialState: ISearchReduxState = {
  filteredCountries: [],
  emissionsForCountry: [],
  loading: false
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.FILTER_COUNTRIES:
      const filteredCountries = !isEmpty(action.payload)
        ? getSuggestedCountries(action.payload)
        : [];
      return {
        ...state,
        filteredCountries
      };
    case SearchActionTypes.FETCH_DATA_EXECUTING:
      return {
        ...state,
        loading: true
      };
    case SearchActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        emissionsForCountry: action.payload
      };
    case SearchActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        emissionsForCountry: []
      }
    default:
      return state;
  }
};

const getSuggestedCountries = (searchTerm: string) =>
  countries.filter(country =>
    includes(country.toLowerCase(), searchTerm.toLowerCase())
  );
