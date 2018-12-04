import {SearchActionTypes} from './searchActions';
import {countries} from '../../../data/countries';
import {includes, isEmpty} from 'lodash';

export interface ISearchReduxState {
  filteredCountries: string[];
  searchedCountry: string;
}

const initialState: ISearchReduxState = {
  filteredCountries: [],
  searchedCountry: ''
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
    case SearchActionTypes.SEARCH_DATA_FOR_COUNTRY:
      return {
        ...state,
        searchedCountry: action.payload
      };
    default:
      return state;
  }
};

const getSuggestedCountries = (searchTerm: string) =>
  countries.filter(country =>
    includes(country.toLowerCase(), searchTerm.toLowerCase())
  );
