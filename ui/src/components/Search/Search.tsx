import * as React from 'react';
import {TextInput} from '../TextInput/TextInput';
import {Button, ButtonType} from '../Button/Button';
import {Checkbox} from '../Checkbox/Checkbox';

interface ISearchState {
  value: string;
  checkboxChecked: boolean;
}

export default class Search extends React.Component<any, ISearchState> {
  public constructor(props) {
    super(props);
    this.state = {
      value: '',
      checkboxChecked: false
    };
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({value: event.target.value});
  };

  private onClearButtonClick = (): void => {
    this.setState({value: ''});
  };

  private onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({checkboxChecked: !this.state.checkboxChecked});
  };

  public render() {
    return (
      <div className='search'>
        <div className='input-block'>
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
        <div className='search-checkbox-wrapper'>
          <Checkbox
            name='search-checkbox'
            label='Per capita'
            onChange={this.onCheckboxChange}
            checked={this.state.checkboxChecked}
          />
        </div>
      </div>
    );
  }
}
