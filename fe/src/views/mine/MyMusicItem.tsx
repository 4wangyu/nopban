import React from 'react';
import { Link } from 'react-router-dom';
import { MyMusicItemType } from '../../models/music.model';

function MyMusicItem(props: { item: MyMusicItemType }) {
  const { item } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + item.img} alt={item.title}></img>
      <div className="info">
        <Link to={`/music/${item.url}`}>{item.title}</Link>
        {item.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        {item.rating}
      </div>
    </div>
  );
}

export default MyMusicItem;
