import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LocationInput extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter address or describe location</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#585858',
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
});
