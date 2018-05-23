import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={styles.title_container}>
        <Text style={styles.title}>LexCall 311</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
  },
});
