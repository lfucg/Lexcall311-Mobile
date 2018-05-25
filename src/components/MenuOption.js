import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';

export default class HeaderTitle extends React.Component {


  render() {

    return (
      <TouchableOpacity 
        style={styles.menu_option}
        activeOpacity={.6}
        onPress={() => this.props.navigation.navigate('Category')}
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
