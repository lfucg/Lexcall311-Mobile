import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class IndexCreateReport extends React.Component {
  render() {
    return (
      <View style={styles.create_report}>
        <Text style={styles.text}>Create a 311 Report</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  create_report: {
    flex: 2,
    backgroundColor: '#0456A8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset:{  width: 0,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 20,
  },
});
