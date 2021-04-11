import React from 'react';
import { Link } from 'react-router-dom';
import { MovieSearchItemType } from '../../models/movie.model';

function MyMovieItem(props: { movie: MovieSearchItemType }) {
  const { movie } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + movie.poster} alt={movie.title}></img>
      <div className="info">
        <Link to={`/movie/${movie.url}`}>{movie.title}</Link>
        {movie.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MyMovieItem;
