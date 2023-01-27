import { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'

// components
import HeaderTitle from './HeaderTitle.js'
import HeaderBack from './HeaderBack.js'
import HeaderNext from './HeaderNext.js'
import MenuOption from './MenuOption.js'
import NineOneOne from './NineOneOne.js'
import Summary from './Summary.js'

// images
import check_img from '../assets/images/summary_icon_check-circle.png'
import trash_img from '../assets/images/icon_trash-alt.png'
import road_img from '../assets/images/icon_road.png'
import truck_img from '../assets/images/icon_truck.png'
import volume_img from '../assets/images/icon_volume-up.png'
import wrench_img from '../assets/images/icon_wrench.png'
import car_img from '../assets/images/icon_car.png'
import question_img from '../assets/images/icon_question.png'
import recycle_img from '../assets/images/icon_recycle.png'
import sign_img from '../assets/images/icon_map-signs.png'
import tree_img from '../assets/images/icon_tree.png'
import ellipsis_img from '../assets/images/icon_ellipsis-h.png'
import house_img from '../assets/images/icon_house.png'
import sidewalk_img from '../assets/images/icon_sidewalk.png'

const CategoryScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBack 
          navigation={navigation} 
          nav_link={'Home'} 
          text={'Home'} 
        />
      ),
      headerTitle: () => <HeaderTitle text={'Create A Report'} />,
      headerRight: () => (
        <HeaderNext />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NineOneOne />
        <Summary
          icon={check_img}
          heading={'Select a Category'}
          content={'Select which type of issue you are reporting.'}
        />
      </View>
      <View style={styles.menu}>
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={truck_img}
          text={'Garbage Collection'}
          selectedCategory={'garbage_collection'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={trash_img}
          text={'Appliance/Tires'}
          selectedCategory={'trash_pickup'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={tree_img}
          text={'Yard Waste Collection'}
          selectedCategory={'yard_waste'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={recycle_img}
          text={'Recycling Collection'}
          selectedCategory={'recycling'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={car_img}
          text={'Pothole Repair'}
          selectedCategory={'pothole'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={volume_img}
          text={'Nuisance Complaint'}
          selectedCategory={'nuisance_complaint'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={wrench_img}
          text={'Park Maintenance'}
          selectedCategory={'park_maintenance'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={road_img}
          text={'Dead Animal Removal'}
          selectedCategory={'dead_animal'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={sign_img}
          text={'Traffic Light/Sign'}
          selectedCategory={'traffic_light'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={house_img}
          text={'Housing Complaint/Non-Emergency'}
          selectedCategory={'housing_complaint'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={sidewalk_img}
          text={'Sidewalk Complaint'}
          selectedCategory={'sidewalk_complaint'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={ellipsis_img}
          text={'Other'}
          selectedCategory={'other'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'Location'}
          img={question_img}
          text={'Questions and/or Comments'}
          selectedCategory={'question'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 170,
  },
  menu: {
    flex: 1,
  },
})

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryScreen)
