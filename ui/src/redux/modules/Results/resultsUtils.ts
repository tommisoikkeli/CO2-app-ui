import {isNull} from 'lodash';

export const reduceResponse = data => {
  const filteredData = data.filter(item => !isNull(item.value));
  const reduced = filteredData.reduce((acc, item) => {
    return [...acc, {date: item.date, value: item.value}];
  }, []);
  const countryName = isUnitedStates(data[0].country.value)
    ? 'United States of America'
    : data[0].country.value;
  return {
    country: countryName,
    indicator: data[0].indicator.value,
    entries: reduced
  };
};

// This horrible function checks if the searched country is United States.
// The world bank API must be requested with the name 'United states of america' but in the response the country name is 'United States'.
// This causes deleting this particular country from the line chart to not work since the names do not match.
// I am not proud of this but at least this way it works ¯\_(ツ)_/¯
const isUnitedStates = (countryName: string) => countryName === 'United States';
