import React, { Component } from "react";
import Header from "../header/Header";
import Movie from "../views/movie/Movie";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <Movie></Movie>
      </div>
    );
  }
}

export default Home;
