import {SearchActionTypes} from './searchActions';
import {countries} from '../../../data/countries';
import {includes, isEmpty} from 'lodash';

export interface ISearchReduxState {
  filteredCountries: string[];
}

const initialState: ISearchReduxState = {
  filteredCountries: [],
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
    default:
      return state;
  }
};

const getSuggestedCountries = (searchTerm: string) =>
  countries.filter(country =>
    includes(country.toLowerCase(), searchTerm.toLowerCase())
  );
