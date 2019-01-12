export const API_BASE_URL = 'localhost:8080/api';
export const EMISSIONS_ENDPOINT = '/emissions/all';
export const PER_CAPITA_ENDPOINT = '/emissions/per_capita';

export const fetchDataFromUrl = async (url: string, country: string) => {
  try {
    const response = await fetch(`http://${API_BASE_URL}${url}?country=${country}`);
    return response.json();
  } catch (e) {
    throw e;
  }
};
