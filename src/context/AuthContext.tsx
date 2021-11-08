import React, {createContext, Reducer, useReducer} from 'react';
import {
  AuthActions,
  authReducer,
  AuthState,
  authInitialState,
} from './AuthReducer';

interface AuthContextProps extends AuthState {
  signUp: () => void;
  signIn: () => void;
  logOut: () => void;
  removeError: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthActions>>(
    authReducer,
    authInitialState,
  );
  const signUp = () => {
    // dispatch({type: 'signUp', payload: {user}});
  };
  const signIn = () => {};
  const logOut = () => {};
  const removeError = () => {};

  return (
    <AuthContext.Provider
      value={{...state, signUp, signIn, logOut, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
