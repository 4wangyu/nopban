const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('email', JSON.stringify(action.payload.email));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        email: action.payload.email,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
        token: null,
      };
    case 'UPDATE_IFRAME':
      return {
        ...state,
        iframeUrl: action.iframeUrl,
      };
    default:
      return state;
  }
};

export default reducer;
