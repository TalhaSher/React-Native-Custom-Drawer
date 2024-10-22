import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Linking} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAuth} from '../Context/Auth';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const {logout} = useAuth();

  const handleLogout = () => {
    logout().then(() => {
      Toast.show({
        type: 'success',
        text1: 'Sign out successful',
      });
      navigation.navigate('auth');
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../Assets/Logo.png')}
          style={{height: 100, width: 140}}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
