import axios from 'axios';
import React, { useContext } from 'react';
import { MovieSearchItem } from '../../models/movie.model';
import './movie-item.scss';
import { useRouteMatch, Link } from 'react-router-dom';
import { AuthContext } from '../../store/AuthProvider';

function MovieItem(props: {
  idx: number;
  movie: MovieSearchItem;
  refreshResult: (idx: number, movie: MovieSearchItem) => void;
}) {
  const { context, dispatch } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const { idx, movie, refreshResult } = props;

  function addMovie() {
    axios({
      method: 'post',
      url: '/api/movie/object',
      data: { url: movie.url },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        refreshResult(idx, res.data);
        //success toast
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function gotoMovie(url: string) {
    dispatch({
      type: 'UPDATE_IFRAME',
      iframeUrl: url,
    });
  }

  return (
    <div className="movie-item">
      {movie.saved && (
        <img src={'data:image;base64,' + movie.poster} alt={movie.title}></img>
      )}

      <div className="info">
        {movie.saved ? (
          <Link to={`${url}/${movie.url}`}>{movie.title}</Link>
        ) : (
          <button className="title" onClick={() => gotoMovie(movie.url)}>
            {movie.title}
          </button>
        )}
        {context?.isAuthenticated && !movie.saved && (
          <button className="add" title="添加" onClick={addMovie}>
            <i className="fa fa-plus"></i>
          </button>
        )}

        {movie.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MovieItem;
