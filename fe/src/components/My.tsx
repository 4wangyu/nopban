import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from '../lib/util';
import { Book } from '../models/book.model';
import { MyMovie } from '../models/movie.model';
import { Music } from '../models/music.model';
import { AuthContext } from '../store/AuthProvider';

type ItemType = Book | MyMovie | Music;

const verb: { [key: string]: string } = {
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
  const { context } = useContext(AuthContext);
  const token = context?.token;

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

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/mine/latestfive`, {
          params: { category: category },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setResult(res.data);
        })
        .catch(handleError);
    }
  }, [category, token]);

  return (
    <div className="item-list">
      <div className="summary">
        <span className="summary-title">我{verb[category]}</span>
        <span className="summary-title">
          &nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;
        </span>
        <span className="summary-number">
          ({total}
          {quanfitier[category]}
          {verb[category]}过)
        </span>
      </div>
      <div className="list">
        <div className="status">{verb[category]}过</div>
        {result?.map((item: ItemType, idx: number) => (
          <Link title={item.title} to={`${category}/${item.uuid}`} key={idx.toString()} className="item">
            <img src={'data:image;base64,' + item.img} alt={item.title}></img>
            <div className="title">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default My;
