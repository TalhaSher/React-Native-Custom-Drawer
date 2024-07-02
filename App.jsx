import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
