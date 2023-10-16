import {BASE_URL, API_KEY} from '../configs/tmdbConfig';

export const GET = async url => {
  console.log(
    `${BASE_URL}${url}?api_key=${'125ffb0958a93add2e78c6b803f41ab9'}`,
  );
  const API_URL = `${BASE_URL}${url}?api_key=${'125ffb0958a93add2e78c6b803f41ab9'}`;

  let response = await fetch(API_URL, {method: 'GET'});
  response = response.json();
  return response;
};
