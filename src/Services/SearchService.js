import { API_URL } from '../Config/config';

export const fetchSearchData = (searchText, year, type, pageNumber = 1) => {
  if (searchText == null || searchText === '') {
    return;
  }
  searchText = searchText.split(' ').join('%20');
  const url = new URL(`${API_URL}search?`);
  url.searchParams.append('title', searchText);
  if (year !== '') url.searchParams.append('year', year);
  url.searchParams.append('page', pageNumber);
  if (type !== '') url.searchParams.append('type', type);
  return fetch(url.href).then((response) => response.json());
};

export const fetchMovieData = (id) => {
  if (id == null) {
    return;
  }
  const url = `${API_URL}movies/${id}`;
  return fetch(url).then((response) => response.json());
};
