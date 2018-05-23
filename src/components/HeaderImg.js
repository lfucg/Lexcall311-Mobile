import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, View } from 'react-native';

import header_pic from '../styles/images/lincoln.jpg';

export default class HeaderImg extends Component {
  render() {
    return (
      <Image source={header_pic} style={styles.header_pic} resizeMode='cover' />
    );
  }
}

const styles = StyleSheet.create({
  header_pic: {
    flex: 8,
    width: undefined,
    height: undefined,
  },
});
