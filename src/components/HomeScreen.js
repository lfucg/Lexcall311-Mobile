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
import HeaderImg from './HeaderImg.js';

// images
import search_img from '../assets/images/icon_search.png';
import phone_img from '../assets/images/icon_phone.png';
import car_img from '../assets/images/icon_car.png';
import external_link_alt_img from '../assets/images/icon_external-link-alt.png';
import bell_img from '../assets/images/icon_bell.png';
import map_img from '../assets/images/icon_map.png';

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
            nav_link={'SignUp'} 
            img={bell_img} 
            text={"Sign up for 311 Alerts"} 
          />
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'WebReport'} 
            img={search_img} 
            text={"Look up a 311 Report"} 
          />
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'MapOfReports'} 
            img={map_img} 
            text={"View Map of Current Reports"} 
          />
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'TrafficInfo'} 
            img={car_img} 
            text={"Traffic Info"} 
          />
          <MenuOption
            navigation={this.props.navigation}
            nav_link={'LexingtonWebsite'} 
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

