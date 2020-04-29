import React, { Component } from "react";
import Split from "react-split";
import Home from "./views/Home";
import Douban from "./views/Douban";
import "./App.css";

class App extends Component {
  state = {
    books: null,
  };

  componentDidMount() {}

  fetchBooks = async () => {
    const response = await fetch(`/books`);
    const books = await response.json();
    this.setState({ books });
  };

  render() {
    return (
      <Split className="app" minSize={400} gutterSize={4}>
        <Home />
        <Douban />
      </Split>
    );
  }
}

export default App;
