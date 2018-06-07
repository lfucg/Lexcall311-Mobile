import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, View } from 'react-native';

import header_pic from '../assets/images/sunrise.jpg';
import header_pic2 from '../assets/images/thoroughbred.jpg';

export default class HeaderImg extends Component {


  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  randomImage() {
    let number = this.getRandomInt(2);
    if (number == 0) {
      return header_pic;
    } else if (number == 1) {
      return header_pic2;
    }
  }

  render() {
    return (
      <Image source={this.randomImage()} style={styles.header_pic} resizeMode='cover' />
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
