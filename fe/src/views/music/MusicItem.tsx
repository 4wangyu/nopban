import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleError } from '../../lib/util';
import { MusicSearchItem } from '../../models/music.model';
import { AuthContext } from '../../store/AuthProvider';

function MusicItem(props: {
  idx: number;
  music: MusicSearchItem;
  refreshResult: (idx: number, music: MusicSearchItem) => void;
}) {
  const { context, dispatch } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const { idx, music, refreshResult } = props;

  function addItem() {
    axios({
      method: 'post',
      url: '/api/music/object',
      data: { url: music.url },
      headers: {
        Authorization: 'Bearer ' + context?.token,
      },
    })
      .then(function (res) {
        const m = res.data as MusicSearchItem;
        refreshResult(idx, m);
        toast.success(`${m.title} added.`);
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
      {music.saved && (
        <img src={'data:image;base64,' + music.img} alt={music.title}></img>
      )}

      <div className="info">
        {music.saved ? (
          <Link to={`${url}/${music.url}`}>{music.title}</Link>
        ) : (
          <button className="title" onClick={() => showPage(music.url)}>
            {music.title}
          </button>
        )}
        {context?.isAuthenticated && !music.saved && (
          <button className="add" title="添加" onClick={addItem}>
            <i className="fa fa-plus"></i>
          </button>
        )}

        {music.metas?.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}

export default MusicItem;
