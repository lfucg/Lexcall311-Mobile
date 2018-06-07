import React from 'react';
import { 
  StyleSheet,
  Text,
  View 
} from 'react-native';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderLeft from './HeaderLeft.js';
import HeaderRight from './HeaderRight.js';
import MenuOption from './MenuOption.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import check_img from '../assets/images/summary_icon_check-circle.png';
import trash_img from '../assets/images/icon_trash-alt.png';
import road_img from '../assets/images/icon_road.png';
import truck_img from '../assets/images/icon_truck.png';
import volume_img from '../assets/images/icon_volume-up.png';
import wrench_img from '../assets/images/icon_wrench.png';
import car_img from '../assets/images/icon_car.png';
import question_img from '../assets/images/icon_question.png';
import recycle_img from '../assets/images/icon_recycle.png';
import sign_img from '../assets/images/icon_map-signs.png';
import tree_img from '../assets/images/icon_tree.png';
import ellipsis_img from '../assets/images/icon_ellipsis-h.png';

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
        <HeaderRight />
      ),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={check_img} 
            heading={"Select a Category"}
            content={"Select which type of issue you are reporting."}
          />
        </View>
        <View style={styles.menu}>
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={trash_img} 
            text={"Bulky Trash Pickup"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={road_img} 
            text={"Dead Animal Removal"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={truck_img} 
            text={"Garbage Collection"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={volume_img} 
            text={"Nuisance Complaint"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={wrench_img} 
            text={"Park Maintenance"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={car_img} 
            text={"Pothole Repair"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={question_img} 
            text={"Questions and/or Comments"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={recycle_img} 
            text={"Recycling Collection"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={sign_img} 
            text={"Traffic Light/Sign"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={tree_img} 
            text={"Yard Waste Collection"}
          />
          <MenuOption 
            navigation={this.props.navigation}
            nav_link={'Location'} 
            img={ellipsis_img} 
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
  header: {
    flex: 2,
  },
  menu: {
    flex: 6,
  },
});

