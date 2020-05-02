import React, { Component } from "react";
import Split from "react-split";
import Home from "./views/Home";
import Douban from "./douban/Douban";
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
      <Split
        className="app"
        sizes={[27, 73]}
        minSize={350}
        expandToMin={true}
        gutterSize={4}
      >
        <Home />
        <Douban />
      </Split>
    );
  }
}

export default App;
