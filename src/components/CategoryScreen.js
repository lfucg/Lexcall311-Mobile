import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HeaderTitle from './HeaderTitle.js';
import IndexMenuOption from './IndexMenuOption.js';
import search_img from '../assets/images/search.png';

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle text={"Create a Report"} />,
  };

  render() {
    return (
      <View style={styles.categories}>
        <View>
          <Text>Select a Category</Text>
          <Text>Select which type of issue you are reporting.</Text>
        </View>
        <View style={styles.menu}>
          <IndexMenuOption img={search_img} text={"Bulky Trash Pickup"} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categories: {
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

