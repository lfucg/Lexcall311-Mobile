import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";

import header_pic from "../assets/images/home_sunrise.jpg";
import header_pic2 from "../assets/images/home_thoroughbred.jpg";

const HeaderImg = () => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const randomImage = () => {
    let number = getRandomInt(2);
    if (number == 0) {
      return header_pic;
    } else if (number == 1) {
      return header_pic2;
    }
  }

  return (
    <Image
      source={randomImage()}
      style={styles.header_pic}
      resizeMode="cover"
      fadeDuration={null}
    />
  )
}

const styles = StyleSheet.create({
  header_pic: {
    flex: 8,
    width: undefined,
    height: undefined,
  },
})

export default HeaderImg
