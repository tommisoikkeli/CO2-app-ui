import {countries} from '../../../data/countries';
import {includes} from 'lodash';

export const getSuggestedCountries = (searchTerm: string) =>
  countries.filter(country =>
    includes(country.toLowerCase(), searchTerm.toLowerCase())
  );
