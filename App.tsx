import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/navigator';
import {AuthProvider} from './src/context/AuthContext';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator></Navigator>
      </AppState>
    </NavigationContainer>
  );
}
