import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import Toast from 'react-native-toast-message';
import StackNavigation from './src/navigation/StackNavigation';
import {AuthProvider} from './src/Context/Auth';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigation />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
