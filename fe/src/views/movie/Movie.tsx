import React from 'react';
import SearchBar from '../../components/SearchBar';
import './movie.scss';
import { MovieSearchResult, MovieSearchItem } from '../../models/movie.model';
import MovieItem from './MovieItem';

const Movie = () => {
  const [result, setResult] = React.useState<MovieSearchResult>({
    items: [],
    pagination: [],
  });

  return (
    <>
      <SearchBar
        url="api/movie/search?searchkey="
        callback={setResult}
      ></SearchBar>

      {result.items.map((item: MovieSearchItem, idx: number) => (
        <MovieItem key={idx} movie={item}></MovieItem>
      ))}
    </>
  );
};

export default Movie;
