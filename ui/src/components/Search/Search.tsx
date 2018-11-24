import * as React from 'react';
import {TextInput} from '../TextInput/TextInput';
import {Button, ButtonType} from '../Button/Button';

interface ISearchState {
  value: string;
}

export default class Search extends React.Component<any, ISearchState> {
  public constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({value: event.target.value});
  };

  private onClearButtonClick = () => {
    this.setState({value: ''});
  };

  public render() {
    return (
      <div className='search'>
        <TextInput
          placeholder='Search for a country'
          value={this.state.value}
          onChange={event => this.onInputChange(event)}
          onClearButtonClick={this.onClearButtonClick}
        />
        <Button
          text='Search'
          type={ButtonType.DEFAULT}
          onClick={() => console.log('yaah')}
          className='search-button'
          disabled={this.state.value.length <= 0}
        />
      </div>
    );
  }
}
