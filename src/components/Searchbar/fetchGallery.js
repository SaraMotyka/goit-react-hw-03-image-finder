import Notiflix from 'notiflix';

const API_KEY = '36940182-0da281a971cf517379f0112d8';

export const fetchGallery = async (query, page, perPage) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    if (!response.ok) {
      Notiflix.Notify.failure(
        'Sorry, something went wrong. Please try again !'
      );
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.log(error);
    return error;
  }
};
