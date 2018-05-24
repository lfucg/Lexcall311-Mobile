import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import pencil_img from '../assets/images/pencil-alt.png';





export default class IndexCreateReport extends React.Component {
  render() {
    return (
      <View style={styles.create_report}>
        <Text style={styles.text}>
          <Image source={pencil_img} style={styles.pencil_img} resizeMode='contain' />
          Create a 311 Report
        </Text>
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
  pencil_img: {
    height: 18,
    width: 18,
    marginRight: -10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 20,
  },
});
