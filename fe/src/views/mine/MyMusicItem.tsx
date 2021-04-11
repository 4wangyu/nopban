import React from 'react';
import { Link } from 'react-router-dom';
import { MusicSearchItemType } from '../../models/music.model';

function MyMusicItem(props: { music: MusicSearchItemType }) {
  const { music } = props;

  return (
    <div className="my-list-item">
      <img src={'data:image;base64,' + music.img} alt={music.title}></img>
      <div className="info">
        <Link to={`/music/${music.url}`}>{music.title}</Link>
        {music.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MyMusicItem;
