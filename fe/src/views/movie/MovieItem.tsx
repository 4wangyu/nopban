import axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { MovieSearchItem } from '../../models/movie.model';
import './movie-item.scss';

function MovieItem(props: {
  idx: number;
  movie: MovieSearchItem;
  refreshResult: (idx: number, movie: MovieSearchItem) => void;
}) {
  const { dispatch } = useContext(AppContext);

  function addMovie() {
    axios
      .post('api/movie/add', { url: props.movie.url })
      .then(function (res) {
        props.refreshResult(props.idx, res.data);
        //success toast
        console.log('success', res);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function gotoMovie(m: Partial<MovieSearchItem>) {
    if (m.saved) {
      // navigate to movie page
    } else {
      dispatch({
        type: 'UPDATE_IFRAME',
        iframeUrl: m.url,
      });
    }
  }

  return (
    <div className="movie-item">
      {props.movie.saved && (
        <img
          src={'data:image;base64,' + props.movie.poster}
          alt={props.movie.title}
        ></img>
      )}

      <div className="info">
        <button className="title" onClick={() => gotoMovie(props.movie)}>
          {props.movie.title}
        </button>
        {props.movie.saved || (
          <button className="add" title="添加" onClick={addMovie}>
            <i className="fa fa-plus"></i>
          </button>
        )}

        {props.movie.metas?.map((m, idx) => (
          <p key={idx}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MovieItem;
