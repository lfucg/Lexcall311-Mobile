import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={styles.menu_option}>
        <Text style={styles.text}>Menu Option</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu_option: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#585858',
  },
  text: {
    color: '#585858',
    fontSize: 16,
    paddingLeft: 20,
  },
});
