import {isNull, includes} from 'lodash';

// The response from the API is full of stuff the line chart doesn't need
// This function returns only the needed values
export const reduceResponse = data => {
  const filteredData = data.filter(item => !isNull(item.value));
  const reduced = filteredData.reduce((acc, item) => {
    return [...acc, {date: item.date, value: item.value}];
  }, []);
  return {
    country: data[0].country.value,
    indicator: data[0].indicator.value,
    entries: reduced
  };
};

// The World Bank API is challenging with some countries (for example United States).
// It must be requested with the correct ISO-standard name (United States of America).
// But in the response the country name is "United States".
// This causes issues in deleting the countries from the line chart since the names don't match.
// This helper function filters the searched countries after deleting based on the requested name (from Redux action).
// For example, it compares the length of the strings "United States of America" and "United States"
// and determines how the filter should be applied.
export const filterSearchedCountries = (countryFromAction: string, searchedCountries: string[]) => {
  return searchedCountries.filter(c => {
    if (compareLengths(c, countryFromAction)) {
      return !includes(c.toLowerCase(), countryFromAction.toLowerCase());
    } else {
      return !includes(countryFromAction.toLowerCase(), c.toLowerCase());
    }
  });
};

const compareLengths = (country: string, countryFromAction: string): boolean => country.length > countryFromAction.length;
