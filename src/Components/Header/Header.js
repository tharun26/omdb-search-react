import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../../Assets/logo.png';
import './Header.scss';

/**
 * @function Header
 * @desc Render the Header component
 * @returns {JSX}
 */
const Header = (props) => {
  return (
    <div className='header'>
      <div className='header__logo-box'>
        <img src={Logo} alt='logo' className='header__logo' />
      </div>

      <div className='header__options'>
        <div className='header__searchbar'>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
