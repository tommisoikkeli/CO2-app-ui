import * as React from 'react';
import TextInput from './components/TextInput/TextInput';

interface IAppProps {
  name?: string;
}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="app-container">
        <TextInput placeholder="Search for a country"/>
      </div>
    );
  }
}
