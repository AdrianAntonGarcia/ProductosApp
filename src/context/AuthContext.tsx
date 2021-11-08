import React, {createContext, Reducer, useReducer} from 'react';
import cafeApi from '../api/cafeApi';
import {LoginData, LoginResponse} from '../interfaces/appInterfaces';
import {
  AuthActions,
  authReducer,
  AuthState,
  authInitialState,
} from './AuthReducer';

interface AuthContextProps extends AuthState {
  signUp: () => void;
  signIn: (loginData: LoginData) => void;
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
  const signIn = async (loginData: LoginData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', loginData);
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.msg});
    }
  };
  const logOut = () => {};
  const removeError = () => {};

  return (
    <AuthContext.Provider
      value={{...state, signUp, signIn, logOut, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
