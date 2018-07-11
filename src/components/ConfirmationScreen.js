import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Clipboard,
  TouchableOpacity,
} from 'react-native';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import summary_check from '../assets/images/summary_icon_check-circle.png';


export default class ConfirmationScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderBack
          navigation={navigation}
          text={"Home"}
          nav_link={"Home"}
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Report Submitted"}/>
      ),
    };
  }


  writeToClipboard = async () => {
    await Clipboard.setString(this.props.navigation.state.params.trackingID);
    alert('Copied to Clipboard!');
  };


  render() {
    console.log('CONFIRMATION SCREEN PARAMS: ', this.props.navigation.state.params);


    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={summary_check} 
            heading={"Submission Confirmed"}
            content={"Thank you for your submission!"}
          />
        </View>

        <View style={styles.confirm_wrap}>
          <Text style={styles.text}>
            Your report has been queued and will be handled by the next available LexCall representative.  You can use the tracking number below to track your request on our website lexingtonky.gov.
          </Text>
            <Text style={styles.trackingID}>
            
            Tracking ID:
          </Text>
          <TouchableOpacity onPress={() => this.writeToClipboard()}>
            <Text style={styles.trackingID_number}>
              {this.props.navigation.state.params.trackingID}
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            If you have any questions or comments, you can call LexCall at (859) 425-2255.
          </Text>
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
    height: 160,
    borderBottomWidth: 1,
    borderColor: '#585858',
  },
  confirm_wrap: {
    flex: 2,
    margin: 20,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  trackingID: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  trackingID_number: {
    color: 'red',
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
});

