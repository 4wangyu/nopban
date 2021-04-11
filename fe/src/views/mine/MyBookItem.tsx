import React from 'react';
import { Link } from 'react-router-dom';
import { MyBookItemType } from '../../models/book.model';

function MyBookItem(props: { item: MyBookItemType }) {
  const { item } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + item.img} alt={item.title}></img>
      <div className="info">
        <Link to={`/book/${item.url}`}>{item.title}</Link>
        {item.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        {item.rating}
      </div>
    </div>
  );
}

export default MyBookItem;
