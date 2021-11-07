import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/navigator';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator></Navigator>
    </NavigationContainer>
  );
}
