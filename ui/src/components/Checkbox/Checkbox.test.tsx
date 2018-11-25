import * as React from 'react';
import {Checkbox} from './Checkbox';
import {shallow, mount} from 'enzyme';

const props = {
  label: 'Label text',
  checked: false,
  onChange: () => false
};

describe('Checkbox', () => {
  it('shows correct label', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    expect(wrapper.text()).toContain('Label text');
  });

  it('has checked state according to props', () => {
    const wrapper = mount(<Checkbox {...props} />);
    expect(wrapper.props().checked).toBe(false);
    wrapper.setProps({checked: true});
    expect(wrapper.props().checked).toBe(true);
  });
});
