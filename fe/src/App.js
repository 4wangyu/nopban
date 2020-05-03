import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Split from "react-split";
import "./App.css";
import Douban from "./douban/Douban";
import Header from "./header/Header";
import Home from "./views/Home";

export const AppContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  iframeUrl: "https://book.douban.com",
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
    case "UPDATE_IFRAME":
      return {
        ...state,
        iframeUrl: action.iframeUrl,
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

  const [context, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    const token = JSON.parse(localStorage.getItem("token") || null);

    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        context,
        dispatch,
      }}
    >
      <Router>
        <Header></Header>
        <Split
          className="app"
          // sizes={[27, 73]}
          minSize={0}
          expandToMin={true}
          gutterSize={4}
        >
          <Home />
          <Douban />
        </Split>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
