export interface GlobalContext {
  isAuthenticated: boolean;
  user?: string;
  email?: string;
  token?: string;
  iframeUrl: string;
}

export interface ContextProps {
  context: GlobalContext;
  dispatch: any;
}
