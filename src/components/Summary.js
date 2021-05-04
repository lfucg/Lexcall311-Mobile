import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

export default class Summary extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.img_wrap}>
            <Image source={this.props.icon} style={styles.icon} />
          </View>

          <Text style={styles.heading}>{this.props.heading}</Text>
          <Text style={styles.content}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  img_wrap: {
    height: 30,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  heading: {
    height: 30,
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    fontSize: 16,
    paddingBottom: 10,
    color: "#585858",
    textAlign: "center",
  },
});
