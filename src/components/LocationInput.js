import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';

import search_img from '../assets/images/icon_search.png';


export default class LocationInput extends React.Component {

  // static renderLocation(address) {
  //   return (
  //     <View>
  //       <Text>
  //         {address}
  //       </Text>
  //     </View>
  //   )
  // }

  constructor(props) {
    super(props);
    this.state = { 
      query: this.startingLocation(),
      // inputHeight: 42,
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
      query: location,
    });
    this.props.updateLocation(location);
    this.props.updateInputHeight(0);
  }

  render() {
    // console.log("LOCATION INPUT: LOCATIONS", this.props.locations);
    // let { query } = this.state.query;
    // console.log('QUERY: ', query);
    // let data = this.props.locations;
    console.log('DATA: ', this.props.locations);

    return (
      <View 
        style={[styles.container, {
          height: 42,
        }]}
      >
          <Autocomplete

          >

          </Autocomplete>




{
        // <View style={styles.autocomplete_wrap}>
   
          // <Autocomplete
          //   listContainerStyle={{ 
          //     zIndex: 999,
          //     backgroundColor: 'blue',
          //   }}
          //   listStyle={{
          //     zIndex: 27,
          //     backgroundColor: 'pink',
          //     // padding: 50,
          //   }}
          //   containerStyle={{
          //     // zIndex: 5,
          //     // backgroundColor: 'pink',
          //   }}
          //   style={[styles.autocomplete, {width: this.props.dimensions.width }]}
          //   data={this.props.locations}
          //   // data={this.resultsHeightAdjustment()}
          //   defaultValue={(
          //     this.state.query
          //   )}
          //   // onFocus={this.resultsHeightAdjustment()}
          //   // onChangeText={text => this.locationChange(text)}
          //   renderTextInput={text => (
          //     <View style={styles.query_wrap}>
          //       <Image source={search_img} style={styles.query_img} />
          //       <TextInput
          //         style={styles.query_text}
          //         onFocus={() => this.setState({query : ''})}
          //         onChangeText={(location) => this.locationChange(location)}
          //         value={this.state.query}
          //         underlineColorAndroid='transparent'
          //       />
          //     </View>
          //   )}
          //   renderItem={locationResponse => (
          //     <TouchableOpacity 
          //       style={styles.data_wrap}
          //       onPress={() => this.locationChange(locationResponse)}
          //     >
          //       <Text style={styles.data_text}>{locationResponse}</Text>
          //     </TouchableOpacity>
          //   )}
          // />
      

        // </View>
}
        





{ 
        // this was my original, non suggestion listing code

        // <Image source={search_img} style={styles.search_img} />
        // <TextInput
        //   onFocus={() => this.setState({location : ''})}
        //   style={styles.location}
        //   onChangeText={(location) => this.locationChange(location)}
        //   value={this.state.location}
        //   underlineColorAndroid='transparent'
        // />
}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }

  // container: {
  //   backgroundColor: '#fff',
  // },
  // query_wrap: {
  //   flexDirection: 'row',
  //   height: 40,
  //   justifyContent: 'flex-start',
  // },
  // query_text: {
  // },
  // query_img: {
  //   width: 18, 
  //   height: 18,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   marginTop: 10,
  // },
  // autocomplete_wrap: {
  //   ...Platform.select({
  //     ios: {
  //     },
  //     android: {
  //       height: 40,
  //     },
  //   }),
  // },
  // autocomplete: {
  //   zIndex: 999,
  //   height: 200,
  // },
  // data_wrap: {
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   paddingTop: 2,
  //   paddingBottom: 2,
  //   // height: 10,
  //   backgroundColor: '#fff',
  // },
  // data_text: {
  //   // backgroundColor: 'pink',
  //   zIndex: 999,
  //   height: 20,
  // },
});
