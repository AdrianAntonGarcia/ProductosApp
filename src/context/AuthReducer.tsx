import {Usuario} from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'no-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

export const authInitialState: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
};

export type AuthActions =
  | {
      type: 'signUp';
      payload: {token: string; user: Usuario};
    }
  | {
      type: 'addError';
      payload: string;
    }
  | {
      type: 'removeError';
    }
  | {
      type: 'notAuthenticated';
    }
  | {
      type: 'logOut';
    };

export const authReducer = (
  state: AuthState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'no-authenticated',
        token: null,
        errorMessage: action.payload,
      };
    case 'removeError':
      return {...state, errorMessage: ''};
    case 'signUp': {
      return {
        ...state,
        user: action.payload.user,
        status: 'authenticated',
        token: action.payload.token,
        errorMessage: '',
      };
    }
    case 'notAuthenticated':
    case 'logOut':
      return {
        ...state,
        user: null,
        status: 'no-authenticated',
        token: null,
      };
    default:
      return state;
  }
};
