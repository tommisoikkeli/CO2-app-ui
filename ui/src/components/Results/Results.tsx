import * as React from 'react';
import {IAppState} from '../../redux/appState';
import {connect} from 'react-redux';
import {Loading} from './Loading';
import {Checkbox} from '../Checkbox/Checkbox';

interface IResultsProps {
  isLoading: boolean;
  emissionData: any;
}

interface IResultsState {
  checkboxChecked: boolean
}

const mapStateToProps = (state: IAppState) => ({
  isLoading: state.results.loading,
  emissionData: state.results.emissionsForCountry
});

class Results extends React.Component<IResultsProps, IResultsState> {
  public constructor(props) {
    super(props);
    this.state = {
      checkboxChecked: false
    }
  }

  private renderLoadingSpinner = () => {
    return this.props.isLoading ? <Loading /> : null;
  }

  private renderCheckbox = () => {
    return this.props.emissionData.length ? (
      <div className='checkbox-wrapper'>
        <Checkbox
          name='search-checkbox'
          label='Per capita'
          onChange={this.onCheckboxChange}
          checked={this.state.checkboxChecked}
        />
      </div>
    ) : null
  }

  private onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({checkboxChecked: !this.state.checkboxChecked});
  };

  public render() {
    return (
      <div className='results-container'>
        {this.renderLoadingSpinner()}
        {this.renderCheckbox()}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Results)
