import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleError } from '../../lib/util';
import { BookSearchItem } from '../../models/book.model';
import { AuthContext } from '../../store/AuthProvider';

function BookItem(props: {
  book: BookSearchItem;
  idx?: number;
  refreshResult?: (idx: number, book: BookSearchItem) => void;
}) {
  const { context, dispatch } = useContext(AuthContext);
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
        refreshResult && idx !== undefined && refreshResult(idx, b);
        toast.success(`${b.title} 添加成功.`);
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
          <Link to={`/book/${book.url}`}>{book.title}</Link>
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
