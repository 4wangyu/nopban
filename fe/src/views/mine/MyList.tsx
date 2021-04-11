import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../components/Pagination';
import {
  CATEGORIES,
  DICT_NOUN,
  DICT_VERB,
  MY_ITEM_TYPE,
  MY_SUB_LIST_TYPE,
} from '../../lib/constant';
import { handleError, scrollToTop, useQuery } from '../../lib/util';
import { AuthContext } from '../../store/AuthProvider';
import MyItem from './MyItem';

const ITEM_PER_PAGE = 10;

const MyListPage = styled.div`
  margin: auto;
  width: 84%;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin: 30px 0px;
  color: #494949;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #999;
  font-size: 13px;
  margin-bottom: 30px;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 5px;
`;

const MyList = () => {
  const { context } = useContext(AuthContext);
  const token = context?.token;
  const [result, setResult] = useState<MY_SUB_LIST_TYPE>({
    items: [],
    total: 0,
  });
  const pathname = useLocation().pathname;
  const category = pathname.substring(pathname.lastIndexOf('/') + 1);

  const lastPage = Math.ceil((result?.total * 1.0) / ITEM_PER_PAGE);
  const currentPage = usePageParam(lastPage);
  const startNumber = (currentPage - 1) * ITEM_PER_PAGE + 1;
  const endNumber =
    currentPage * ITEM_PER_PAGE < result?.total
      ? currentPage * ITEM_PER_PAGE
      : result?.total;

  function usePageParam(lastPage: number) {
    const p = +(useQuery().get('p') || 1);
    if (lastPage) {
      return p < 1 || isNaN(p) ? 1 : p > lastPage ? lastPage : p;
    } else {
      return p < 1 || isNaN(p) ? 1 : p;
    }
  }

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/mine/sublist`, {
          params: {
            category: category,
            count: ITEM_PER_PAGE,
            offset: ITEM_PER_PAGE * (currentPage - 1),
          },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setResult(res.data);
          scrollToTop();
        })
        .catch(handleError);
    }
  }, [category, currentPage, token]);

  return CATEGORIES.includes(category) ? (
    <MyListPage>
      <Title>
        我{DICT_VERB[category]}过的{DICT_NOUN[category]}({result?.total})
      </Title>
      <Info>
        <span>按时间排序</span>
        <span>
          {startNumber}-{endNumber} / {result?.total}
        </span>
      </Info>
      <div>
        {(result.items as MY_ITEM_TYPE[])?.map(
          (item: MY_ITEM_TYPE, idx: number) => (
            <MyItem key={idx} category={category} item={item}></MyItem>
          )
        )}
      </div>
      <Pagination currentPage={currentPage} lastPage={lastPage}></Pagination>
    </MyListPage>
  ) : (
    <></>
  );
};

export default MyList;
