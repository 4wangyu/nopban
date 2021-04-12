import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './pagination.scss';

const PAGES_TO_DISPLAY = 7;

const getPages = ({
  count,
  firstPage,
}: {
  count: number;
  firstPage: number;
}): number[] => {
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
  } else if (lastPage <= PAGES_TO_DISPLAY + 1) {
    pages = getPages({ count: lastPage, firstPage: 1 });
  } else if (currentPage <= Math.ceil(PAGES_TO_DISPLAY / 2.0) + 1) {
    pages = getPages({ count: PAGES_TO_DISPLAY, firstPage: 1 });
    displayLastPage = true;
  } else if (
    currentPage >=
    lastPage - (Math.floor(PAGES_TO_DISPLAY / 2.0) + 1)
  ) {
    pages = getPages({
      count: PAGES_TO_DISPLAY,
      firstPage: 1 + lastPage - PAGES_TO_DISPLAY,
    });
    displayFirstPage = true;
  } else {
    pages = getPages({
      count: PAGES_TO_DISPLAY,
      firstPage: 1 + currentPage - Math.ceil(PAGES_TO_DISPLAY / 2.0),
    });
    displayFirstPage = true;
    displayLastPage = true;
  }

  const getUrl = (p: number): string => {
    return `${pathname}?p=${p}`;
  };

  function FirstPage(props: { display: boolean }) {
    const { display } = props;
    return display ? (
      <>
        <NavLink to={getUrl(1)} className="page">
          1
        </NavLink>
        <span className="page">...</span>
      </>
    ) : (
      <></>
    );
  }

  function LastPage(props: { display: boolean; lastPage: number }) {
    const { display, lastPage } = props;
    return display ? (
      <>
        <span className="page">...</span>
        <NavLink to={getUrl(lastPage)} className="page">
          {lastPage}
        </NavLink>
      </>
    ) : (
      <></>
    );
  }

  return (
    <nav className="pagination">
      <NavLink to={getUrl(currentPage - 1)} isActive={() => currentPage > 1}>
        {'<'}前页
      </NavLink>
      <nav className="pages">
        <FirstPage display={displayFirstPage}></FirstPage>
        {pages.map((p) => (
          <NavLink
            key={p}
            to={getUrl(p)}
            className={classNames({ current: p === currentPage, page: true })}
          >
            {p}
          </NavLink>
        ))}
        <LastPage display={displayLastPage} lastPage={lastPage}></LastPage>
      </nav>
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
