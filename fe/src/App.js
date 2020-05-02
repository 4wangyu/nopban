import React from "react";
import Split from "react-split";
import "./App.css";
import Douban from "./douban/Douban";
import Header from "./header/Header";
import Home from "./views/Home";

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: true,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const App = () => {
  // state = {
  //   books: null,
  // };

  // componentDidMount() {}

  // fetchBooks = async () => {
  //   const response = await fetch(`/books`);
  //   const books = await response.json();
  //   this.setState({ books });
  // };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Header></Header>
      <Split
        className="app"
        sizes={[27, 73]}
        minSize={0}
        expandToMin={true}
        gutterSize={4}
      >
        <Home />
        <Douban />
      </Split>
    </AuthContext.Provider>
  );
};

export default App;
