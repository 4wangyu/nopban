import React from "react";
import { Route, Switch } from "react-router-dom";
import Book from "./book/Book";
import Movie from "./movie/Movie";
import Author from "./author/Author";
import Celebrity from "./celebrity/Celebrity";
import "./home.scss";
import Music from "./music/Music";
import Musician from "./musician/Musician";
import Mine from "./mine/Mine";

const Home = () => {
  return (
    <div className="home">
      <Switch>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/movie">
          <Movie />
        </Route>
        <Route path="/music">
          <Music />
        </Route>
        <Route path="/author">
          <Author />
        </Route>
        <Route path="/celebrity">
          <Celebrity />
        </Route>
        <Route path="/musician">
          <Musician />
        </Route>
        <Route path="/mine">
          <Mine />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
