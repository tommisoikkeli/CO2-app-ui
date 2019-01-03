import {ISearchReduxState} from '../models/search';
import {IResultsReduxState} from '../models/results';

export interface IAppState {
  search: ISearchReduxState;
  results: IResultsReduxState;
}
