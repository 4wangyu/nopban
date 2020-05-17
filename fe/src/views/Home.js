import React from "react";
import { Route, Switch } from "react-router-dom";
import Book from "../views/book/Book";
import Movie from "../views/movie/Movie";
import Author from "./author/Author";
import Celebrity from "./celebrity/Celebrity";
import "./home.css";
import Music from "./music/Music";
import Musician from "./musician/Musician";

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
      </Switch>
    </div>
  );
};

export default Home;
