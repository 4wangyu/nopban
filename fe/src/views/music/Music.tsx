import axios from 'axios';
import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import { scrollToTop, getInternal } from '../../lib/util';
import MusicItem from './MusicItem';
import MusicPage from './MusicPage';
import {
  MusicSearchResult,
  MusicSearchItem,
  MusicSearchPagination,
} from '../../models/music.model';

const Music = () => {
  const [result, setResult] = useState<MusicSearchResult>({
    items: [],
    pagination: [],
  });
  const [searchKey, setSearchKey] = useState<string>('');
  let { path } = useRouteMatch();
  const history = useHistory();

  function search(start = 0) {
    const internal = getInternal();

    axios
      .get('/api/music/search', {
        params: {
          searchKey,
          start,
          internal,
        },
      })
      .then(function (response) {
        setResult(response.data);
        history.push('/music');
        scrollToTop();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function refreshResult(idx: number, item: MusicSearchItem) {
    const list = [...result.items];
    list[idx] = item;
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
            {result.items?.map((item: MusicSearchItem, idx: number) => (
              <MusicItem
                key={idx}
                music={item}
                idx={idx}
                refreshResult={refreshResult}
              ></MusicItem>
            ))}
            <div className="paginator">
              {result.pagination?.map(
                (pag: MusicSearchPagination, idx: number) => (
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
          <Route path={`${path}/:musicId`}>
            <MusicPage></MusicPage>
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Music;
