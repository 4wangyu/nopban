import axios from 'axios';
import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import { scrollToTop, getInbound } from '../../lib/util';
import BookItem from './BookItem';
import BookPage from './BookPage';
import {
  BookSearchResult,
  BookSearchItem,
  BookSearchPagination,
} from '../../models/book.model';

const Book = () => {
  const [result, setResult] = useState<BookSearchResult>({
    items: [],
    pagination: [],
  });
  const [searchKey, setSearchKey] = useState<string>('');
  let { path } = useRouteMatch();
  const history = useHistory();

  function search(start = 0) {
    const inbound = getInbound();

    axios
      .get('/api/book/search', {
        params: {
          searchKey,
          start,
          inbound,
        },
      })
      .then(function (response) {
        setResult(response.data);
        history.push('/book');
        scrollToTop();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function refreshResult(idx: number, item: BookSearchItem) {
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
            {result.items?.map((item: BookSearchItem, idx: number) => (
              <BookItem
                key={idx}
                idx={idx}
                book={item}
                refreshResult={refreshResult}
              ></BookItem>
            ))}
            <div className="pagination">
              {result.pagination?.map(
                (pag: BookSearchPagination, idx: number) => (
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
          <Route path={`${path}/:bookId`}>
            <BookPage></BookPage>
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Book;
