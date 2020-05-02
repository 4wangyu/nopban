import React from "react";
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

const Anchor = styled.a`
  color: #d5d5d5;
  padding: 0 12px;
  text-decoration: initial;
`;

const Header = () => {
  const { context } = React.useContext(AppContext);

  return (
    <Nav>
      <section>
        <Anchor href="/">读书</Anchor>
        <Anchor href="/">电影</Anchor>
        <Anchor href="/">音乐</Anchor>
        <Anchor href="/">作者</Anchor>
      </section>
      <section>
        {context.isAuthenticated ? (
          <Anchor href="/">{context.user?.name + "的账号"}</Anchor>
        ) : (
          <Anchor href="/">登录/注册</Anchor>
        )}
      </section>
    </Nav>
  );
};

export default Header;
