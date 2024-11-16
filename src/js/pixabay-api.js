import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47094803-b94033d9110faf4ab5c097a20';

export async function getImages(query, page, perPage) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: perPage,
      page,
    },
  });

  return response.data;
}
