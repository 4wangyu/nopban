import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { AppContext } from '../App';
import './header.scss';
import AuthModal from './modal/AuthModal';

const Nav = styled.nav`
  background-color: #545652;
  display: flex;

  font-size: 12px;
  height: 28px;
  justify-content: space-between;
  line-height: 28px;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const Span = styled.span`
  color: #d5d5d5;
  padding: 0 12px;
  text-decoration: initial;
`;

const UPDATE_IFRAME_ACTION = {
  BOOK: {
    type: 'UPDATE_IFRAME',
    iframeUrl: 'https://book.douban.com',
  },
  MOVIE: {
    type: 'UPDATE_IFRAME',
    iframeUrl: 'https://movie.douban.com',
  },
  MUSIC: {
    type: 'UPDATE_IFRAME',
    iframeUrl: 'https://music.douban.com',
  },
};

const Header = () => {
  const { context, dispatch } = React.useContext(AppContext);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Nav className="header">
      <section>
        <Link to="/book" onClick={() => dispatch(UPDATE_IFRAME_ACTION.BOOK)}>
          <Span>读书</Span>
        </Link>
        <Link to="/movie" onClick={() => dispatch(UPDATE_IFRAME_ACTION.MOVIE)}>
          <Span>电影</Span>
        </Link>
        <Link to="/music" onClick={() => dispatch(UPDATE_IFRAME_ACTION.MUSIC)}>
          <Span>音乐</Span>
        </Link>
        <Link to="/author" onClick={() => dispatch(UPDATE_IFRAME_ACTION.BOOK)}>
          <Span>作者</Span>
        </Link>
        <Link
          to="/celebrity"
          onClick={() => dispatch(UPDATE_IFRAME_ACTION.MOVIE)}
        >
          <Span>影人</Span>
        </Link>
        <Link
          to="/musician"
          onClick={() => dispatch(UPDATE_IFRAME_ACTION.MUSIC)}
        >
          <Span>音乐人</Span>
        </Link>
      </section>

      <section>
        {context?.isAuthenticated ? (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              {context?.user + '的账号'}
              <span className="icon-arrow-down">&#9662;</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div>
                <Link to="/mine">个人主页</Link>
              </div>
              <div>
                <button>退出</button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
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
