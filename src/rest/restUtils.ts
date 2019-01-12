export const API_BASE_URL = 'https://fierce-mountain-99549.herokuapp.com/api';
export const EMISSIONS_ENDPOINT = 'emissions/all';
export const PER_CAPITA_ENDPOINT = 'emissions/per_capita';

export const fetchDataFromUrl = async (url: string, country: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${url}?country=${country}`);
    return response.json();
  } catch (e) {
    throw e;
  }
};
