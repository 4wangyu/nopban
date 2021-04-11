import React from 'react';
import { Link } from 'react-router-dom';
import { MyMovieItemType } from '../../models/movie.model';

function MyMovieItem(props: { item: MyMovieItemType }) {
  const { item } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + item.img} alt={item.title}></img>
      <div className="info">
        <Link to={`/movie/${item.url}`}>{item.title}</Link>
        {item.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        {item.rating}
      </div>
    </div>
  );
}

export default MyMovieItem;
