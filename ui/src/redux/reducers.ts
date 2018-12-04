import {combineReducers} from 'redux';
import {searchReducer} from './modules/Search/searchReducer';
import { resultsReducer } from './modules/Results/resultsReducer';

export const rootReducer = combineReducers({
  search: searchReducer,
  results: resultsReducer
});
