import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Bars3CenterLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

const Header = ({header}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerView}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Bars3CenterLeftIcon color={'cyan'} size={24} />
      </Pressable>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: '10%',
    backgroundColor: 'black',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 2,
    textAlign: 'center',
    marginLeft: 20,
  },
});
