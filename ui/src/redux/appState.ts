import {ISearchReduxState} from './modules/Search/searchReducer';
import {IResultsReduxState} from './modules/Results/resultsReducer';

export interface IAppState {
  search: ISearchReduxState;
  results: IResultsReduxState;
}
