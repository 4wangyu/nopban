import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../../components/Rating';
import { BOOK_URL } from '../../lib/constant';
import { Book } from '../../models/book.model';
import { AuthContext } from '../../store/AuthProvider';

function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  const [rating, setRating] = useState<number>();
  const { context, dispatch } = useContext(AuthContext);
  const token = context?.token;

  useEffect(() => {
    axios
      .get(`/api/book/object/${bookId}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bookId]);

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/book/rating`, {
          params: { uuid: bookId },
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
  }, [bookId, token]);

  function showPage(url: string) {
    if (url.includes(BOOK_URL)) {
      dispatch({
        type: 'UPDATE_IFRAME',
        iframeUrl: url,
      });
    } else {
      dispatch({
        type: 'UPDATE_IFRAME',
        iframeUrl: BOOK_URL + url,
      });
    }
  }

  function rate(r: number) {
    axios({
      method: 'post',
      url: '/api/book/rating',
      data: { prevRating: rating, nextRating: r, uuid: bookId },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        setRating(res.data.rating);
        //success toast
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function deleteRating() {
    axios({
      method: 'delete',
      url: '/api/book/rating',
      data: { uuid: bookId },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        setRating(undefined);
        //success toast
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  return (
    <div className="info-page">
      {book && (
        <>
          <h1>{book?.title}</h1>

          <div className="content">
            <img src={'data:image;base64,' + book?.img} alt={book?.title}></img>
            <section>
              {book?.writers.length ? (
                <div>
                  <label>作者: </label>
                  <output>
                    {book?.writers
                      ?.map<React.ReactNode>((o, i) => (
                        <button key={i} onClick={() => showPage(o.link)}>
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
                <label>出版社: </label>
                <output>{book?.publisher}</output>
              </div>
              <div>
                <label>副标题: </label>
                <output>{book?.subtitle}</output>
              </div>
              {book?.origin_title && (
                <div>
                  <label>原作名: </label>
                  <output>{book?.origin_title}</output>
                </div>
              )}
              {book?.translators.length ? (
                <div>
                  <label>译者: </label>
                  <output>
                    {book?.translators
                      ?.map<React.ReactNode>((o, i) => (
                        <button key={i} onClick={() => showPage(o.link)}>
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
                <label>出版年: </label>
                <output>{book?.publish_time}</output>
              </div>
              <div>
                <label>页数: </label>
                <output>{book?.page_count}</output>
              </div>
              <div>
                <label>定价: </label>
                <output>{book?.price}</output>
              </div>
              <div>
                <label>ISBN: </label>
                <output>{book?.isbn}</output>
              </div>
              <div>
                <label>豆瓣链接: </label>
                <output>
                  <button onClick={() => showPage('/subject/' + bookId)}>
                    {bookId}
                  </button>
                </output>
              </div>
            </section>
          </div>
        </>
      )}

      {context?.isAuthenticated && book && (
        <Rating
          rating={rating}
          rate={rate}
          deleteRating={deleteRating}
        ></Rating>
      )}
    </div>
  );
}

export default BookPage;
