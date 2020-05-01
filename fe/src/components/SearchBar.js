import React, { Component } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 3px solid #8c949e;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 13px;
`;

const Button = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #8c949e;
  background: #8c949e;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const Search = styled.div`
  position: relative;
  display: flex;
  width: 84%;
  margin: 20px auto;
`;

class SearchBar extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <>
        <Search>
          <Input></Input>
          <Button>
            <i className="fa fa-search"></i>
          </Button>
        </Search>
      </>
    );
  }
}

export default SearchBar;
