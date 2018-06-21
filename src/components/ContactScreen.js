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
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

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
      headerMarginBottom: 30,
      contactMarginBottom: 10,
      contactPaddingTop: 20,
      contactPaddingBottom: 20,
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
      headerMarginBottom: 5,
      contactMarginBottom: 5,
      contactPaddingTop: 10,
      contactPaddingBottom: 10,
    });
  };

  keyboardDidHide = (event) => {
    this.setState({
      headerMarginBottom: 30,
      contactMarginBottom: 10,
      contactPaddingTop: 20,
      contactPaddingBottom: 20,
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
          text={"Submit >"}
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
      <View 
        style={[styles.container, { paddingBottom: this.keyboardHeight }]} 
      >
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>

          <View style={[styles.header, { marginBottom: this.state.headerMarginBottom }]}>
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
                style={[styles.contact, { 
                  marginBottom: this.state.contactMarginBottom,
                  paddingTop: this.state.contactPaddingTop,
                  paddingBottom: this.state.contactPaddingBottom,
                }]}
                onChangeText={(firstName) => this.updateFirstName(firstName)}
                value={this.state.firstName}
                underlineColorAndroid='transparent'
                onBlur={() => this.firstNameCheck()}
              />
            </View>
            <View style={styles.contact_wrap}>
              <TextInput 
                onFocus={() => this.setState({lastName: ''})}
                style={[styles.contact, { 
                  marginBottom: this.state.contactMarginBottom,
                  paddingTop: this.state.contactPaddingTop,
                  paddingBottom: this.state.contactPaddingBottom,
                }]}
                onChangeText={(lastName) => this.updateLastName(lastName)}
                value={this.state.lastName}
                underlineColorAndroid='transparent'
                onBlur={() => this.lastNameCheck()}
              />
            </View>
            <View style={styles.contact_wrap}>
              <TextInput 
                onFocus={() => this.setState({email: ''})}
                style={[styles.contact, { 
                  marginBottom: this.state.contactMarginBottom,
                  paddingTop: this.state.contactPaddingTop,
                  paddingBottom: this.state.contactPaddingBottom,
                }]}
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
                style={[styles.contact, { 
                  marginBottom: this.state.contactMarginBottom,
                  paddingTop: this.state.contactPaddingTop,
                  paddingBottom: this.state.contactPaddingBottom,
                }]}
                onChangeText={(phone) => this.updatePhone(phone)}
                value={this.state.phone}
                underlineColorAndroid='transparent'
                keyboardType='phone-pad'
                onBlur={() => this.phoneCheck()}
              />
            </View>

          </View>
        </ScrollView>

        <KeyboardSpacer/>

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
  },
});
