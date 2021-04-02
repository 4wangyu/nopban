import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { handleError } from '../../lib/util';
import { BookSearchItem, BookSearchResult } from '../../models/book.model';
import { MovieSearchItem, MovieSearchResult } from '../../models/movie.model';
import { MusicSearchItem, MusicSearchResult } from '../../models/music.model';
import { AuthContext } from '../../store/AuthProvider';
import BookItem from '../book/BookItem';
import MovieItem from '../movie/MovieItem';
import MusicItem from '../music/MusicItem';
import { useLocation } from 'react-router-dom';

type SearchResultType =
  | BookSearchResult
  | MovieSearchResult
  | MusicSearchResult;
type ItemType = BookSearchItem | MovieSearchItem | MusicSearchItem;

const MyList = () => {
  const itemPerPage = 15;

  const location = useLocation();
  const category = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  );

  const [result, setResult] = useState<SearchResultType>({
    items: [],
    pagination: [],
  });
  const { context } = useContext(AuthContext);
  const token = context?.token;

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/mine/pagination`, {
          params: { category: category },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setResult(res.data);
        })
        .catch(handleError);
    }
  }, [category, token]);

  function refreshResult(idx: number, item: ItemType) {}

  switch (category) {
    case 'book':
      return (
        <div>
          {category}
          {(result as BookSearchResult).items?.map(
            (item: BookSearchItem, idx: number) => (
              <BookItem
                key={idx}
                idx={idx}
                book={item}
                refreshResult={refreshResult}
              ></BookItem>
            )
          )}
        </div>
      );
    case 'movie':
      return (
        <div>
          {category}
          {(result as MovieSearchResult).items?.map(
            (item: MovieSearchItem, idx: number) => (
              <MovieItem
                key={idx}
                idx={idx}
                movie={item}
                refreshResult={refreshResult}
              ></MovieItem>
            )
          )}
        </div>
      );
    case 'music':
      return (
        <div>
          {category}
          {(result as MusicSearchResult).items?.map(
            (item: MusicSearchItem, idx: number) => (
              <MusicItem
                key={idx}
                idx={idx}
                music={item}
                refreshResult={refreshResult}
              ></MusicItem>
            )
          )}
        </div>
      );
    default:
      return <div>category not found</div>;
  }
};

export default MyList;
