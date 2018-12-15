import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import LineChart from './LineChart/LineChart';
import { ResultsHeader } from './ResultsHeader';

interface IResultsProps {
  isLoading: boolean;
  emissionData: any;
  perCapitaData: any;
  searchedCountries: string[];
  isPerCapita: boolean;
}

const mapStateToProps = (state: IAppState) => ({
  isLoading: state.results.loading,
  emissionData: state.results.totalEmissionsForCountries,
  perCapitaData: state.results.emissionsPerCapita,
  searchedCountries: state.search.searchedCountries,
  isPerCapita: state.results.isPerCapita
});

class Results extends React.Component<IResultsProps, any> {
  private renderLoadingSpinner = () => {
    return this.props.isLoading ? <Loading /> : null;
  };

  private onClearCountryClick = (country: string) => {
    console.log(country);
  }

  private renderResultsContent = () => {
    const {
      isPerCapita,
      perCapitaData,
      emissionData,
      searchedCountries,
      isLoading
    } = this.props;
    const dataForChart = isPerCapita ? perCapitaData : emissionData;
    return searchedCountries.length && !isLoading ? (
      <div className='results'>
        <ResultsHeader countries={searchedCountries} onClick={country => this.onClearCountryClick(country)}/>
        <LineChart data={dataForChart} />
      </div>
    ) : null;
  };

  public render() {
    return (
      <div className='results-top-container'>
        {this.renderLoadingSpinner()}
        <div className='results-content-container'>
          {this.renderResultsContent()}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Results);
