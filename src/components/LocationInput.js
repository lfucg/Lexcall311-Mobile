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
  }

  render() {
    // console.log("LOCATION INPUT: LOCATIONS", this.props.locations);
    // let { query } = this.state.query;
    // console.log('QUERY: ', query);
    // let data = this.props.locations;
    console.log('DATA: ', this.props.locations);

    return (
      <View style={styles.container}>
        <View style={styles.autocomplete_wrap}>
          <Autocomplete
            listContainerStyle={{ zIndex: 999 }}
            style={[styles.autocomplete, {width: this.props.dimensions.width }]}
            data={this.props.locations}
            defaultValue={(
              this.state.query
            )}
            // onFocus={() => this.setState({query : ''})}
            // onChangeText={text => this.locationChange(text)}
            renderTextInput={text => (
              <View style={styles.query_wrap}>
                <Image source={search_img} style={styles.query_img} />
                <TextInput
                  style={styles.query_text}
                  onFocus={() => this.setState({query : ''})}
                  onChangeText={(location) => this.locationChange(location)}
                  value={this.state.query}
                  underlineColorAndroid='transparent'
                />
              </View>
            )}
            renderItem={item => (
              <TouchableOpacity 
                style={styles.data_wrap}
                onPress={() => this.locationChange(item)}
              >
                <Text style={styles.data_text}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        





{ 
        // <Image source={search_img} style={styles.search_img} />
        // <TextInput
        //   onFocus={() => this.setState({location : ''})}
        //   style={styles.location}
        //   onChangeText={(location) => this.locationChange(location)}
        //   value={this.state.location}
        //   underlineColorAndroid='transparent'
        // />
}



{
        // <Autocomplete
        //   data={this.props.locations.length === 1 ? [] : this.props.locations}
        //   // defaultValue={this.state.location}
        //   onChangeText={(location) => this.locationChange(location)}
        //   placeHolder={this.state.location}
        //   renderItem={(address) => (
        //     <TouchableOpacity
        //       onPress={() => this.setState({ location: address })}
        //     >
        //       <TextInput>{address}</TextInput>
        //     </TouchableOpacity>
        //   )}
        // />      
        // <View style={styles.addressContainer}>
        //   {this.props.locations > 0 ? (
        //       LocationInput.renderLocation(this.props.locations[0])
        //     ) : (
        //       <Text>{this.state.location}</Text>
        //     )
        //   }
        // </View>
}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // borderTopWidth: 1,
    // borderColor: '#585858',
  },
  query_wrap: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-start',
  },
  query_text: {
    // paddingLeft: -50,
  },
  query_img: {
    width: 18, 
    height: 18,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  autocomplete_wrap: {
    ...Platform.select({
      ios: {
      },
      android: {
        height: 40,
      },
    }),
  },
  autocomplete: {
  },
  data_wrap: {
    padding: 15,
    backgroundColor: '#fff',
  },
  data_text: {
    // padding: 15,
    // height: 100,
    // fontSize: 18,
  },
});
