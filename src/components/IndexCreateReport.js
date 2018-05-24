import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import pencil_img from '../assets/images/pencil-alt.png';


export default class IndexCreateReport extends React.Component {
  render() {
    return (
      <View style={styles.create_report}>
        <View style={styles.wrap}>
        
          <View>
            <Image source={pencil_img} style={styles.pencil_img} />
          </View>
         
          <View>
            <Text style={styles.text}>
              Create a 311 Report
            </Text>
          </View>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  create_report: {
    flex: 2,
    backgroundColor: '#0456A8',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset:{ width: 0, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',
  },
  pencil_img: {
    height: 18,
    width: 18,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
});
