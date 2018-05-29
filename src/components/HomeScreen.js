import React from 'react';
import { 
  Button, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';


// components
import HeaderTitle from './HeaderTitle.js';
import HeaderLeft from './HeaderLeft.js';
import HeaderRight from './HeaderRight.js';
import MenuOption from './MenuOption.js';
import IndexCreateReport from './IndexCreateReport.js';

// images
import HeaderImg from './HeaderImg.js';
import search_img from '../assets/images/search.png';
import phone_img from '../assets/images/phone.png';
import user_plus_img from '../assets/images/user-plus.png';
import car_img from '../assets/images/car.png';
import external_link_alt_img from '../assets/images/external-link-alt.png';


export default class HomeScreen extends React.Component {

 static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderLeft />
      ),
      headerTitle: (
        <HeaderTitle text={"LexCall 311"}/>
      ),
      headerRight: (
        <HeaderRight />
      ),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderImg />
          <IndexCreateReport navigation={this.props.navigation} />
        </View>
        <View style={styles.menu}>
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'WebReport'} 
            img={search_img} 
            text={"Look up a 311 Report"} 
          />
          {
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'Phone'} 
            img={phone_img} 
            text={"Call LexCall 311"} 
          />
          }
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'Category'} 
            img={user_plus_img} 
            text={"Sign up for 311 Alerts"} 
          />
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'Category'} 
            img={car_img} 
            text={"Traffic Info"} 
          />
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'Category'} 
            img={external_link_alt_img} 
            text={"Visit lexingtonky.gov"} 
          />
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
  menu: {
    flex: 5,
  },
  header: {
    flex: 5,
  },
});
