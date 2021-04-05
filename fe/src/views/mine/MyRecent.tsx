import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DICT_QUANTIFIER, DICT_VERB } from '../../lib/constant';
import { handleError } from '../../lib/util';
import { Book } from '../../models/book.model';
import { MyMovie } from '../../models/movie.model';
import { Music } from '../../models/music.model';
import { AuthContext } from '../../store/AuthProvider';

type ItemType = Book | MyMovie | Music;

const MyRecent = (props: { category: string }) => {
  const { context } = useContext(AuthContext);
  const token = context?.token;
  const { category } = props;
  const [total, setTotal] = useState();
  const [result, setResult] = useState<ItemType[]>([]);

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
          setTotal(res.data);
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
    <div className="my-recent">
      <div className="summary">
        <span className="summary-title">我{DICT_VERB[category]}</span>
        <span className="summary-title">
          &nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;
        </span>
        <Link to={`/mylist/${category}`} className="summary-number">
          ({total}
          {DICT_QUANTIFIER[category]}
          {DICT_VERB[category]}过)
        </Link>
      </div>
      <div className="list">
        <div className="status">{DICT_VERB[category]}过</div>
        {result?.map((item: ItemType, idx: number) => (
          <Link
            title={item.title}
            to={`/${category}/${item.uuid}`}
            key={idx.toString()}
            className="item"
          >
            <img src={'data:image;base64,' + item.img} alt={item.title}></img>
            <div className="title">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyRecent;
