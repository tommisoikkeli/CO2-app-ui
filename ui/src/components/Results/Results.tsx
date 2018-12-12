import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import LineChart from './LineChart/LineChart';

interface IResultsProps {
  isLoading: boolean;
  emissionData: any;
  searchedCountries: string[];
}

const mapStateToProps = (state: IAppState) => ({
  isLoading: state.results.loading,
  emissionData: state.results.emissionsForCountry,
  searchedCountries: state.search.searchedCountries
});

class Results extends React.Component<IResultsProps, any> {
  private renderLoadingSpinner = () => {
    return this.props.isLoading ? <Loading /> : null;
  }

  private renderResultsContent = () => {
    return this.props.searchedCountries.length && !this.props.isLoading ? (
      <div className='results'>
        <LineChart data={this.props.emissionData}/>
      </div>
    ) : null;
  }

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

export default connect(mapStateToProps, null)(Results)
