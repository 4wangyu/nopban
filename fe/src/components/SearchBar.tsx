import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';

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
  padding: 0;
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
  searchKey: string;
  setSearchKey: (s: string) => void;
  onButtonClick: () => void;
}) => {
  const [inbound, setInbound] = useState<boolean>(true);

  useEffect(() => {
    const savedInbound = JSON.parse(
      localStorage.getItem('inbound') || 'true'
    ) as boolean;
    setInbound(savedInbound);
  }, []);

  useHotkeys('alt+n', () => {
    setInbound((inbound) => {
      localStorage.setItem('inbound', JSON.stringify(!inbound));
      return !inbound;
    });
  });

  function handleClick() {
    if (props.searchKey) {
      props.onButtonClick();
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <>
      <Search>
        <Input
          value={props.searchKey}
          onKeyDown={handleKeyDown}
          onChange={(e) => props.setSearchKey(e.target.value)}
        ></Input>
        <Button onClick={handleClick}>
          <i className={inbound ? 'icon-nopban' : 'icon-douban'}></i>
        </Button>
      </Search>
    </>
  );
};

export default SearchBar;
