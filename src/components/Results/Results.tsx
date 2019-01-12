import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import LineChart from './LineChart/LineChart';
import {ResultsHeader} from './ResultsHeader';
import {clearCountryFromChart, confirmError} from '../../redux/modules/Results/resultsActions';
import {ErrorModal} from '../ErrorModal/ErrorModal';
import {IEmissionData} from '../../models/results';

interface IStateProps {
  isLoading: boolean;
  emissionData: IEmissionData[];
  hasErrored: boolean;
}

interface IDispatchProps {
  clearCountryFromChart: (country: string) => void;
  confirmError: () => void;
}

type IResultsProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: IAppState): IStateProps => ({
  isLoading: state.results.loading,
  emissionData: state.results.emissionData,
  hasErrored: state.results.hasErrored
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  clearCountryFromChart: (country: string) => dispatch(clearCountryFromChart(country)),
  confirmError: () => dispatch(confirmError())
});

class Results extends React.Component<IResultsProps> {
  private onClearCountryClick = (country: string): void => {
    this.props.clearCountryFromChart(country);
  }

  private renderResultsContent = (): JSX.Element | null => {
    const {
      emissionData,
      isLoading,
      hasErrored
    } = this.props;
    return emissionData.length && !isLoading && !hasErrored ? (
      <div className='results'>
        <ResultsHeader
          countries={emissionData.map(country => country.country)}
          onClick={country => this.onClearCountryClick(country)}/>
        <LineChart data={emissionData} />
      </div>
    ) : null;
  };

  private renderErrorModal = (): JSX.Element => (
    <ErrorModal
      content='No data found for searched country!'
      isOpen={this.props.hasErrored}
      onCloseClick={() => this.props.confirmError()}/>
  );

  public render() {
    const loadingSpinner = this.props.isLoading && <Loading/>;
    return (
      <div className='results-top-container'>
        {loadingSpinner}
        <div className='results-content-container'>
          {this.renderResultsContent()}
          {this.renderErrorModal()}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
