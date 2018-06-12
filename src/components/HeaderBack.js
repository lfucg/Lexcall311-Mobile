import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
} from 'react-native';

// import { StackActions, NavigationActions } from 'react-navigation';


export default class HeaderBack extends React.Component {
  render() {
    console.log('HEADER BACK: ');
    return (
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={.6}
        onPress={() => this.props.navigation.navigate(this.props.nav_link)}
      >
        <View style={styles.wrap}>

          <Text style={styles.text}> 
            {this.props.text}
          </Text>

        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  wrap: {
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: '#007aff',
    paddingLeft: 10,
  },
});
