import React from 'react';
import { Link } from 'react-router-dom';
import { MY_ITEM_TYPE } from '../../lib/constant';

function MyItem(props: { category: string; item: MY_ITEM_TYPE }) {
  const { category, item } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + item.img} alt={item.title}></img>
      <div className="info">
        <Link to={`/${category}/${item.url}`}>{item.title}</Link>
        {item.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        {item.rating}
      </div>
    </div>
  );
}

export default MyItem;
