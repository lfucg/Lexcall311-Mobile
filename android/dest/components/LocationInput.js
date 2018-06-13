import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TextInput,
} from 'react-native';

import search_img from '../assets/images/icon_search.png';

export default class LocationInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      location: this.startingLocation(),
    };
  }

  startingLocation() {
    currentLocation = this.props.navigation.getParam('location');
    if (currentLocation) {
      return currentLocation;
    } else {
      return 'Enter address or describe location';
    }
  }

  locationChange(location) {
    this.setState({
      location: location,
    });
    this.props.updateLocation(location);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={search_img} style={styles.search_img} />
        <TextInput
          onFocus={() => this.setState({location : ''})}
          style={styles.location}
          onChangeText={(location) => this.locationChange(location)}
          value={this.state.location}
          underlineColorAndroid='transparent'
        />
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
  location: {
    fontSize: 18,
  },
});
