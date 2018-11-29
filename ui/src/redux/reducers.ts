import {combineReducers} from 'redux';
import {searchReducer} from './modules/Search/searchReducer';

export const rootReducer = combineReducers({
  search: searchReducer
});
