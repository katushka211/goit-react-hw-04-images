import axios from 'axios';
// const API_KEY = '34605013-ed7b70ee5300a8874900b8fd4';

// export const fetchImages = (name, page) => {
//   return fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${name}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(new Error(`Image ${name} not found`));
//   });
// };

export const fetchImages = async (name, page) => {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '34605013-ed7b70ee5300a8874900b8fd4';
  const params = {
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };
  const response = await axios.get(API_URL, { params });
  return response.data.hits;
};
