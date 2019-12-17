import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    books: null
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    const response = await fetch(`/books`);
    const books = await response.json();
    this.setState({ books });
  };

  render() {
    const { books } = this.state;

    return (
      <table>
        <tbody>
          {books &&
            books.map((book, i) => (
              <tr key={i}>
                <td>{book.id}</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default App;
