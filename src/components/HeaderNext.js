import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
} from 'react-native';

// import getAuth from '../services/FetchAuth.js';


export default class HeaderNext extends React.Component {
  nextPageOrSubmit() {
    if (this.props.text == 'Submit >') {
      console.log('SUBMIT TO API');

      fetch('https://test.salesforce.com/services/oauth2/token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'grant_type': 'password',
          'client_id': 'myclientid',
          'client_secret': 'myclientsecret',
          'username': 'mylogin@salesforce.com',
          'password': 'mypassword123456',
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log('RESPONSE: ', responseJson);
      });



    } else {
      this.props.navigation.navigate(this.props.nav_link, {
        category: this.props.category,
        location: this.props.location,
        description: this.props.description,
        image: this.props.image,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        phone: this.props.phone,        
      })
    }
  }


  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={.6}
        onPress={() => this.nextPageOrSubmit()}
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
    paddingRight: 10,
  },
});
