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

import AutoSuggest from 'react-native-autosuggest';

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
   

{
          // This is the component that I was looking into most recently.
          // It doesn't look like the Android build works at all though.
          // Probably not a good direction.
          
          // <AutoSuggest
          //   containerStyles={{ marginTop: 10, marginBottom: 10 }}
          //   otherTextInputProps={{ editable: true }}
          //   textInputStyles={{
          //     width: 300,
          //     paddingLeft: 10,
          //     fontSize: 12,
          //     backgroundColor: 'lightgrey',
          //     height: 40,
          //   }}
          //   onChangeText={selection => console.log(`you selected ${selection}`)}
          //   clearBtn={null /* myOptionalCustomClearBtn */}
          //   terms={[
          //     'Apple',
          //     'Banana',
          //     'Orange',
          //     'Strawberry',
          //     'Lemon',
          //     'Cantaloupe',
          //     'Peach',
          //     'Mandarin',
          //     'Date',
          //     'Kiwi',
          //   ]}
          //   placeholder="I'm a super-awesome TextInput!"
          //   placeholderTextColor='darkgrey'
          // />


          // This is your best bet to date.  It fetches and displays, but the 
          // ios build displays the list of suggestions behind the map.  
          // Probably needs a mix of zIndex and maybe position absolute?  But where?

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
}
        </View>
        





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
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  query_wrap: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-start',
  },
  query_text: {
    
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

  },


  // These are styles from the example for AutoSuggest - probably not a good direction
  // TextInput: {
  //   width: 300,
  //   paddingLeft: 10,
  //   fontSize: 12,
  //   backgroundColor: 'lightgrey',
  //   height: 40,
  // },
  // AutoSuggest: {
  //   width: 300,
  //   paddingLeft: 10,
  //   fontSize: 12,
  //   backgroundColor: 'lightgrey',
  //   height: 40,
  // },
});
