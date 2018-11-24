import * as React from "react";

interface ITextInputProps {
  placeholder: string;
}

interface ITextInputState {
  value: string;
}

export default class TextInput extends React.Component<ITextInputProps, ITextInputState> {
  public constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  private clearFieldButton = () => (
    <div className="clear-field-button-container" onClick={() => this.setState({value: ""})}>
      <span className="clear-field-button">X</span>
    </div>
  );

  public render() {
    const clearFieldButton = this.state.value.length > 1 ? this.clearFieldButton() : null;
    return (
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          onChange={value => this.onInputChange(value)}
          value={this.state.value}
          placeholder={this.props.placeholder}
        />
        {clearFieldButton}
      </div>
    );
  }
}
