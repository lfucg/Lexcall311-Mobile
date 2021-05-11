import React from "react";
import { StyleSheet, Text, View, Platform, Image } from "react-native";

import horse_img from "../assets/images/header_logo-horse-blue.png";

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          {<Image source={horse_img} style={styles.horse} />}
          <Text style={styles.title}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    ...Platform.select({
      ios: {
        paddingTop: 12,
      },
      android: {
        paddingTop: 16,
      },
    }),
  },
  horse: {
    ...Platform.select({
      ios: {
        marginTop: -12,
      },
      android: {
        marginTop: -8,
      },
    }),
    marginRight: 10,
    marginLeft: -15,
  },
  title: {
    fontWeight: "600",
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontSize: 18,
      },
    }),
  },
});
