import * as React from 'react';
import {shallow, mount} from 'enzyme';
import {TextInput} from './TextInput';

const props = {
  onChange: jest.fn(),
  placeholder: 'Placeholder text',
  value: '',
  onClearButtonClick: jest.fn()
};

describe('TextInput', () => {
  it('renders correctly with props', () => {
    const wrapper = mount(<TextInput {...props} />);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.props().value).toBe('');
    expect(wrapper.html()).toContain('Placeholder text');
  });

  it('renders ClearFieldButton when value is not empty', () => {
    const wrapper = shallow(<TextInput {...props} value='Test'/>);
    expect(wrapper.html()).toContain('clear-field-button-container');
  });

  it('calls onChange when value is changed', () => {
    const wrapper = mount(<TextInput {...props} />);
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 'foobar'}});
    expect(wrapper.props().onChange).toHaveBeenCalledTimes(1);
  });
});
