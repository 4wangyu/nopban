import axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { MovieSearchItem } from '../../models/movie.model';
import './movie-item.scss';

function MovieItem(props: { movie: MovieSearchItem }) {
  const { dispatch } = useContext(AppContext);

  function addMovie() {
    axios
      .post('api/movie/add', { url: props.movie.url })
      .then(function (res) {
        props.movie = res.data;
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
        className="title"
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
