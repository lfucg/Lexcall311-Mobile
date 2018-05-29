import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';


export default class HeaderTitle extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Text style={styles.title}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
      android: {
        paddingTop: 15,
      },
    }),
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
});
