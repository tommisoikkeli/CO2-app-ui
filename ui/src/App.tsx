import * as React from 'react';
import TextInput from './components/TextInput/TextInput';
import {Header} from './components/Header/Header';

export default class App extends React.Component<any> {
  public render() {
    return (
      <div className='app-container'>
        <Header title='CO2 Emissions' />
        <TextInput placeholder='Search for a country' />
      </div>
    );
  }
}
