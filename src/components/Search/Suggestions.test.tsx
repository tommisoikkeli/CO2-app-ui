import * as React from 'react';
import {shallow, mount} from 'enzyme';
import {Suggestions} from './Suggestions';

const props = {
  items: ['Foo', 'Bar'],
  isVisible: true,
  onItemClick: jest.fn()
};

describe('Suggestions', () => {
  it('renders correctly without exploding', () => {
    const wrapper = shallow(<Suggestions {...props} />);
    expect(wrapper.find('.suggestions-container')).toHaveLength(1);
    expect(wrapper.find('.suggestion-item')).toHaveLength(2);
  });

  it('renders no results found-text when there are no items to show', () => {
    const wrapper = shallow(<Suggestions {...props} items={[]} />);
    expect(wrapper.find('.suggestions-no-results')).toHaveLength(1);
  });

  it('calls onItemClick when item is selected', () => {
    const wrapper = mount(<Suggestions {...props} />);
    const item = wrapper.find('.suggestion-item').at(0);
    item.simulate('click');
    expect(wrapper.props().onItemClick).toHaveBeenCalledTimes(1);
  });
});
