import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../Screens/authentication/Auth';
import DrawerNavigation from './DrawerNavigation';
import {useAuth} from '../Context/Auth';
import Loading from '../Screens/Loading';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const {currentUser, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {currentUser ? (
        <Stack.Screen name="drawerNavigation" component={DrawerNavigation} />
      ) : (
        <Stack.Screen name="auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
