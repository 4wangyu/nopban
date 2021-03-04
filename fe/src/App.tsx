import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Split from 'react-split';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Douban from './douban/Douban';
import Header from './header/Header';
import AuthProvider from './store/AuthProvider';
import Home from './views/Home';

const App = () => {
  let sizes: number[] | string | null = localStorage.getItem('split-sizes');
  sizes = sizes ? JSON.parse(sizes) : [0, 100];

  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Split
          className="app"
          sizes={sizes}
          minSize={0}
          expandToMin={true}
          gutterSize={4}
          onDragEnd={function (sizes: number[]) {
            localStorage.setItem('split-sizes', JSON.stringify(sizes));
          }}
        >
          <Home />
          <Douban />
        </Split>
        <ToastContainer position="bottom-left" autoClose={1500}/>
      </Router>
    </AuthProvider>
  );
};

export default App;
