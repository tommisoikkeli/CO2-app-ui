import {reduceResponse, compareLengths} from './resultsUtils';

const response = [
  {
    indicator: {
      id: 'EN.ATM.CO2E.PC',
      value: 'CO2 emissions (metric tons per capita)'
    },
    country: {
      id: 'FI',
      value: 'Finland'
    },
    countryiso3code: 'FIN',
    date: '2014',
    value: 8.333333,
    unit: '',
    obs_status: '',
    decimal: 1
  },
  {
    indicator: {
      id: 'EN.ATM.CO2E.PC',
      value: 'CO2 emissions (metric tons per capita)'
    },
    country: {
      id: 'FI',
      value: 'Finland'
    },
    countryiso3code: 'FIN',
    date: '2013',
    value: 7.333333,
    unit: '',
    obs_status: '',
    decimal: 1
  }
];

describe('reduceResponse', () => {
  it('modifies response correctly', () => {
    const reducedResponse = reduceResponse(response);
    expect(reducedResponse).toEqual({
      country: 'Finland',
      indicator: 'CO2 emissions (metric tons per capita)',
      entries: [
        {
          date: '2014',
          value: 8.333333
        },
        {
          date: '2013',
          value: 7.333333
        }
      ]
    });
  });
});

describe('compareLengths', () => {
  it('works as expected', () => {
    const string1 = 'Tegridy Farms';
    const string2 = 'ManBearPig';
    const truthy = compareLengths(string1, string2);
    const falsy = compareLengths(string2, string1);
    expect(truthy).toEqual(true);
    expect(falsy).toEqual(false);
  });
});
