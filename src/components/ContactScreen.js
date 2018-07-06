import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput, 
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'

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
      screenOffset: 0,
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = (event) => {
    this.setState({
      screenOffset: -200,
    });
  };

  keyboardDidHide = (event) => {
    this.setState({
      screenOffset: 0,
    });
  };


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
  
  firstNameCheck() {
    if (this.state.firstName == "") {
      this.setState({
        firstName: 'First Name',
      });
    }
  }
  lastNameCheck() {
    if (this.state.lastName == "") {
      this.setState({
        lastName: 'Last Name',
      });
    }
  }
  emailCheck() {
    if (this.state.email == "") {
      this.setState({
        email: 'Email Address',
      });
    }
  }
  phoneCheck() {
    if (this.state.phone == "") {
      this.setState({
        phone: 'Phone Number',
      });
    }
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
          latitude={navigation.getParam('latitude')}
          longitude={navigation.getParam('longitude')}
          description={navigation.getParam('description')}
          image1={navigation.getParam('image1')}
          image2={navigation.getParam('image2')}
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
          text={"Submit >"}
          nav_link={"Home"}
          category={navigation.getParam('category')}
          location={navigation.getParam('location')}
          latitude={navigation.getParam('latitude')}
          longitude={navigation.getParam('longitude')}
          description={navigation.getParam('description')}
          image1={navigation.getParam('image1')}
          image2={navigation.getParam('image2')}
          firstName={navigation.getParam('firstName')}
          lastName={navigation.getParam('lastName')}
          email={navigation.getParam('email')}
          phone={navigation.getParam('phone')}
        />
      ),
    };
  }

  render() {
    // console.log('CONTACT SCREEN PARAMS: ', this.props.navigation.state.params);

    return (
      <View 
        style={[styles.container, { 
          paddingBottom: this.keyboardHeight,
          marginTop: this.state.screenOffset,
        }]} 
      >

        <View style={{flex: 1}}>
          <ScrollView 
            style={{flex: 1}} 
            scrollEnabled={false} 
            keyboardShouldPersistTaps='handled'
          >

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
                  onBlur={() => this.firstNameCheck()}
                />
              </View>
              <View style={styles.contact_wrap}>
                <TextInput 
                  onFocus={() => this.setState({lastName: ''})}
                  style={styles.contact}
                  onChangeText={(lastName) => this.updateLastName(lastName)}
                  value={this.state.lastName}
                  underlineColorAndroid='transparent'
                  onBlur={() => this.lastNameCheck()}
                />
              </View>
              <View style={styles.contact_wrap}>
                <TextInput 
                  onFocus={() => this.setState({email: ''})}
                  style={styles.contact}
                  onChangeText={(email) => this.updateEmail(email)}
                  value={this.state.email}
                  underlineColorAndroid='transparent'
                  keyboardType='email-address'
                  onBlur={() => this.emailCheck()}
                />
              </View>
              <View style={styles.contact_wrap}>
                <TextInput 
                  onFocus={() => this.setState({phone: ''})}
                  style={styles.contact}
                  onChangeText={(phone) => this.updatePhone(phone)}
                  value={this.state.phone}
                  underlineColorAndroid='transparent'
                  keyboardType='phone-pad'
                  onBlur={() => this.phoneCheck()}
                />
              </View>

            </View>
          </ScrollView>
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
    height: 190,
    borderBottomWidth: 1,
    borderColor: '#585858',
    marginBottom: 30,
  },
  all_contact_wrap: {
    flex: 1,
  },
  contact_wrap: {
  },
  contact: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#585858',
    borderWidth: 1,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

