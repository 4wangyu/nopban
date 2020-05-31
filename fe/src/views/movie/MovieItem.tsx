import React from 'react';
import axios from 'axios';
import { MovieSearchItem } from '../../models/movie.model';
import { AppContext } from '../../App';
import './movie-item.scss';

function MovieItem(props: { movie: MovieSearchItem }) {
  const { dispatch } = React.useContext(AppContext);

  function addMovie() {
    axios
      .post('api/movie/', { url: props.movie.url })
      .then(function (res) {
        //success toast
        console.log('success', res);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  return (
    <div className="movie-item">
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
      <button className="add" title="添加" onClick={addMovie}>
        <i className="fa fa-plus"></i>
      </button>
      {props.movie.metas.map((m, idx) => (
        <p key={idx}>{m}</p>
      ))}
    </div>
  );
}

export default MovieItem;
