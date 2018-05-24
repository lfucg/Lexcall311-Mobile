import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={styles.title_container}>
        <Text style={styles.title}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
  },
  title: {
    height: 40,
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 10,
  },
});
