import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
} from 'react-native';

import search_img from '../assets/images/icon_search.png';

export default class LocationInput extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={search_img} style={styles.search_img} />
        <Text style={styles.text}>Enter address or describe location</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderColor: '#585858',
    paddingTop: 15,
  },
  search_img: {
    width: 18, 
    height: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});
