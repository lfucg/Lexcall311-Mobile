import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
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
          text={"< Home"}
          nav_link={"Home"}
          category={navigation.getParam('category')}
          location={navigation.getParam('location')}
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
        <HeaderTitle text={"Report Submitted"}/>
      ),
    };
  }

  render() {
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
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#585858',
  },
  confirm_wrap: {
    flex: 2,
    margin: 20,
    alignItems: 'center',
  },
  text: {
  },
  trackingID: {
    margin: 50,
    fontSize: 20,
    fontWeight: '600',
  }
  
});

