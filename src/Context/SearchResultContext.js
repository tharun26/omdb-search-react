import React, { useState, createContext } from 'react';
import { fetchSearchData } from '../Services/SearchService';

export const SearchResultContext = createContext();

export const SearchResultContextProvider = ({ children, values }) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalresults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [movieID, setMovieID] = useState('');
  const handleOnClick = (id) => {
    setShowModal(true);
    setMovieID(id);
  };

  const fetchData = (page) => {
    setLoading(true);
    if (page > 1 && page > Math.ceil(totalResults / 10)) {
      setHasMore(false);
      setLoading(false);
      return;
    }
    const searchResult = fetchSearchData(
      searchTerm,
      selectedYear,
      selectedType,
      page
    );
    searchResult.then((result) => {
      if (movies.length >= result['totalResult']) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      if (result) {
        const moviesReturned = result['movies'];
        const filterdMovies = moviesReturned.filter(
          (item) => item.movie.poster !== 'N/A'
        );
        const newMovies = filterdMovies.map((item) => item.movie);
        // const newMovies = moviesReturned.map((item) => item.movie);
        setMovies((prevMovies) => {
          return [...prevMovies, ...newMovies];
        });
        result['totalResult'] && setTotalresults(result['totalResult']);
        setLoading(false);
      }
    });
  };

  return (
    <SearchResultContext.Provider
      value={{
        movies,
        setMovies,
        searchTerm,
        setSearchTerm,
        setSelectedYear,
        setSelectedType,
        totalResults,
        setTotalresults,
        hasMore,
        setHasMore,
        loading,
        setLoading,
        fetchData,
        showModal,
        setShowModal,
        movieID,
        setMovieID,
        handleOnClick,
        ...values,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};

export default SearchResultContext;
