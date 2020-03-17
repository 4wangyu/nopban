import React, { Component } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  height: 28px;
  color: #d5d5d5;
  background-color: #545652;
  font: 12px Helvetica, Arial, sans-serif;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  line-height: 28px;
`;

const Anchor = styled.a`
  padding: 0 12px;
`;

class Header extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Nav>
        <section>
          <Anchor href>首页</Anchor>
          <Anchor href>读书</Anchor>
          <Anchor href>电影</Anchor>
          <Anchor href>音乐</Anchor>
          <Anchor href>作者</Anchor>
        </section>
        <section>
          <Anchor href>登录/注册</Anchor>
        </section>
      </Nav>
    );
  }
}

export default Header;
