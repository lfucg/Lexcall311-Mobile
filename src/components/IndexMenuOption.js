import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class HeaderTitle extends React.Component {
  
  render() {
    return (
      <View style={styles.menu_option}>
        <Text style={styles.text}>
          <Image source={this.props.img} style={styles.icon} />
          {this.props.text}
        </Text>
      </View>
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
  icon: {
    height: 16,
    width: 16,
  },
  text: {
    color: '#585858',
    fontSize: 16,
    paddingLeft: 10,
    marginLeft: 20,
  },
});
