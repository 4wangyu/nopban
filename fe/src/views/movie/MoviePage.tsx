import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../../components/Rating';
import { MOVIE_URL } from '../../lib/constant';
import { arrToStr, getImdbIdFromUrl, handleError } from '../../lib/util';
import { Movie } from '../../models/movie.model';
import { AuthContext } from '../../store/AuthProvider';

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [rating, setRating] = useState<number>();
  const { context, dispatch } = useContext(AuthContext);
  const token = context?.token;

  useEffect(() => {
    axios
      .get(`/api/movie/object/${movieId}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch(handleError);
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
        .catch(handleError);
    }
  }, [movieId, token]);

  function loadMoiveUrl(url: string) {
    dispatch({
      type: 'UPDATE_IFRAME',
      iframeUrl: MOVIE_URL + url,
    });
  }

  function rate(r: number) {
    axios({
      method: 'post',
      url: '/api/movie/rating',
      data: { prevRating: rating, nextRating: r, movieUuid: movieId },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        setRating(res.data.rating);
      })
      .catch(handleError);
  }

  function deleteRating() {
    axios({
      method: 'delete',
      url: '/api/movie/rating',
      data: { movieUuid: movieId },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        setRating(undefined);
      })
      .catch(handleError);
  }

  return (
    <div className="info-page">
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
              {movie?.directors?.length ? (
                <div>
                  <label>导演: </label>
                  <output>
                    {movie.directors
                      .map<React.ReactNode>((o, i) => (
                        <button key={i} onClick={() => loadMoiveUrl(o.link)}>
                          {o.name}
                        </button>
                      ))
                      .reduce((prev, curr) => [prev, ' / ', curr])}
                  </output>
                </div>
              ) : (
                <></>
              )}
              {movie?.playwriters?.length ? (
                <div>
                  <label>编剧: </label>
                  <output>
                    {movie.playwriters
                      .map<React.ReactNode>((o, i) => (
                        <button key={i} onClick={() => loadMoiveUrl(o.link)}>
                          {o.name}
                        </button>
                      ))
                      .reduce((prev, curr) => [prev, ' / ', curr])}
                  </output>
                </div>
              ) : (
                <></>
              )}
              {movie?.actors?.length ? (
                <div>
                  <label>主演: </label>
                  <output>
                    {movie.actors
                      .map<React.ReactNode>((o, i) => (
                        <button key={i} onClick={() => loadMoiveUrl(o.link)}>
                          {o.name}
                        </button>
                      ))
                      .reduce((prev, curr) => [prev, ' / ', curr])}
                  </output>
                </div>
              ) : (
                <></>
              )}
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
              {movie?.aliases.length ? (
                <div>
                  <label>又名: </label>
                  <output>{arrToStr(movie?.aliases)}</output>
                </div>
              ) : (
                <></>
              )}
              <div>
                <label>豆瓣链接: </label>
                <output>
                  <button onClick={() => loadMoiveUrl('/subject/' + movieId)}>
                    {movieId}
                  </button>
                </output>
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

      {context?.isAuthenticated && movie && (
        <Rating
          rating={rating}
          rate={rate}
          deleteRating={deleteRating}
        ></Rating>
      )}
    </div>
  );
}

export default MoviePage;
