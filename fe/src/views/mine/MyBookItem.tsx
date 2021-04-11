import React from 'react';
import { Link } from 'react-router-dom';
import { BookSearchItemType } from '../../models/book.model';

function MyBookItem(props: { book: BookSearchItemType }) {
  const { book } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + book.img} alt={book.title}></img>
      <div className="info">
        <Link to={`/book/${book.url}`}>{book.title}</Link>
        {book.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MyBookItem;
