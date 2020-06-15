import axios from 'axios';
import React, { useContext } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../store/AuthProvider';
import { BookSearchItem } from '../../models/book.model';
import { handleError } from '../../lib/util';

function BookItem(props: {
  idx: number;
  book: BookSearchItem;
  refreshResult: (idx: number, book: BookSearchItem) => void;
}) {
  const { context, dispatch } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const { idx, book, refreshResult } = props;

  function addBook() {
    axios({
      method: 'post',
      url: '/api/book/object',
      data: { url: book.url },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        const b = res.data as BookSearchItem;
        refreshResult(idx, b);
        toast.success(`${b.title} added`);
      })
      .catch(handleError);
  }

  function showPage(url: string) {
    dispatch({
      type: 'UPDATE_IFRAME',
      iframeUrl: url,
    });
  }

  return (
    <div className="search-item">
      {book.saved && (
        <img src={'data:image;base64,' + book.img} alt={book.title}></img>
      )}

      <div className="info">
        {book.saved ? (
          <Link to={`${url}/${book.url}`}>{book.title}</Link>
        ) : (
          <button className="title" onClick={() => showPage(book.url)}>
            {book.title}
          </button>
        )}
        {context?.isAuthenticated && !book.saved && (
          <button className="add" title="添加" onClick={addBook}>
            <i className="fa fa-plus"></i>
          </button>
        )}

        {book.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default BookItem;
