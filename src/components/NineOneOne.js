import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NineOneOne extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Call 911 for Emergencies</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#e3423e',
    fontSize: 18,
    padding: 10,
  },
});
