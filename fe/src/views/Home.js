import React from "react";
import { Route, Switch } from "react-router-dom";
import Book from "../views/book/Book";
import Movie from "../views/movie/Movie";
import "./home.css";
import Music from "./music/Music";
import Author from "./author/Author";

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
      </Switch>
    </div>
  );
};

export default Home;
