import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { SearchResultContextProvider } from '../../Context/SearchResultContext';
import Overlay from './OverLay';
import * as searchService from '../../Services/SearchService';

describe('OverLay', () => {
  it('should render overlay component if color props is passed', async () => {
    jest.useRealTimers();
    const wrapper = await mount(<Overlay color={'rgb(0 0 0 / 63%)'}></Overlay>);
    await wrapper.update();
    expect(wrapper.find('.overlay').length).toEqual(1);
  });
  it('should not render overlay component if color props is not passed', async () => {
    jest.useRealTimers();
    const wrapper = await mount(<Overlay></Overlay>);
    await wrapper.update();
    expect(wrapper.find('.overlay').length).not.toEqual(1);
  });
  it('should handle click event if overlay popup is clicked', async () => {
    jest.useRealTimers();
    const handleClickMethod = jest.fn((e) => true);

    const wrapper = await mount(
      <Overlay
        color={'rgb(0 0 0 / 63%)'}
        handleClick={handleClickMethod}
      ></Overlay>
    );
    await wrapper.update();
    expect(wrapper.find('.overlay').length).toEqual(1);
    wrapper.find('.overlay').at(0).simulate('click');
    expect(handleClickMethod).toHaveBeenCalled();
  });
});
