import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../App";

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 28px;
  z-index: 1;
  background-color: #545652;

  font-size: 12px;
  display: flex;
  justify-content: space-between;
  line-height: 28px;
`;

const Span = styled.span`
  color: #d5d5d5;
  padding: 0 12px;
  text-decoration: initial;
`;

const Header = () => {
  const { context } = React.useContext(AppContext);

  return (
    <Nav>
      <section>
        <Link to="/book">
          <Span>读书</Span>
        </Link>
        <Link to="/movie">
          <Span>电影</Span>
        </Link>
        <Link to="/music">
          <Span>音乐</Span>
        </Link>
        <Link to="/author">
          <Span>作者</Span>
        </Link>
      </section>

      <section>
        {context.isAuthenticated ? (
          <Span>{context.user?.name + "的账号"}</Span>
        ) : (
          <Span>登录/注册</Span>
        )}
      </section>
    </Nav>
  );
};

export default Header;
