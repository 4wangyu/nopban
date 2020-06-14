import React, { createContext, useEffect, useReducer } from 'react';
import createInterceptor from '../http/interceptor';
import { ContextProps, GlobalContext } from '../models/model';
import reducer from './reducer';

const initialState: GlobalContext = {
  isAuthenticated: false,
  user: undefined,
  email: undefined,
  token: undefined,
  iframeUrl: 'https://book.douban.com',
};

export const AuthContext = createContext<Partial<ContextProps>>({});

const AuthProvider = (props: { children: React.ReactNode }) => {
  const [context, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const email = JSON.parse(localStorage.getItem('email') as string);
    const token = JSON.parse(localStorage.getItem('token') as string);

    if (user && email && token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          email,
          token,
        },
      });
    }

    createInterceptor(() =>
      dispatch({
        type: 'LOGOUT',
      })
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        context,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
