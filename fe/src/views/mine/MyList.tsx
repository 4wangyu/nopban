import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CATEGORIES, DICT_NOUN, DICT_VERB } from '../../lib/constant';
import { handleError, useQuery } from '../../lib/util';
import { BookList, BookSearchItem } from '../../models/book.model';
import { MovieList, MovieSearchItem } from '../../models/movie.model';
import { MusicList, MusicSearchItem } from '../../models/music.model';
import { AuthContext } from '../../store/AuthProvider';
import BookItem from '../book/BookItem';
import MovieItem from '../movie/MovieItem';
import MusicItem from '../music/MusicItem';

type ListType = BookList | MovieList | MusicList;
const itemsPerPage = 12;

const MyList = () => {
  const location = useLocation();
  const category = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  );
  const page = +(useQuery().get('p') || 1);
  const [result, setResult] = useState<ListType>({
    items: [],
    total: 0,
  });
  const { context } = useContext(AuthContext);
  const token = context?.token;

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/mine/sublist`, {
          params: {
            category: category,
            count: itemsPerPage,
            offset: itemsPerPage * (page - 1),
          },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setResult(res.data);
        })
        .catch(handleError);
    }
  }, [category, page, token]);

  if (CATEGORIES.includes(category)) {
    return (
      <div>
        <h1>
          我{DICT_VERB[category]}过的{DICT_NOUN[category]}({result?.total})
        </h1>
        <ItemList category={category} result={result}></ItemList>
      </div>
    );
  } else {
    return <></>;
  }
};

export default MyList;

function ItemList(props: { category: string; result: ListType }) {
  const { category, result } = props;
  switch (category) {
    case 'book':
      return (
        <div>
          {(result as BookList).items?.map(
            (item: BookSearchItem, idx: number) => (
              <BookItem key={idx} book={item}></BookItem>
            )
          )}
        </div>
      );
    case 'movie':
      return (
        <div>
          {(result as MovieList).items?.map(
            (item: MovieSearchItem, idx: number) => (
              <MovieItem key={idx} movie={item}></MovieItem>
            )
          )}
        </div>
      );
    case 'music':
      return (
        <div>
          {(result as MusicList).items?.map(
            (item: MusicSearchItem, idx: number) => (
              <MusicItem key={idx} music={item}></MusicItem>
            )
          )}
        </div>
      );
    default:
      return <></>;
  }
}
