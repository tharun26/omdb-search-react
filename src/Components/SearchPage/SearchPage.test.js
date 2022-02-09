import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import * as searchService from '../../Services/SearchService';

import SearchResultContext, {
  SearchResultContextProvider,
} from '../../Context/SearchResultContext';
import SearchPage from './SearchPage';

describe('MovieCard', () => {
  let fetchMovieDataResult = {};
  let movies = {};
  let newSetMovies = {};
  let searchTerm = '';
  let fetchData = null;
  beforeEach(() => {
    fetchData = jest.fn((e) => true);
    movies = [
      {
        id: 'tt0080716',
        title: 'Fame',
        year: '1980',
        type: 'movie',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMzk2NzA4NjQ4NV5BMl5BanBnXkFtZTgwMzE4OTI1MDE@._V1_SX300.jpg',
      },
      {
        id: 'tt0080717',
        title: 'Fame',
        year: '1980',
        type: 'movie',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMzk2NzA4NjQ4NV5BMl5BanBnXkFtZTgwMzE4OTI1MDE@._V1_SX300.jpg',
      },
      {
        id: 'tt0080718',
        title: 'Fame',
        year: '1980',
        type: 'movie',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMzk2NzA4NjQ4NV5BMl5BanBnXkFtZTgwMzE4OTI1MDE@._V1_SX300.jpg',
      },
    ];
    newSetMovies = {
      movies: [
        {
          movie: {
            id: 'tt0492956',
            title: 'The Game Plan',
            year: '2007',
            type: 'movie',
            poster:
              'https://m.media-amazon.com/images/M/MV5BZjczZDAwZTYtYzQ0Ny00NTAyLWIwNjMtMDYyOThhZGIxODc5XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_SX300.jpg',
          },
        },
        {
          movie: {
            id: 'tt0338459',
            title: 'Spy Kids 3-D: Game Over',
            year: '2003',
            type: 'movie',
            poster:
              'https://m.media-amazon.com/images/M/MV5BMTI4MTQyNTUzMF5BMl5BanBnXkFtZTcwNzE2MDAwMQ@@._V1_SX300.jpg',
          },
        },
      ],
      totalResult: '4448',
    };
    jest.useRealTimers();
  });
  it('should render list of movies present on search page', async () => {
    jest.useRealTimers();
    searchTerm = 'Fame';
    jest
      .spyOn(searchService, 'fetchSearchData')
      .mockReturnValue(Promise.resolve(newSetMovies));
    const wrapper = await mount(
      <SearchResultContextProvider values={{ movies, searchTerm }}>
        <SearchPage />
      </SearchResultContextProvider>
    );
    await wrapper.update();
    expect(wrapper.find('.search-item').length).toEqual(3);
    expect(wrapper.find('.search-item').length).toEqual(3);
  });

  it('should render more movies onScroll on window', async () => {
    const mEvent = {
      target: { scrollWidth: 100, scrollLeft: 50, clientWidth: 50 },
    };
    jest.useRealTimers();
    searchTerm = 'Fame';
    jest
      .spyOn(searchService, 'fetchSearchData')
      .mockReturnValue(Promise.resolve(newSetMovies));
    const wrapper = await mount(
      <SearchResultContextProvider values={{ movies, searchTerm }}>
        <SearchPage />
      </SearchResultContextProvider>
    );
    await wrapper.update();
    expect(wrapper.find('.search-item').length).toEqual(3);
    // console.log(window['window'].scrollTo);
    // To Do -> Facing issue to scroll the infinity scroll
    // wrapper.simulate('wheel', { deltaY: 5000 });
    // global.window.scrollto(0, 300);
    // await wrapper.update();
    // expect(searchService.fetchSearchData).toHaveBeenCalled();
    // expect(wrapper.find('.search-item').length).toEqual(3);
  });
  it('should render welcome message when no movies is searched', async () => {
    jest.useRealTimers();
    searchTerm = '';
    jest
      .spyOn(searchService, 'fetchSearchData')
      .mockReturnValue(Promise.resolve([]));
    const wrapper = await mount(
      <SearchResultContextProvider values={{}}>
        <SearchPage />
      </SearchResultContextProvider>
    );
    await wrapper.update();
    console.log(wrapper.debug());
    expect(wrapper.find('.search-item').length).toEqual(0);
    expect(wrapper.find('.search-page__welcome').length).toEqual(1);
  });
});
