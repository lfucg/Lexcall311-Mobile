import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderImg from './src/components/HeaderImg.js';
import HeaderTitle from './src/components/HeaderTitle.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderTitle />
          <HeaderImg />
        </View>
        <View style={styles.loading_menu}>
          <Text>Menu Option</Text>
          <Text>Menu Option</Text>
          <Text>Menu Option</Text>
          <Text>Menu Option</Text>
          <Text>Menu Option</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading_menu: {
    flex: 6,
  },
  header: {
    flex: 4,
  },
});

