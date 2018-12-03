export const API_BASE_URL = 'localhost:8080/api';
export const EMISSIONS_ENDPOINT = '/emissions';
export const POPULATION_ENDPOINT = 'population';

export const fetchDataFromUrl = (url: string, country: string) => {
  return fetch(`http://${API_BASE_URL}${url}?country=${country}`)
  .then(response => handleErrors(response))
  .then(response => response.json());
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
