import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <ActivityIndicator size={'large'} color={'cyan'} />
        <Text style={{color: 'black', fontSize: 16, marginTop: 20}}>
          Loading
        </Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
