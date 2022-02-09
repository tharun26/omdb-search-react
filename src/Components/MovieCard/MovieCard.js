import React, { useState, useEffect, useContext } from 'react';
import { fetchMovieData } from '../../Services/SearchService';
import './MovieCard.scss';
import Overlay from '../OverLay/OverLay';
import SearchResultContext from '../../Context/SearchResultContext';

/**
 * @function MovieCard
 * @desc Render the MovieCard component
 * @params {id: string}
 * @returns {JSX}
 */
function MovieCard({ id }) {
  const [movieInfo, setMovieInfo] = useState({ movie: {} });
  const { setShowModal } = useContext(SearchResultContext);

  useEffect(() => {
    const searchResult = fetchMovieData(id);
    searchResult.then((result) => {
      setMovieInfo((prev) => {
        return {
          ...prev,
          ...result,
        };
      });
    });
  }, [id]);

  return (
    <>
      <Overlay
        color='rgb(0 0 0 / 63%)'
        handleClick={(e) => {
          setShowModal(false);
        }}
      />
      {movieInfo.movie.id ? (
        <div
          className='movie-card-container'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='image-container'>
            <div
              className='bg-image'
              style={{ backgroundImage: `url(${movieInfo.movie.poster})` }}
            />
          </div>
          <div className='movie-info'>
            <h2>Movie Details</h2>
            <div>
              <h1>{movieInfo.movie.title}</h1>
              <small>Released Date: {movieInfo.movie.year}</small>
            </div>
            <h4>Rating: {movieInfo.movie.imdbrating} / 10</h4>
            <p>{movieInfo.movie.plot && movieInfo.movie.plot.substr(0, 350)}</p>
            <div className='tags-container'>
              {movieInfo.movie.genre &&
                movieInfo.movie.genre.split(', ').map((g, index) => {
                  if (index === movieInfo.movie.genre.split(', ').length - 1) {
                    return (
                      <span key={index}>
                        <span>{g}</span>
                      </span>
                    );
                  } else {
                    return (
                      <span key={index}>
                        <span>{g}</span>
                        <span className='genre-separator'>{'.'}</span>
                      </span>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MovieCard;
