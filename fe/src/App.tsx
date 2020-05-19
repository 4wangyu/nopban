import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Split from "react-split";
import "./App.scss";
import Douban from "./douban/Douban";
import Header from "./header/Header";
import Home from "./views/Home";

type ContextProps = {
  context: any;
  dispatch: any;
};

export const AppContext = React.createContext<Partial<ContextProps>>({});
const initialState = {
  isAuthenticated: false,
  user: null,
  email: null,
  token: null,
  iframeUrl: "https://book.douban.com",
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("email", JSON.stringify(action.payload.email));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        email: action.payload.email,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
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
  const [context, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const email = JSON.parse(localStorage.getItem("email") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);

    if (user && email && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          email,
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
