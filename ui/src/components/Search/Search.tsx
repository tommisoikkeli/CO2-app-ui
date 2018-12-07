import * as React from 'react';
import {TextInput} from '../TextInput/TextInput';
import {Button, ButtonType} from '../Button/Button';
import {filterCountries, searchDataForCountry} from '../../redux/modules/Search/searchActions';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {Suggestions} from './Suggestions';
import {IAppState} from '../../redux/appState';
import { getEmissionData } from '../../redux/modules/Results/resultsActions';

interface ISearchProps {
  suggestions: string[];
  suggestCountries: (searchTerm: string) => void;
  saveCountryName: (searchTerm: string) => void;
  getEmissionDataForCountry: (country: string) => void;
}

interface ISearchState {
  value: string;
  suggestionsVisible: boolean;
}

const mapStateToProps = (state: IAppState) => ({
  suggestions: state.search.filteredCountries
});

const mapDispatchToProps = (dispatch) => ({
  suggestCountries: (searchTerm: string) => dispatch(filterCountries(searchTerm)),
  saveCountryName: (searchTerm: string) => dispatch(searchDataForCountry(searchTerm)),
  getEmissionDataForCountry: (country: string) => dispatch(getEmissionData(country))
});

export class Search extends React.Component<ISearchProps, ISearchState> {
  public constructor(props) {
    super(props);
    this.state = {
      value: '',
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

  private getSuggestions = debounce(() => {
    if (this.isSearchLengthOverOne()) {
      this.setState({suggestionsVisible: true});
    } else {
      this.setState({suggestionsVisible: false});
    }
    this.isSearchLengthOverOne() && this.props.suggestCountries(this.state.value);
  }, 300);

  private isSearchLengthOverOne = (): boolean => this.state.value.length > 1;

  private onSuggestionItemsClick = (item: string): void => {
    this.setState({
      value: item,
      suggestionsVisible: false
    });
  }

  private getDataFromSearchClick = () => {
    const {value} = this.state;
    this.setState({suggestionsVisible: false});
    this.props.saveCountryName(value);
    this.props.getEmissionDataForCountry(value);
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
            <Suggestions
              items={this.props.suggestions}
              isVisible={this.state.suggestionsVisible}
              onItemClick={event => this.onSuggestionItemsClick(event)}/>
          </div>
          <Button
            text='Search'
            type={ButtonType.DEFAULT}
            onClick={this.getDataFromSearchClick}
            className='search-button'
            disabled={!this.isSearchLengthOverOne()}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
