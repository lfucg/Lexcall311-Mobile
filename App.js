import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderImg from './src/components/HeaderImg.js';
import HeaderTitle from './src/components/HeaderTitle.js';
import IndexMenuOption from './src/components/IndexMenuOption.js';
import IndexCreateReport from './src/components/IndexCreateReport.js';
import search_img from './src/assets/images/search.png';
import phone_img from './src/assets/images/phone.png';
import user_plus_img from './src/assets/images/user-plus.png';
import car_img from './src/assets/images/car.png';
import external_link_alt_img from './src/assets/images/external-link-alt.png';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderTitle />
          <HeaderImg />
          <IndexCreateReport />
        </View>
        <View style={styles.loading_menu}>
          <IndexMenuOption img={search_img} text={"Look up a 311 Report"} />
          <IndexMenuOption img={phone_img} text={"Call LexCall 311"} />
          <IndexMenuOption img={user_plus_img} text={"Sign up for 311 Alerts"} />
          <IndexMenuOption img={car_img} text={"Traffic Info"} />
          <IndexMenuOption img={external_link_alt_img} text={"Visit lexingtonky.gov"} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading_menu: {
    flex: 5,
  },
  header: {
    flex: 5,
  },
});

