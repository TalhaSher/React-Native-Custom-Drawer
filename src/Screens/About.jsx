import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';

const About = () => {
  return (
    <View style={{flex: 1}}>
      <Header header="About" />
      <Text style={styles.themedText}>About</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  themedText: {
    fontSize: 24,
    color: 'black',
  },
});
