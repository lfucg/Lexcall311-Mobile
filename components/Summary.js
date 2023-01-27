import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Summary = ({ icon, heading, content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.img_wrap}>
          <Image source={icon} style={styles.icon} />
        </View>

        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  )
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
})

export default Summary