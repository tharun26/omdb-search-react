import React from 'react';
import { API_URL } from '../Config/config';

import { fetchSearchData, fetchMovieData } from './SearchService';

describe('fetchSearchData', () => {
  let fetchMock;
  beforeEach(() => {
    fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      );
  });
  afterEach(() => {
    fetchMock.mockClear();
  });
  it('should not call fetch method with URL with searchText, Page and type', () => {
    fetchSearchData('', '', 'series', 2);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('should call fetch method with URL with searchText, Page, year and type', () => {
    fetchSearchData('Games', '2020', 'movie', 1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}search?title=Games&year=2020&page=1&type=movie`
    );
  });
  it('should call fetch method with URL with searchText, Page and type', () => {
    fetchSearchData('Games', '', 'series', 2);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}search?title=Games&page=2&type=series`
    );
  });
  it('should call fetch method with URL with searchText with spaces, Page, year and type', () => {
    fetchSearchData('Games wow', '2020', 'movie');
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}search?title=Games%2520wow&year=2020&page=1&type=movie`
    );
  });
});

describe('fetchMovieData', () => {
  let fetchMock;
  beforeEach(() => {
    fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      );
  });
  afterEach(() => {
    fetchMock.mockClear();
  });
  it('should call fetch method with URL with passed id', () => {
    fetchMovieData('123456');
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}movies/123456`);
  });
  it('should not call fetch method with URL with passed id', () => {
    fetchMovieData();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
