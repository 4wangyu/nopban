import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { MovieSearchResult } from '../models/movie.model';

const Input = styled.input`
  border: 3px solid #8c949e;
  border-radius: 5px 0 0 5px;
  border-right: 0;
  font-size: 13px;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background: #8c949e;
  border: 1px solid #8c949e;
  border-radius: 0 5px 5px 0;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  height: 36px;
  text-align: center;
  width: 40px;
`;

const Search = styled.div`
  display: flex;
  margin: 20px auto;
  position: relative;
  width: 84%;
`;

const SearchBar = (props: {
  url: string;
  callback: Dispatch<SetStateAction<MovieSearchResult>>;
}) => {
  const [query, setQuery] = React.useState('');

  const search = () => {
    axios
      .get(`${props.url}${query}`)
      .then(function (response) {
        props.callback(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <Search>
        <Input value={query} onChange={(e) => setQuery(e.target.value)}></Input>
        <Button onClick={() => search()}>
          <i className="fa fa-search"></i>
        </Button>
      </Search>
    </>
  );
};

export default SearchBar;
