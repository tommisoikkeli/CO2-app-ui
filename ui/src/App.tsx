import * as React from 'react';
import {Header} from './components/Header/Header';
import Search from './components/Search/Search';
import {Provider} from 'react-redux';
import {configureStore} from './redux/store';
import Results from './components/Results/Results';

const store = configureStore();

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className='app-container'>
          <Header title='CO2 emissions' />
          <Search />
          <Results />
        </div>
      </Provider>
    );
  }
}
