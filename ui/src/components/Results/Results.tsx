import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import LineChart from './LineChart/LineChart';
import {ResultsHeader} from './ResultsHeader';
import {clearCountryFromChart} from '../../redux/modules/Results/resultsActions';

interface IResultsProps {
  isLoading: boolean;
  emissionData: any;
  perCapitaData: any;
  searchedCountries: string[];
  isPerCapita: boolean;
  clearCountryFromChart: (country: string) => void;
}

const mapStateToProps = (state: IAppState) => ({
  isLoading: state.results.loading,
  emissionData: state.results.totalEmissionsForCountries,
  perCapitaData: state.results.emissionsPerCapita,
  searchedCountries: state.results.searchedCountries,
  isPerCapita: state.results.isPerCapita
});

const mapDispatchToProps = dispatch => ({
  clearCountryFromChart: (country: string) => dispatch(clearCountryFromChart(country))
});

class Results extends React.Component<IResultsProps, any> {
  private renderLoadingSpinner = () => {
    return this.props.isLoading ? <Loading /> : null;
  };

  private onClearCountryClick = (country: string) => {
    this.props.clearCountryFromChart(country);
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
  mapDispatchToProps
)(Results);
