import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { SearchResultContextProvider } from '../../Context/SearchResultContext';
import * as searchService from '../../Services/SearchService';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let fetchMovieDataResult = {};
  let newSetMovies = [];
  beforeEach(() => {
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
  });

  it('should render Search Bar component', async () => {
    const wrapper = await mount(
      <SearchResultContextProvider>
        <SearchBar />
      </SearchResultContextProvider>
    );
    expect(wrapper.find('.search-icon').length).toEqual(1);
    expect(wrapper.find('#search').length).toEqual(1);
    expect(wrapper.find('SelectContainer').length).toEqual(1);
    expect(wrapper.find('.react-datepicker-wrapper').length).toEqual(1);
  });

  it('should render Search Bar component and on chaning text content to empty string should not make a fetch call', async () => {
    jest.useFakeTimers();
    jest
      .spyOn(searchService, 'fetchSearchData')
      .mockReturnValue(Promise.resolve(newSetMovies));
    const wrapper = await mount(
      <SearchResultContextProvider>
        <SearchBar />
      </SearchResultContextProvider>
    );
    expect(wrapper.find('.search-icon').length).toEqual(1);
    expect(wrapper.find('#search').length).toEqual(1);
    expect(wrapper.find('SelectContainer').length).toEqual(1);
    expect(wrapper.find('.react-datepicker-wrapper').length).toEqual(1);
    wrapper
      .find('#search')
      .at(0)
      .simulate('change', { target: { value: 'Games' } });

    jest.advanceTimersByTime(1000);
    expect(searchService.fetchSearchData).toHaveBeenCalledWith('Games', '', '');
    wrapper
      .find('#search')
      .at(0)
      .simulate('change', { target: { value: '' } });
    jest.advanceTimersByTime(1000);
    expect(searchService.fetchSearchData).toHaveBeenCalledTimes(1);
  });

  it('should render Search Bar component and on typing text, validate fetch call', async () => {
    jest.useFakeTimers();

    jest
      .spyOn(searchService, 'fetchSearchData')
      .mockReturnValue(Promise.resolve(newSetMovies));
    const wrapper = await mount(
      <SearchResultContextProvider>
        <SearchBar />
      </SearchResultContextProvider>
    );
    expect(wrapper.find('.search-icon').length).toEqual(1);
    expect(wrapper.find('#search').length).toEqual(1);
    expect(wrapper.find('SelectContainer').length).toEqual(1);
    expect(wrapper.find('.react-datepicker-wrapper').length).toEqual(1);
    wrapper
      .find('#search')
      .at(0)
      .simulate('change', { target: { value: 'Games' } });
    await wrapper.update();
    expect(wrapper.find('#search').getDOMNode().value).toEqual('Games');
    jest.advanceTimersByTime(1000);
    expect(searchService.fetchSearchData).toHaveBeenCalledWith('Games', '', '');
  });
  it('should render Search Bar component and on typing text and selected year validate multiple fetch call', async () => {
    jest.useFakeTimers();
    jest
      .spyOn(searchService, 'fetchSearchData')
      .mockReturnValue(Promise.resolve(newSetMovies));
    const wrapper = await mount(
      <SearchResultContextProvider>
        <SearchBar />
      </SearchResultContextProvider>
    );
    expect(wrapper.find('.search-icon').length).toEqual(1);
    expect(wrapper.find('#search').length).toEqual(1);
    expect(wrapper.find('SelectContainer').length).toEqual(1);
    expect(wrapper.find('.react-datepicker-wrapper').length).toEqual(1);
    wrapper
      .find('#search')
      .at(0)
      .simulate('change', { target: { value: 'Games' } });

    jest.advanceTimersByTime(1000);
    expect(searchService.fetchSearchData).toHaveBeenCalledWith('Games', '', '');
    // wrapper.find('input[id^="react-select"]').at(0).simulate('click');
    wrapper
      .find('.react-datepicker-wrapper input')
      .at(0)
      .simulate('change', { target: { value: '2020' } });
    jest.advanceTimersByTime(1000);

    expect(searchService.fetchSearchData).toHaveBeenCalledWith(
      'Games',
      '2020',
      ''
    );
  });
});
