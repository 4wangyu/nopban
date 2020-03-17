import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";

class App extends Component {
  state = {
    books: null
  };

  componentDidMount() {}

  fetchBooks = async () => {
    const response = await fetch(`/books`);
    const books = await response.json();
    this.setState({ books });
  };

  render() {
    return <Header></Header>;
  }
}

export default App;
