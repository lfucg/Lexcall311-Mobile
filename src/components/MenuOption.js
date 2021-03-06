import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { web, phonecall } from "react-native-communications";

export default class HeaderTitle extends React.Component {
  link_logic() {
    if (this.props.nav_link == "Phone") {
      phonecall("8594252255", true);
    } else if (this.props.nav_link == "SignUp") {
      web("https://arcg.is/0SPWPG");
    } else if (this.props.nav_link == "WebReport") {
      web("https://www.lexingtonky.gov/lexcall");
    } else if (this.props.nav_link == "MapOfReports") {
      web(
        "http://www.arcgis.com/apps/webappviewer/index.html?id=587e882ba3784c088a5cc410f868d7e5"
      );
    } else if (this.props.nav_link == "TrafficInfo") {
      web("https://www.lexingtonky.gov/traffic-ticker");
    } else if (this.props.nav_link == "LexingtonWebsite") {
      web("https://www.lexingtonky.gov");
    } else {
      // internal screen + params
      this.props.navigation.navigate(this.props.nav_link, {
        category: this.props.category,
      });
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.menu_option}
        activeOpacity={0.6}
        onPress={this.link_logic.bind(this)}
      >
        <View style={styles.wrap}>
          <Image
            source={this.props.img}
            style={styles.icon}
            resizeMode="cover"
          />

          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  menu_option: {
    flex: 1,
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#585858",
  },
  wrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  icon: {
    height: 16,
    width: 16,
  },
  text: {
    color: "#585858",
    fontSize: 16,
    paddingLeft: 10,
  },
});
