import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../Screens/authentication/Auth';
import DrawerNavigation from './DrawerNavigation';
import {useAuth} from '../Context/Auth';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const {currentUser} = useAuth();

  const LoggedInNavigation = () => (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="drawerNavigation">
      <Stack.Screen name="drawerNavigation" component={DrawerNavigation} />
    </Stack.Navigator>
  );

  const LoggedOutNavigation = () => (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="auth">
      <Stack.Screen name="auth" component={Auth} />
    </Stack.Navigator>
  );

  return <>{currentUser ? <LoggedInNavigation /> : <LoggedOutNavigation />}</>;
};

export default StackNavigation;
