import React, { useContext } from 'react';
import './SearchPage.scss';
import SearchItem from '../SearchItem/SearchItem';
import SearchResultContext from '../../Context/SearchResultContext';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../Spinner/Spinner';
import MovieCard from '../MovieCard/MovieCard';

const SearchPage = (props) => {
  const {
    movies,
    hasMore,
    fetchData,
    loading,
    searchTerm,
    showModal,
    movieID,
  } = useContext(SearchResultContext);

  return (
    <div className='search-page'>
      {searchTerm.length > 0 && (
        <>
          {movies && movies.length > 0 ? (
            <h1 className='search-page__title'>Search Results</h1>
          ) : (
            <h1 className='search-page__title'>No Search Results</h1>
          )}
          <div className='search-page__outer'>
            {movies && movies.length > 0 && (
              <InfiniteScroll
                data-testid='episodes-infinite-scroll'
                className='search-page__outer'
                initialLoad={false}
                pageStart={1}
                loadMore={fetchData}
                hasMore={hasMore}
                loader={<div>...</div>}
                useWindow={true}
                threshold={500}
              >
                <div className='search-page__inner'>
                  {movies &&
                    movies.map((movie) => (
                      <SearchItem key={movie.id} item={movie} />
                    ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </>
      )}
      {searchTerm.length == 0 && (
        <div className='search-page__welcome'>
          Welcome to OMDB Search Engine
          <p>
            The Open Movie Database (OMDb) Search is a search engine for movie
            information
            <br></br>
            OMDb Search makes use of the
            <b>
              <a href='http://www.omdbapi.com/'>OMDb API</a>
            </b>
            ,<br></br>a RESTful web service that allows this movie search engine
            to find and display movie information
          </p>
        </div>
      )}

      {showModal && <MovieCard id={movieID}></MovieCard>}
      {searchTerm !== '' && loading && hasMore && <Spinner></Spinner>}
    </div>
  );
};

export default SearchPage;
