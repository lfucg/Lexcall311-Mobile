import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from 'react-native';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import summary_pencil from '../assets/images/summary_icon_pencil-alt.png';

export default class ContactScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: this.startingFirstName(),
      lastName: this.startingLastName(),
      email: this.startingEmail(),
      phone: this.startingPhone(),
    };
  }

  startingFirstName() {
    currentFirstName = this.props.navigation.getParam('firstName');
    if (currentFirstName) {
      return currentFirstName;
    } else {
      return 'First Name';
    }
  }

  startingLastName() {
    currentLastName = this.props.navigation.getParam('lastName');
    if (currentLastName) {
      return currentLastName;
    } else {
      return 'Last Name';
    }
  }

  startingEmail() {
    currentEmail = this.props.navigation.getParam('email');
    if (currentEmail) {
      return currentEmail;
    } else {
      return 'Email Address';
    }
  }

  startingPhone() {
    currentPhone = this.props.navigation.getParam('phone');
    if (currentPhone) {
      return currentPhone;
    } else {
      return 'Phone Number';
    }
  }

  updateFirstName(firstName) {
    this.setState({
      firstName: firstName,
    });
    this.props.navigation.navigate('Contact', {
      firstName: firstName,
    });
  }

  updateLastName(lastName) {
    this.setState({
      lastName: lastName,
    });
    this.props.navigation.navigate('Contact', {
      lastName: lastName,
    });
  }

  updateEmail(email) {
    this.setState({
      email: email,
    });
    this.props.navigation.navigate('Contact', {
      email: email,
    });
  }

  updatePhone(phone) {
    this.setState({
      phone: phone,
    });
    this.props.navigation.navigate('Contact', {
      phone: phone,
    });
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderBack
          navigation={navigation}
          text={"< Back"}
          nav_link={"Photo"}
          category={navigation.getParam('category')}
          location={navigation.getParam('location')}
          description={navigation.getParam('description')}
          image={navigation.getParam('image')}
          firstName={navigation.getParam('firstName')}
          lastName={navigation.getParam('lastName')}
          email={navigation.getParam('email')}
          phone={navigation.getParam('phone')}
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerRight: (
        <HeaderNext 
          navigation={navigation}
          text={"Next >"}
          nav_link={"Home"}
          category={navigation.getParam('category')}
          location={navigation.getParam('location')}
          description={navigation.getParam('description')}
          image={navigation.getParam('image')}
          firstName={navigation.getParam('firstName')}
          lastName={navigation.getParam('lastName')}
          email={navigation.getParam('email')}
          phone={navigation.getParam('phone')}
        />
      ),
    };
  }

  render() {
    console.log('CONTACT SCREEN PARAMS: ', this.props.navigation.state.params);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={summary_pencil} 
            heading={"Enter Contact Info"}
            content={"Add your contact info so we can follow up with you if needed.  Email is required to receive alerts."}
          />
        </View>
        <View style={styles.all_contact_wrap}>
          <View style={styles.contact_wrap}>
            <TextInput 
              onFocus={() => this.setState({firstName: ''})}
              style={styles.contact}
              onChangeText={(firstName) => this.updateFirstName(firstName)}
              value={this.state.firstName}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.contact_wrap}>
            <TextInput 
              onFocus={() => this.setState({lastName: ''})}
              style={styles.contact}
              onChangeText={(lastName) => this.updateLastName(lastName)}
              value={this.state.lastName}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.contact_wrap}>
            <TextInput 
              onFocus={() => this.setState({email: ''})}
              style={styles.contact}
              onChangeText={(email) => this.updateEmail(email)}
              value={this.state.email}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.contact_wrap}>
            <TextInput 
              onFocus={() => this.setState({phone: ''})}
              style={styles.contact}
              onChangeText={(phone) => this.updatePhone(phone)}
              value={this.state.phone}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#585858',
    marginBottom: 30,
  },
  all_contact_wrap: {
    flex: 2,
  },
  contact_wrap: {
  },
  contact: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 20,
    borderColor: '#585858',
    borderWidth: 1,
  },
});

