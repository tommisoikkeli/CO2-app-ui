import * as React from 'react';
import {Header} from './components/Header/Header';
import {Search} from './components/Search/Search';

export default class App extends React.Component<any> {
  public render() {
    return (
      <div className='app-container'>
        <Header title='CO2 emissions' />
        <Search />
      </div>
    );
  }
}
