import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderTitle from './HeaderTitle.js';
import IndexMenuOption from './IndexMenuOption.js';

export default class Categories extends React.Component {
  render() {
    return (
      <View style={styles.categories}>
        <View style={styles.header}>
          <HeaderTitle text={"Create A Report"} />
        </View>
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

