import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {useAuth} from '../Context/Auth';
const Home = () => {
  const {currentUser} = useAuth();

  return (
    <View style={{flex: 1}}>
      <Header header="Home" />
      <Text style={styles.themedText}>{currentUser.email}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  themedText: {
    fontSize: 24,
    color: 'black',
  },
});
