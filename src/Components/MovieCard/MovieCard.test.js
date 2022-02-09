import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { SearchResultContextProvider } from '../../Context/SearchResultContext';
import MovieCard from './MovieCard';
import * as searchService from '../../Services/SearchService';

describe('MovieCard', () => {
  let fetchMovieDataResult = {};
  beforeEach(() => {
    jest.useRealTimers();
    fetchMovieDataResult = {
      movie: {
        id: 'tt1951264',
        title: 'The Hunger Games: Catching Fire',
        genre: 'Action, Adventure, Drama',
        year: '2013',
        director: 'Francis Lawrence',
        runtime: '146 min',
        actors: 'Jennifer Lawrence, Josh Hutcherson, Liam Hemsworth',
        plot: 'Katniss Everdeen and Peeta Mellark become targets of the Capitol after their victory in the 74th Hunger Games sparks a rebellion in the Districts of Panem.',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTAyMjQ3OTAxMzNeQTJeQWpwZ15BbWU4MDU0NzA1MzAx._V1_SX300.jpg',
        language: 'English',
        imdbrating: '7.5',
        type: 'movie',
      },
    };

    jest.useRealTimers();
  });
  it('should render overlay component and Movie Card Component on mount', async () => {
    jest.useRealTimers();
    const promise = Promise.resolve(fetchMovieDataResult);
    jest.spyOn(searchService, 'fetchMovieData').mockReturnValue(promise);
    const wrapper = await mount(
      <SearchResultContextProvider>
        <MovieCard />
      </SearchResultContextProvider>
    );

    expect(wrapper.find('Overlay').length).toEqual(1);
    await wrapper.update();
    expect(wrapper.find('.movie-card-container').length).toEqual(1);
    expect(wrapper.find('.image-container').length).toEqual(1);
    expect(wrapper.find('.movie-info').length).toEqual(1);
    expect(wrapper.find('.tags-container').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual(
      'The Hunger Games: Catching Fire'
    );
  });

  it('should not close Movie Card component on click on movie card container', async () => {
    jest.useRealTimers();
    const promise = Promise.resolve(fetchMovieDataResult);
    jest.spyOn(searchService, 'fetchMovieData').mockReturnValue(promise);
    const wrapper = await mount(
      <SearchResultContextProvider>
        <MovieCard />
      </SearchResultContextProvider>
    );
    expect(wrapper.find('.overlay').length).toEqual(1);
    await wrapper.update();
    expect(wrapper.find('.movie-card-container').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual(
      'The Hunger Games: Catching Fire'
    );
    wrapper.find('h1').simulate('click');
    expect(wrapper.find('.overlay').length).toEqual(1);

    // await act(() => promise);
  });
});
