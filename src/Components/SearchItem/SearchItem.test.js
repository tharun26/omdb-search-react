import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { SearchResultContextProvider } from '../../Context/SearchResultContext';

import SearchItem from './SearchItem';

describe('SearchItem', () => {
  let movieItem;
  beforeEach(() => {
    jest.useRealTimers();
    movieItem = {
      id: 'tt1392170',
      title: 'The Hunger Games',
      year: '2012',
      type: 'movie',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_SX300.jpg',
    };

    jest.useRealTimers();
  });
  it('should render SearchItem component if movie item is passed', async () => {
    jest.useRealTimers();
    const component = mount(
      <SearchResultContextProvider>
        <SearchItem item={movieItem}></SearchItem>
      </SearchResultContextProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
