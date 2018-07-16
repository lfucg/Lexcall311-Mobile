import React, { Component } from 'react';
import { 
  Image, 
  StyleSheet, 
  View,
} from 'react-native';

import header_pic from '../assets/images/home_sunrise.jpg';
import header_pic2 from '../assets/images/home_thoroughbred.jpg';

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
      <Image 
        source={this.randomImage()} 
        style={styles.header_pic} 
        resizeMode='cover'
        fadeDuration = {null}
      />
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
