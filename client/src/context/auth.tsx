import { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState: { user: any | UserType } = {
  user: null,
};

if (localStorage.getItem('jwtToken')) {
  const decoded: any = jwtDecode(localStorage.getItem('jwtToken') as string);

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decoded;
  }
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userInfo: { username: string; password: string }) => {},
  logout: () => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { [key: string]: any }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    localStorage.setItem('jwtToken', userData.token);

    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');

    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
