import React, { useContext } from 'react';
import './SearchItem.scss';
import SearchResultContext from '../../Context/SearchResultContext';

const SearchItem = ({ item }) => {
  const { id, title, poster } = item;
  const { handleOnClick } = useContext(SearchResultContext);
  return (
    <div
      className='search-item'
      onClick={(e) => {
        handleOnClick(id);
      }}
    >
      <div className='search-item__rating-container'></div>
      <div className='search-item__img-box'>
        <img src={poster} alt='movie' className='search-item__img' />
      </div>
      <div className='search-item__text'>
        <h1 className='search-item__title'>{title}</h1>
      </div>
    </div>
  );
};

export default SearchItem;
