import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

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
    flex: 2,
    backgroundColor: '#fff',
    alignItems:'center',
  },
  title: {
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        marginTop: 25,
      },
    }),
    fontWeight: '600',
    fontSize: 20,
  },
});
