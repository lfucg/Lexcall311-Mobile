import React from 'react';
import { 
  StyleSheet,
  Text,
  View 
} from 'react-native';

import HeaderTitle from './HeaderTitle.js';
import HeaderLeft from './HeaderLeft.js';
import HeaderRight from './HeaderRight.js';

import MenuOption from './MenuOption.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

import search_img from '../assets/images/search.png';


export default class CategoryScreen extends React.Component {

 static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderLeft
          navigation={navigation}
          text={"< Home"}
          nav_link={"Home"}
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerRight: (
        <HeaderRight
          navigation={navigation}
          text={"Next >"}
          nav_link={"Home"}
        />
      ),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NineOneOne />
        <Summary 
          icon={search_img} 
          heading={"Select a Category"}
          content={"Select which type of issue you are reporting."}
        />
        <View style={styles.menu}>
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Bulky Trash Pickup"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Dead Animal Removal"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Garbage Collection"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Nuisance Complaint"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Park Maintenance"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Pothole Repair"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Questions and/or Comments"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Recycling Collection"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Traffic Light/Sign"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Yard Waste Collection"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_screen={'Category'} 
            img={search_img} 
            text={"Other"}
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
    flex: 6,
  },
  header: {
    flex: 4,
  },
});

