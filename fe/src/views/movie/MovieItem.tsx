import React from 'react';
import { MovieSearchItem } from '../../models/movie.model';

function MovieItem(props: { movie: MovieSearchItem }) {
  return (
    <div>
      <img alt={props.movie.title} src={props.movie.img}></img>
      <div>
        <h4>{props.movie.title}</h4>
        {props.movie.metas.map((m, idx) => (
          <p key={idx}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MovieItem;
