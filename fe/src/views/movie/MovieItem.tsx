import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { MovieSearchItem } from '../../models/movie.model';
import './movie-item.scss';

function MovieItem(props: { movie: MovieSearchItem }) {
  const { dispatch } = useContext(AppContext);
  const [savedMovie, setSavedMovie] = useState<Partial<MovieSearchItem>>();

  function addMovie() {
    axios
      .post('api/movie/add', { url: props.movie.url })
      .then(function (res) {
        setSavedMovie(res.data);
        //success toast
        console.log('success', res);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function gotoMovie(m: Partial<MovieSearchItem>) {
    if (movie.saved) {
      // navigate to movie page
    } else {
      dispatch({
        type: 'UPDATE_IFRAME',
        iframeUrl: m.url,
      });
    }
  }

  const movie = savedMovie || props.movie;
  return (
    <div className="movie-item">
      {movie.saved && (
        <img src={'data:image;base64,' + movie.poster} alt={movie.title}></img>
      )}

      <div className="info">
        <button className="title" onClick={() => gotoMovie(movie)}>
          {movie.title}
        </button>
        {movie.saved || (
          <button className="add" title="添加" onClick={addMovie}>
            <i className="fa fa-plus"></i>
          </button>
        )}

        {movie.metas?.map((m, idx) => (
          <p key={idx}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MovieItem;
