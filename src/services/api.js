import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36672580-7f9d3f18e062a4165a6faa824';

export const fetchImg = async (name, page) => {
  const response = await axios.get(
    `${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
  return response.data;
};
