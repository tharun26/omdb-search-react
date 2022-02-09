import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import SearchResultContext from '../../Context/SearchResultContext';
import { fetchSearchData } from '../../Services/SearchService';

import './SearchBar.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

function SearchBar() {
  const [startDate, setStartDate] = useState('');
  const [type, setType] = useState('');
  const [searchText, setSearchText] = useState('');
  const {
    movies,
    setMovies,
    setTotalresults,
    setHasMore,
    setSearchTerm,
    setLoading,
    setSelectedYear,
    setSelectedType,
  } = useContext(SearchResultContext);

  const options = [
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
    { value: 'episode', label: 'Episode' },
    { value: 'all', label: 'All' },
  ];

  useEffect(() => {
    const cleanTimeout = setTimeout(() => {
      setMovies([]);
      if (searchText === '') {
        console.log('Hi3');
        setHasMore(false);
        setSearchTerm(searchText);
        return;
      }
      const yearChoosen = formatChooseYear(startDate);
      const typeChoosen = formatTypeChoosen(type);
      setLoading(true);
      const searchResult = fetchSearchData(
        searchText,
        yearChoosen,
        typeChoosen
      );
      searchResult.then((result) => {
        if (result && result['movies']) {
          const moviesReturned = result['movies'];
          const filterdMovies = moviesReturned.filter(
            (item) => item.movie.poster !== 'N/A'
          );
          const newMovies = filterdMovies.map((item) => item.movie);
          setMovies([...newMovies]);
          result['totalResult'] && setTotalresults(result['totalResult']);
          setSearchTerm(searchText);
          setSelectedYear(yearChoosen);
          setSelectedType(typeChoosen);
          setLoading(false);
        } else if (result && result['error'] === 'Movie not found!') {
          setHasMore(false);
          setLoading(false);
        }
        setHasMore(true);
      });
    }, 700);
    return () => {
      clearTimeout(cleanTimeout);
    };
  }, [searchText, startDate, type]);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const formatChooseYear = (startDate) => {
    return startDate == null || startDate === ''
      ? ''
      : startDate.getFullYear().toString();
  };
  const formatTypeChoosen = (type) => {
    return type === '' || type.value === '' || type.value === 'all'
      ? ''
      : type.value;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '0px',
      minHeight: '25px',
      height: '23px',
      boxShadow: state.isFocused ? null : null,
      background: '#000000',
      color: 'white',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '20px',
      width: '100px',
      padding: '0px 1px',
      color: 'white',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white',
    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
      padding: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '25px',
    }),
  };

  return (
    <div className='container-1'>
      <div className='container-2'>
        <span className='search-icon'>
          <i className='fa fa-search'></i>
        </span>
        <input
          onChange={handleChange}
          type='search'
          id='search'
          placeholder='Movies, TV Shows...'
          value={searchText}
          autoFocus
        />
      </div>
      <Select
        className='search-type'
        placeholder='Type'
        options={options}
        styles={customStyles}
        value={type}
        onChange={(option) => {
          setType(option);
        }}
      />
      <div className='search-year'>
        <DatePicker
          wrapperClassName='search-date-picker'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showYearPicker
          dateFormat='yyyy'
          maxDate={new Date()}
          yearItemNumber={10}
          placeholderText='Year'
        />
      </div>
    </div>
  );
}

export default SearchBar;
