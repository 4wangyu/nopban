import React from 'react';
import { NavLink } from 'react-router-dom';
import './pagination.scss';

const Pagination = (props: {
  category: string;
  currentPage: number;
  lastPage: number;
}) => {
  const { category, currentPage, lastPage } = props;

  return (
    <nav className="pagination">
      <NavLink
        to={`/mylist/${category}?p=${currentPage - 1}`}
        isActive={() => currentPage > 1}
      >
        {'<'}前页
      </NavLink>
      <NavLink
        to={`/mylist/${category}?p=${currentPage + 1}`}
        isActive={() => currentPage < lastPage}
      >
        后页{'>'}
      </NavLink>
    </nav>
  );
};

export default Pagination;
