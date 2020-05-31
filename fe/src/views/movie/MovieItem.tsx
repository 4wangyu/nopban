import React from 'react';
import { MovieSearchItem } from '../../models/movie.model';

function MovieItem(props: { movie: MovieSearchItem }) {
  return (
    <div>
      <a>
        <h4>{props.movie.title}</h4>
      </a>
      {props.movie.metas.map((m, idx) => (
        <p key={idx}>{m}</p>
      ))}
    </div>
  );
}

export default MovieItem;
