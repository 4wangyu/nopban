import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './pagination.scss';

const pagesToDislay = 5;

interface getPagesArgType {
  count: number;
  firstPage: number;
}

const getPages = ({ count, firstPage }: getPagesArgType): number[] => {
  return Array.from({ length: count }, (_, i) => i + firstPage);
};

const Pagination = (props: { currentPage: number; lastPage: number }) => {
  const { currentPage, lastPage } = props;
  const pathname = useLocation().pathname;

  let pages: number[];
  let displayFirstPage: boolean = false;
  let displayLastPage: boolean = false;

  if (!lastPage) {
    pages = [];
  } else if (lastPage <= pagesToDislay + 1) {
    pages = getPages({ count: lastPage, firstPage: 1 });
  } else if (currentPage <= Math.ceil(pagesToDislay / 2.0) + 1) {
    pages = getPages({ count: pagesToDislay, firstPage: 1 });
    displayLastPage = true;
  } else if (currentPage >= lastPage - (Math.floor(pagesToDislay / 2.0) + 1)) {
    pages = getPages({
      count: pagesToDislay,
      firstPage: 1 + lastPage - pagesToDislay,
    });
    displayFirstPage = true;
  } else {
    pages = getPages({
      count: pagesToDislay,
      firstPage: 1 + currentPage - Math.ceil(pagesToDislay / 2.0),
    });
    displayFirstPage = true;
    displayLastPage = true;
  }

  const getUrl = (p: number): string => {
    return `${pathname}?p=${p}`;
  };

  function FirstPage(props: { display: boolean }) {
    const { display } = props;
    if (display) {
      return (
        <>
          <NavLink to={getUrl(1)}>1</NavLink>
          <span>...</span>
        </>
      );
    } else {
      return <></>;
    }
  }

  function LastPage(props: { display: boolean; lastPage: number }) {
    const { display, lastPage } = props;
    if (display) {
      return (
        <>
          <span>...</span>
          <NavLink to={getUrl(lastPage)}>{lastPage}</NavLink>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <nav className="pagination">
      <NavLink to={getUrl(currentPage - 1)} isActive={() => currentPage > 1}>
        {'<'}前页
      </NavLink>
      <FirstPage display={displayFirstPage}></FirstPage>
      {pages.map((p) => (
        <NavLink key={p} to={getUrl(p)} isActive={() => currentPage !== p}>
          {p}
        </NavLink>
      ))}
      <LastPage display={displayLastPage} lastPage={lastPage}></LastPage>
      <NavLink
        to={getUrl(currentPage + 1)}
        isActive={() => currentPage < lastPage}
      >
        后页{'>'}
      </NavLink>
    </nav>
  );
};

export default Pagination;
