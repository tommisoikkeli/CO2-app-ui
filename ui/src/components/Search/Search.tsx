import * as React from 'react';
import {TextInput} from '../TextInput/TextInput';
import {Button, ButtonType} from '../Button/Button';
import {Checkbox} from '../Checkbox/Checkbox';
import {filterCountries} from '../../redux/modules/Search/searchActions';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {Suggestions} from './Suggestions';
import {IAppState} from '../../redux/appState';

interface ISearchProps {
  suggestions: string[];
  suggestCountries: (searchTerm: string) => void;
}

interface ISearchState {
  value: string;
  checkboxChecked: boolean;
  suggestionsVisible: boolean;
}

const mapStateToProps = (state: IAppState) => ({
  suggestions: state.search.filteredCountries
});

const mapDispatchToProps = (dispatch) => ({
  suggestCountries: (searchTerm: string) => dispatch(filterCountries(searchTerm))
});

class Search extends React.Component<ISearchProps, ISearchState> {
  public constructor(props) {
    super(props);
    this.state = {
      value: '',
      checkboxChecked: false,
      suggestionsVisible: false
    };
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({value: event.target.value});
    this.getSuggestions();
  };

  private onClearButtonClick = (): void => {
    this.setState({
      value: '',
      suggestionsVisible: false
    });
    this.getSuggestions();
  };

  private onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({checkboxChecked: !this.state.checkboxChecked});
  };

  private getSuggestions = debounce(() => {
    if (this.isSearchLengthOverOne()) {
      this.setState({suggestionsVisible: true});
    } else {
      this.setState({
        suggestionsVisible: false
      });
    }
    const {value} = this.state;
    this.isSearchLengthOverOne() && this.props.suggestCountries(value);
  }, 300);

  private isSearchLengthOverOne = () => this.state.value.length > 1;

  private onSuggestionItemsClick = (item: string): void => {
    this.setState({
      value: item,
      suggestionsVisible: false
    });
  }

  public render() {
    return (
      <div className='search'>
        <div className='input-block'>
          <div className='search-and-suggestions'>
            <TextInput
              placeholder='Search for a country'
              value={this.state.value}
              onChange={event => this.onInputChange(event)}
              onClearButtonClick={this.onClearButtonClick}
            />
            <Suggestions items={this.props.suggestions}
              isVisible={this.state.suggestionsVisible}
              onItemClick={event => this.onSuggestionItemsClick(event)}/>
          </div>
          <Button
            text='Search'
            type={ButtonType.DEFAULT}
            onClick={() => console.log('yaah')}
            className='search-button'
            disabled={!this.isSearchLengthOverOne()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
