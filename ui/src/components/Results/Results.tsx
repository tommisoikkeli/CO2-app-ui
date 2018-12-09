import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';

interface IResultsProps {
  isLoading: boolean;
  emissionData: any;
  searchedCountry: string;
}

const mapStateToProps = (state: IAppState) => ({
  isLoading: state.results.loading,
  emissionData: state.results.emissionsForCountry,
  searchedCountry: state.search.searchedCountry
});

class Results extends React.Component<IResultsProps, any> {
  private renderLoadingSpinner = () => {
    return this.props.isLoading ? <Loading /> : null;
  }

  private renderResultsContent = () => {
    return this.props.searchedCountry.length && !this.props.isLoading ? (
      <div className='results-title'>
        <span>Results for {this.props.searchedCountry}</span>
        {this.props.emissionData[1].map((data, i) => (
          <div key={i}>
            <span>{data.value}</span>
          </div>
        ))}
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
