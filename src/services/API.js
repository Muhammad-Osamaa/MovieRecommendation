import {BASE_URL, API_KEY} from '../configs/tmdbConfig';

export const GET = async url => {
  const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;

  let response = await fetch(API_URL, {method: 'GET'});
  response = response.json();
  return response;
};
