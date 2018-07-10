import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

import chevron_left_img from '../assets/images/icon_chevron-left.png';


export default class HeaderBack extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={.6}
        onPress={() => this.props.navigation.navigate(this.props.nav_link, {
          category: this.props.category,
          location: this.props.location,
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          description: this.props.description,
          image1: this.props.image1,
          image2: this.props.image2,
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          phone: this.props.phone,
        })}
      >
        <View style={styles.wrap}>
          {
            this.props.text ? (
              <Image 
                style={styles.chevron}
                source={chevron_left_img} 
              /> 
            ) : null
          }

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
    flexDirection: 'row',
  },
  chevron: {
    height: 20,
    width: 20,
    tintColor: '#007aff',
    ...Platform.select({
      android: {
        marginTop: 3,
      },
    }),
  },
  text: {
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontSize: 18,
      },
    }),
    fontWeight: '600',
    color: '#007aff',
  },
});
