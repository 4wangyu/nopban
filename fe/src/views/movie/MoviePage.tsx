import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { MOVIE_URL } from '../../lib/constant';
import { arrToStr, getImdbIdFromUrl } from '../../lib/util';
import { Movie } from '../../models/movie.model';
import './movie-page.scss';
import Rating from '../../components/Rating';

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [rating, setRating] = useState<number>();
  const { context, dispatch } = useContext(AppContext);
  const token = context?.token;

  useEffect(() => {
    axios
      .get(`/api/movie/object/${movieId}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [movieId]);

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/movie/rating`, {
          params: { movieUuid: movieId },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setRating(res.data?.rating);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [movieId, token]);

  function loadMoiveUrl(url: string) {
    dispatch({
      type: 'UPDATE_IFRAME',
      iframeUrl: MOVIE_URL + url,
    });
  }

  function rate(r: number) {
    console.log(r);
    axios({
      method: 'post',
      url: 'api/movie/rating',
      data: { prevRating: rating, nextRating: r, movieUuid: movieId },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        setRating(res.data.rating);
        //success toast
        console.log('success', res);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  return (
    <div className="movie-page">
      {movie && (
        <>
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
                  <a
                    href={movie?.imdb}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getImdbIdFromUrl(movie?.imdb)}
                  </a>
                </output>
              </div>
            </section>
          </div>
        </>
      )}

      {context?.isAuthenticated && (
        <Rating rating={rating} rate={rate}></Rating>
      )}
    </div>
  );
}

export default MoviePage;
