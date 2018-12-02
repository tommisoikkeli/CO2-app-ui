import * as React from 'react';
import {shallow} from 'enzyme';
import {Suggestions} from './Suggestions';

const props = {
  items: ['Foo', 'Bar'],
  isVisible: true,
  onItemClick: () => false
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
});
