import * as React from 'react';
import {TextInput} from '../TextInput/TextInput';
import {Button, ButtonType} from '../Button/Button';
import {Checkbox} from '../Checkbox/Checkbox';
import {filterCountries} from '../../redux/modules/Search/searchActions';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {Suggestions} from './Suggestions';
import {IAppState} from '../../redux/appState';
import {getEmissionData, convertData, saveCountryName} from '../../redux/modules/Results/resultsActions';
import {EMISSIONS_ENDPOINT, PER_CAPITA_ENDPOINT} from '../../rest/restUtils';
import {ErrorModal} from '../ErrorModal/ErrorModal';

const MAX_COUNTRIES_IN_CHART = 4;

interface IStateProps {
  suggestions: string[];
  searchedCountries: string[];
}

interface IDispatchProps {
  suggestCountries: (searchTerm: string) => void;
  saveCountryName: (searchTerm: string) => void;
  getEmissionData: (endpoint: string, country: string) => Promise<void>;
  convertData: (endpoint: string, countries: string[]) => Promise<void>;
}

type ISearchProps = IStateProps & IDispatchProps;

interface ISearchState {
  value: string;
  suggestionsVisible: boolean;
  checkboxChecked: boolean;
  errorModalVisible: boolean;
}

const mapStateToProps = (state: IAppState): IStateProps => ({
  suggestions: state.search.filteredCountries,
  searchedCountries: state.results.searchedCountries
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  suggestCountries: (searchTerm: string) => dispatch(filterCountries(searchTerm)),
  saveCountryName: (searchTerm: string) => dispatch(saveCountryName(searchTerm)),
  getEmissionData: (endpoint: string, country: string) => dispatch(getEmissionData(endpoint, country)),
  convertData: (endpoint: string, countries: string[]) => dispatch(convertData(endpoint, countries))
});

export class Search extends React.Component<ISearchProps, ISearchState> {
  public state: ISearchState = {
    value: '',
    suggestionsVisible: false,
    checkboxChecked: false,
    errorModalVisible: false
  };

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
      this.props.suggestCountries(this.state.value);
    } else {
      this.setState({suggestionsVisible: false});
    }
  }, 300);

  private isSearchLengthOverOne = (): boolean => this.state.value.length > 1;

  private onSuggestionItemsClick = (item: string): void => {
    this.setState({
      value: item,
      suggestionsVisible: false
    });
  }

  private onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({checkboxChecked: !this.state.checkboxChecked}, () => {
      if (this.state.checkboxChecked) {
        this.props.convertData(PER_CAPITA_ENDPOINT, this.props.searchedCountries);
      } else {
        this.props.convertData(EMISSIONS_ENDPOINT, this.props.searchedCountries);
      }
    });
  };

  private getDataFromSearch = (): void => {
    const {value, checkboxChecked} = this.state;
    this.setState({suggestionsVisible: false});
    this.props.saveCountryName(value);
    if (checkboxChecked) {
      this.props.getEmissionData(PER_CAPITA_ENDPOINT, value);
    } else {
      this.props.getEmissionData(EMISSIONS_ENDPOINT, value);
    }
  }

  private isLineChartOnLimit = () => this.props.searchedCountries.length === MAX_COUNTRIES_IN_CHART;

  private renderErrorModal = (): JSX.Element => (
    <ErrorModal
      content='Too many entries! Delete a country from the chart in order to add a new one.'
      isOpen={this.state.errorModalVisible}
      onCloseClick={() => this.setState({errorModalVisible: false})}/>
  );

  private onSearchClick = (): void => {
    if (this.isLineChartOnLimit()) {
      this.setState({errorModalVisible: true});
    } else {
      this.getDataFromSearch();
    }
  }

  private renderCheckbox = (): JSX.Element | null => {
    return this.props.searchedCountries.length ? (
      <div className='checkbox-wrapper'>
        <Checkbox
          name='search-checkbox'
          label='Per capita'
          onChange={this.onCheckboxChange}
          checked={this.state.checkboxChecked}
        />
      </div>
    ) : null;
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
              onItemClick={item => this.onSuggestionItemsClick(item)}/>
          </div>
          <Button
            text='Search'
            type={ButtonType.DEFAULT}
            onClick={this.onSearchClick}
            className='search-button'
            disabled={!this.isSearchLengthOverOne()}
          />
        </div>
        {this.renderCheckbox()}
        {this.renderErrorModal()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
