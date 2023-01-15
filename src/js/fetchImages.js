export { fetchImages };

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32831845-cf6034262192a490dc1d5b471';
const axios = require('axios').default;
let inputValue = '';
let pageNumber = 1;

async function fetchImages(inputValue, pageNumber) {
  try {
    const response = await axios.get(`${BASE_URL}?
key=${KEY}&
q=${inputValue}&
orientation=horisontal&
image_type=photo&
safesearch=true&
page=${pageNumber}&
per_page=40`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
