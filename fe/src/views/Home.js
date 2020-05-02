import React, { Component } from "react";
import Movie from "../views/movie/Movie";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Movie></Movie>
      </div>
    );
  }
}

export default Home;
