import * as React from 'react';
import {shallow} from 'enzyme';
import {Search} from './Search';

const props = {
  suggestions: ['Finland', 'Fiji'],
  suggestCountries: jest.fn(),
  saveCountryName: jest.fn(),
  getEmissionDataForCountry: jest.fn()
};

describe('Search', () => {
  it('renders with children', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('TextInput')).toHaveLength(1);
    expect(wrapper.find('Suggestions')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
});
