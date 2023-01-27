import { StyleSheet, Text, View, Platform, Image } from "react-native"

import horse_img from "../assets/images/header_logo-horse-blue.png"

const HeaderTitle = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Image source={horse_img} style={styles.horse} />
        <Text style={styles.title}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  wrap: {
    position: 'relative',
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
})

export default HeaderTitle