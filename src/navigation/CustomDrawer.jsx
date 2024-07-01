import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Linking} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/outline';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../Assets/Logo.png')}
          style={{height: 100, width: 140}}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Services"
        onPress={() => Linking.openURL('https://fordnine.com/#services')}
        icon={({size, color}) => <HeartIcon color={'red'} size={size} />}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
