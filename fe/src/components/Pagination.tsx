import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './pagination.scss';

const pagesToDislay = 5;

const Pagination = (props: { currentPage: number; lastPage: number }) => {
  const { currentPage, lastPage } = props;
  const pathname = useLocation().pathname;

  let pages: number[];
  let displayFirstPage: boolean = false;
  let displayLastPage: boolean = false;

  if (!lastPage) {
    pages = [];
  } else if (lastPage <= pagesToDislay + 1) {
    pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  } else if (currentPage <= Math.ceil(pagesToDislay / 2.0) + 1) {
    pages = Array.from({ length: pagesToDislay }, (_, i) => i + 1);
    displayLastPage = true;
  } else if (currentPage >= lastPage - (Math.floor(pagesToDislay / 2.0) + 1)) {
    pages = Array.from(
      { length: pagesToDislay },
      (_, i) => i + 1 + lastPage - pagesToDislay
    );
    displayFirstPage = true;
  } else {
    pages = Array.from(
      { length: pagesToDislay },
      (_, i) => i + 1 + currentPage - Math.ceil(pagesToDislay / 2.0)
    );
    displayFirstPage = true;
    displayLastPage = true;
  }

  const getUrl = (p: number): string => {
    return `${pathname}?p=${p}`;
  };

  function FirstPage(props: { displatFirstPage: boolean }) {
    const { displatFirstPage } = props;
    if (displatFirstPage) {
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

  function LastPage(props: { displatLastPage: boolean; lastPage: number }) {
    const { displatLastPage, lastPage } = props;
    if (displatLastPage) {
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
      <FirstPage displatFirstPage={displayFirstPage}></FirstPage>
      {pages.map((p) => (
        <NavLink key={p} to={getUrl(p)} isActive={() => currentPage !== p}>
          {p}
        </NavLink>
      ))}
      <LastPage
        displatLastPage={displayLastPage}
        lastPage={lastPage}
      ></LastPage>
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
