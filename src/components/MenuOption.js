import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';

import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { web('http://www.github.com') }}


export default class HeaderTitle extends React.Component {

  link_logic () {
    if (this.props.nav_link == 'Phone') {
      phonecall('311', true);
    }
    else if (this.props.nav_link == 'WebReport') {
      web('http://jason@jasonmize.com');
    }
    else {
      this.props.navigation.navigate(this.props.nav_link);
    } 
  };

  render() {

    return (
      <TouchableOpacity 
        style={styles.menu_option}
        activeOpacity={.6}
        onPress={this.link_logic.bind(this)}
      >
        <View style={styles.wrap}>  
          <Image source={this.props.img} style={styles.icon} resizeMode='cover'/>
          
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  menu_option: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#585858',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  icon: {
    height: 16,
    width: 16,
  },
  text: {
    color: '#585858',
    fontSize: 16,
    paddingLeft: 10,
  },
});
