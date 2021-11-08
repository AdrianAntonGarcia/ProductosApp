import React, {createContext, Reducer, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafeApi';
import {
  LoginData,
  LoginResponse,
  RegisterData,
} from '../interfaces/appInterfaces';
import {
  AuthActions,
  authReducer,
  AuthState,
  authInitialState,
} from './AuthReducer';
import {Axios, AxiosError} from 'axios';

interface AuthContextProps extends AuthState {
  signUp: (registerData: RegisterData) => void;
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
  const signUp = async (registerData: RegisterData) => {
    try {
      console.log(registerData);
      const resp = await cafeApi.post<LoginResponse>('/usuarios', registerData);
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la información',
      });
    }
  };
  const signIn = async (loginData: LoginData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', loginData);
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }
  };
  const logOut = async () => {
    dispatch({type: 'logOut'});
    await AsyncStorage.removeItem('token');
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'notAuthenticated'});

    const {data, status} = await cafeApi.get<LoginResponse>('/auth');
    if (status !== 200) {
      return dispatch({type: 'notAuthenticated'});
    }
    /**
     * Guardamos el nuevo token con la nueva vigencia
     */
    await AsyncStorage.setItem('token', data.token);
    dispatch({
      type: 'signUp',
      payload: {token: data.token, user: data.usuario},
    });
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{...state, signUp, signIn, logOut, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
