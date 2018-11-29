import * as React from 'react';
import {Header} from './components/Header/Header';
import Search from './components/Search/Search';
import {Provider} from 'react-redux';
import {configureStore} from './redux/store';

const store = configureStore();

export default class App extends React.Component<any> {
  public render() {
    return (
      <Provider store={store}>
        <div className='app-container'>
          <Header title='CO2 emissions' />
          <Search />
        </div>
      </Provider>
    );
  }
}
