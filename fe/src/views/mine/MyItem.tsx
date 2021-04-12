import React from 'react';
import { Link } from 'react-router-dom';
import { MyRating } from '../../components/Rating';
import { MyItemType } from '../../lib/constant';

function MyItem(props: { category: string; item: MyItemType }) {
  const { category, item } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + item.img} alt={item.title}></img>
      <div className="info">
        <Link to={`/${category}/${item.url}`}>{item.title}</Link>
        {item.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <div className="my-item-info">
          <div className="my-info">
            <MyRating rating={item.rating}></MyRating>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyItem;
