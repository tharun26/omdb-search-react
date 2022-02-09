import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import Header from './Header';
import { SearchResultContextProvider } from '../../Context/SearchResultContext';

describe('Header', () => {
  it('should render the Header Component on mount', () => {
    const wrapper = mount(
      <SearchResultContextProvider>
        <Header />
      </SearchResultContextProvider>
    );
    expect(wrapper.find('.header__logo').length).toEqual(1);
    expect(wrapper.find('SearchBar').length).toEqual(1);
    expect(wrapper.find('.container-2').length).toEqual(1);
    expect(wrapper.find('.search-year').length).toEqual(1);
    expect(wrapper.find('.search-date-picker').length).toEqual(1);
  });
});
