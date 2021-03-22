import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { handleError } from '../lib/util';
import { Book } from '../models/book.model';
import { MyMovie } from '../models/movie.model';
import { Music } from '../models/music.model';
import { AuthContext } from '../store/AuthProvider';

type ItemType = Book | MyMovie | Music;

const dictionary: { [key: string]: string } = {
  book: '读',
  movie: '看',
  music: '听',
};

const quanfitier: { [key: string]: string } = {
  book: '本',
  movie: '部',
  music: '张',
};

const My = (props: { category: string }) => {
  const { category } = props;
  const [total, setTotal] = useState();
  const [result, setResult] = useState<ItemType[]>([]);
  const { context, dispatch } = useContext(AuthContext);
  const token = context?.token;

  const mystyle: { [key: string]: string } = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/mine/total`, {
          params: { category: category },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setTotal(res.data?.total);
        })
        .catch(handleError);
    }
  }, [category, token]);

  return (
    <div>
      <div>
        我{dictionary[category]}: ({total}
        {quanfitier[category]}
        {dictionary[category]}过)
      </div>
      <div style={mystyle}>
        <div>{dictionary[category]}过</div>
        {result?.map((item: ItemType, idx: number) => (
          <div>
            <img src={'data:image;base64,' + item.img} alt={item.title}></img>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default My;
