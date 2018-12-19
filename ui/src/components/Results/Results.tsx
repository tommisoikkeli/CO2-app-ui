import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import LineChart from './LineChart/LineChart';
import {ResultsHeader} from './ResultsHeader';
import {clearCountryFromChart} from '../../redux/modules/Results/resultsActions';
import {IEmissionData} from '../../redux/modules/Results/resultsReducer';

interface IStateProps {
  isLoading: boolean;
  emissionData: IEmissionData[];
  searchedCountries: string[];
}

interface IDispatchProps {
  clearCountryFromChart: (country: string) => void;
}

type IResultsProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: IAppState): IStateProps => ({
  isLoading: state.results.loading,
  emissionData: state.results.emissionData,
  searchedCountries: state.results.searchedCountries,
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
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
      emissionData,
      searchedCountries,
      isLoading
    } = this.props;
    return searchedCountries.length && !isLoading ? (
      <div className='results'>
        <ResultsHeader countries={searchedCountries} onClick={country => this.onClearCountryClick(country)}/>
        <LineChart data={emissionData} />
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
