import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';

const Setting = () => {
  return (
    <View style={{flex: 1}}>
      <Header header="Settings" />
      <Text style={styles.themedText}>Settings</Text>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  themedText: {
    fontSize: 24,
    color: 'black',
  },
});
