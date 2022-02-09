import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { SearchResultContextProvider } from '../../Context/SearchResultContext';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render Spinner', async () => {
    jest.useRealTimers();
    const component = mount(<Spinner></Spinner>);
    expect(component).toMatchSnapshot();
  });
});
