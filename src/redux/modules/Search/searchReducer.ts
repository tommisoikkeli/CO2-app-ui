import {SearchActionTypes} from './searchActions';
import {isEmpty} from 'lodash';
import {getSuggestedCountries} from './searchUtils';
import {ISearchReduxState} from '../../../models/search';

const initialState: ISearchReduxState = {
  filteredCountries: []
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
