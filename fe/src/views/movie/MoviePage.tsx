import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { arrToStr, getImdbIdFromUrl, getName } from '../../lib/util';
import { Movie } from '../../models/movie.model';
import './movie-page.scss';
import { MOVIE_URL } from '../../lib/constant';

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const { dispatch } = useContext(AppContext);

  function loadMoiveUrl(url: string) {
    dispatch({
      type: 'UPDATE_IFRAME',
      iframeUrl: MOVIE_URL + url,
    });
  }

  useEffect(() => {
    axios
      .get(`/api/movie/${movieId}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [movieId]);

  return (
    <div className="movie-page">
      <h1>
        {movie?.title} <span className="year">({movie?.year})</span>
      </h1>

      <div className="content">
        <img
          src={'data:image;base64,' + movie?.poster}
          alt={movie?.title}
        ></img>
        <section>
          <div>
            <label>导演: </label>
            <output>
              {movie?.directors
                ?.map<React.ReactNode>((o, i) => (
                  <button key={i} onClick={() => loadMoiveUrl(o.link)}>
                    {o.name}
                  </button>
                ))
                .reduce((prev, curr) => [prev, ' / ', curr])}
            </output>
          </div>
          <div>
            <label>编剧: </label>
            <output>
              {movie?.playwriters
                ?.map<React.ReactNode>((o, i) => (
                  <button key={i} onClick={() => loadMoiveUrl(o.link)}>
                    {o.name}
                  </button>
                ))
                .reduce((prev, curr) => [prev, ' / ', curr])}
            </output>
          </div>
          <div>
            <label>主演: </label>
            <output>
              {movie?.actors
                ?.map<React.ReactNode>((o, i) => (
                  <button key={i} onClick={() => loadMoiveUrl(o.link)}>
                    {o.name}
                  </button>
                ))
                .reduce((prev, curr) => [prev, ' / ', curr])}
            </output>
          </div>
          <div>
            <label>类型: </label>
            <output>{arrToStr(movie?.genres)}</output>
          </div>
          <div>
            <label>制片国家/地区: </label>
            <output>{arrToStr(movie?.countries)}</output>
          </div>
          <div>
            <label>语言: </label>
            <output>{arrToStr(movie?.languages)}</output>
          </div>
          {movie?.releasedates?.length && (
            <div>
              <label>上映日期: </label>
              <output>{arrToStr(movie?.releasedates)}</output>
            </div>
          )}
          {movie?.runtime && (
            <div>
              <label>片长: </label>
              <output>{movie.runtime}</output>
            </div>
          )}
          {movie?.episoderuntime && (
            <div>
              <label>单集片长: </label>
              <output>{movie.episoderuntime}</output>
            </div>
          )}
          <div>
            <label>又名: </label>
            <output>{arrToStr(movie?.aliases)}</output>
          </div>
          <div>
            <label>IMDb链接: </label>
            <output>
              <a href={movie?.imdb} target="_blank" rel="noopener noreferrer">
                {getImdbIdFromUrl(movie?.imdb)}
              </a>
            </output>
          </div>
        </section>
      </div>

      <div className="action">
        <span className="rating">
          <label>评价: </label>
          <button className="gold">&#9733; </button>
          <button className="gold">&#9733; </button>
          <button className="gold">&#9733; </button>
          <button>&#9734; </button>
          <button>&#9734; </button>
        </span>

        <span className="remove">
          <button>删除</button>
        </span>
      </div>
    </div>
  );
}

export default MoviePage;
