import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from './reducers';
import thunk from 'redux-thunk';
import * as Redux from 'redux';

export const configureStore = (): Redux.Store<any> => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)) ||
    compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
