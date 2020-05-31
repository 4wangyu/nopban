import React from 'react';
import { MovieSearchItem } from '../../models/movie.model';
import { AppContext } from '../../App';
import './movie-item.scss';

function MovieItem(props: { movie: MovieSearchItem }) {
  const { dispatch } = React.useContext(AppContext);

  return (
    <div className="movie-item">
      <div>
        <button
          onClick={() =>
            dispatch({
              type: 'UPDATE_IFRAME',
              iframeUrl: props.movie.url,
            })
          }
        >
          {props.movie.title}
        </button>
        {props.movie.metas.map((m, idx) => (
          <p key={idx}>{m}</p>
        ))}
      </div>
      <button className="add" title="添加">
        <i className="fa fa-plus"></i>
      </button>
    </div>
  );
}

export default MovieItem;
