import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { handleError } from '../lib/util';
import { AuthContext } from '../store/AuthProvider';

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
        .get(`/api/mine/total`,{
          params: {category: category},
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
        <div>pic1</div>
        <div>pic2</div>
        <div>pic3</div>
        <div>pic4</div>
        <div>pic5</div>
      </div>
    </div>
  );
};

export default My;
