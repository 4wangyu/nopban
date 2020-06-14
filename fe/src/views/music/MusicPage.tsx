import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../../components/Rating';
import { MUSIC_URL } from '../../lib/constant';
import { AuthContext } from '../../store/AuthProvider';
import { Music } from '../../models/music.model';

function BookPage() {
  const { musicId } = useParams();
  const [music, setMusic] = useState<Music>();
  const [rating, setRating] = useState<number>();
  const { context, dispatch } = useContext(AuthContext);
  const token = context?.token;

  useEffect(() => {
    axios
      .get(`/api/music/object/${musicId}`)
      .then((res) => {
        setMusic(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [musicId]);

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/music/rating`, {
          params: { uuid: musicId },
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
  }, [musicId, token]);

  function showPage(url: string) {
    dispatch({
      type: 'UPDATE_IFRAME',
      iframeUrl: MUSIC_URL + url,
    });
  }

  function rate(r: number) {
    axios({
      method: 'post',
      url: '/api/music/rating',
      data: { prevRating: rating, nextRating: r, uuid: musicId },
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
      url: '/api/music/rating',
      data: { uuid: musicId },
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
      {music && (
        <>
          <h1>{music?.title}</h1>

          <div className="content">
            <img
              src={'data:image;base64,' + music?.img}
              alt={music?.title}
            ></img>
            <section>
              <div>
                <label>表演者: </label>
                <output>
                  {music?.musician
                    ?.map<React.ReactNode>((o, i) => (
                      <button key={i} onClick={() => showPage(o.link)}>
                        {o.name}
                      </button>
                    ))
                    .reduce((prev, curr) => [prev, ' / ', curr])}
                </output>
              </div>
              <div>
                <label>流派: </label>
                <output>{music?.genre}</output>
              </div>
              <div>
                <label>专辑类型: </label>
                <output>{music?.album_type}</output>
              </div>
              <div>
                <label>介质: </label>
                <output>{music?.medium}</output>
              </div>
              <div>
                <label>发行时间: </label>
                <output>{music?.publish_time}</output>
              </div>
              <div>
                <label>出版者: </label>
                <output>{music?.publisher}</output>
              </div>
              <div>
                <label>唱片数: </label>
                <output>{music?.cd_count}</output>
              </div>
              <div>
                <label>条形码: </label>
                <output>{music?.barcode}</output>
              </div>
              <div>
                <label>豆瓣链接: </label>
                <output>
                  <button onClick={() => showPage('/subject/' + musicId)}>
                    {musicId}
                  </button>
                </output>
              </div>
            </section>
          </div>
        </>
      )}

      {context?.isAuthenticated && music && (
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
