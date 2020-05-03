import React from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../App";
import AuthModal from "./modal/AuthModal";
import "./header.css";

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

const UPDATE_IFRAME_ACTION = {
  BOOK: {
    type: "UPDATE_IFRAME",
    iframeUrl: "https://book.douban.com",
  },
  MOVIE: {
    type: "UPDATE_IFRAME",
    iframeUrl: "https://movie.douban.com",
  },
  MUSIC: {
    type: "UPDATE_IFRAME",
    iframeUrl: "https://music.douban.com",
  },
};

const Header = () => {
  const { context, dispatch } = React.useContext(AppContext);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Nav>
      <section>
        <Redirect exact from="/" to="/book" />
        <Link to="/book" onClick={() => dispatch(UPDATE_IFRAME_ACTION.BOOK)}>
          <Span>读书</Span>
        </Link>
        <Link to="/movie" onClick={() => dispatch(UPDATE_IFRAME_ACTION.MOVIE)}>
          <Span>电影</Span>
        </Link>
        <Link to="/music" onClick={() => dispatch(UPDATE_IFRAME_ACTION.MUSIC)}>
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
          <>
            <button onClick={() => setModalShow(true)}>
              <Span>登录/注册</Span>
            </button>
            <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
          </>
        )}
      </section>
    </Nav>
  );
};

export default Header;
