import * as React from 'react';
import {Checkbox} from './Checkbox';
import {shallow, mount} from 'enzyme';

const props = {
  label: 'Label text',
  checked: false,
  onChange: jest.fn()
};

describe('Checkbox', () => {
  it('shows correct label', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    expect(wrapper.text()).toContain('Label text');
  });

  it('calls onChange when checked', () => {
    const wrapper = mount(<Checkbox {...props} />);
    const input = wrapper.find('input');
    input.simulate('change', {checked: true});
    expect(wrapper.props().onChange).toHaveBeenCalledTimes(1);
  });
});
