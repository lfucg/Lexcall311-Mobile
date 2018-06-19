import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
} from 'react-native';


export default class HeaderBack extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={.6}
        onPress={() => this.props.navigation.navigate(this.props.nav_link, {
          category: this.props.category,
          location: this.props.location,
          description: this.props.description,
          image: this.props.image,
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          phone: this.props.phone,
        })}
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
