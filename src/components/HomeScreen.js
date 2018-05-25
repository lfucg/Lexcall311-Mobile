import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HeaderImg from './HeaderImg.js';
import HeaderTitle from './HeaderTitle.js';
import IndexMenuOption from './IndexMenuOption.js';
import IndexCreateReport from './IndexCreateReport.js';
import search_img from '../assets/images/search.png';
import phone_img from '../assets/images/phone.png';
import user_plus_img from '../assets/images/user-plus.png';
import car_img from '../assets/images/car.png';
import external_link_alt_img from '../assets/images/external-link-alt.png';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle text={"LexCall 311"} />,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderImg />
          <IndexCreateReport navigation={this.props.navigation} />
        </View>
        <View style={styles.menu}>
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
  menu: {
    flex: 5,
  },
  header: {
    flex: 5,
  },
});

