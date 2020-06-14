import axios from 'axios';
import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import { scrollToTop } from '../../lib/util';
import {
  MovieSearchItem,
  MovieSearchPagination,
  MovieSearchResult,
} from '../../models/movie.model';
import MovieItem from './MovieItem';
import MoviePage from './MoviePage';

const Movie = () => {
  const [result, setResult] = useState<MovieSearchResult>({
    items: [],
    pagination: [],
  });
  const [searchKey, setSearchKey] = useState<string>('');
  let { path } = useRouteMatch();
  const history = useHistory();

  function search(start = 0) {
    const inbound = JSON.parse(
      localStorage.getItem('inbound') || 'true'
    ) as boolean;

    axios
      .get('/api/movie/search', {
        params: {
          searchKey,
          start,
          inbound,
        },
      })
      .then(function (response) {
        setResult(response.data);
        history.push('/movie');
        scrollToTop();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function refreshResult(idx: number, movie: MovieSearchItem) {
    const list = [...result.items];
    list[idx] = movie;
    setResult({ items: list, pagination: result.pagination });
  }

  return (
    <>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onButtonClick={search}
      ></SearchBar>

      <main>
        <Switch>
          <Route exact path={path}>
            {result.items?.map((item: MovieSearchItem, idx: number) => (
              <MovieItem
                key={idx}
                idx={idx}
                movie={item}
                refreshResult={refreshResult}
              ></MovieItem>
            ))}
            <div className="pagination">
              {result.pagination?.map(
                (pag: MovieSearchPagination, idx: number) => (
                  <button
                    disabled={pag.start === null}
                    onClick={() => search(pag.start as number)}
                    key={idx}
                  >
                    {pag.text}
                  </button>
                )
              )}
            </div>
          </Route>
        </Switch>

        <Switch>
          <Route path={`${path}/:movieId`}>
            <MoviePage></MoviePage>
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Movie;
