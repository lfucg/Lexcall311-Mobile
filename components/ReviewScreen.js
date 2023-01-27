import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image } from 'react-native'

// components
import HeaderTitle from './HeaderTitle.js'
import HeaderBack from './HeaderBack.js'
import HeaderNext from './HeaderNext.js'
import NineOneOne from './NineOneOne.js'
import Summary from './Summary.js'

// images
import summary_icon_check from '../assets/images/summary_icon_check-circle.png'
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

const ReviewScreen = ({ 
  category,
  description,
  email,
  firstName,
  image1,
  image2,
  lastName,
  latitude,
  location,
  longitude,
  navigation, 
  phone,
}) => {

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBack
          navigation={navigation}
          nav_link={'Contact'}
          text={'Back'}
        />
      ),
      headerTitle: () => <HeaderTitle text={'Review Your Report'} />,
      headerRight: () => (
        <HeaderNext
          navigation={navigation}
          nav_link={'Home'}
          text={'Submit'}
        />
      ),
    })
  }, [navigation])
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'garbage_collection':
        return truck_img
      case 'trash_pickup':
        return trash_img
      case 'yard_waste':
        return tree_img
      case 'recycling':
        return recycle_img
      case 'pothole':
        return car_img
      case 'nuisance_complaint':
        return volume_img
      case 'park_maintenance':
        return wrench_img
      case 'dead_animal':
        return road_img
      case 'traffic_light':
        return sign_img
      case 'housing_complaint':
        return house_img
      case 'sidewalk_complaint':
        return sidewalk_img
      case 'other':
        return ellipsis_img
      case 'question':
        return question_img
      default:
        return summary_icon_check
    }
  }

  return (
    <View style={[styles.container, {}]}>
      <View style={styles.header}>
        <NineOneOne />
        <Summary
          icon={summary_icon_check}
          heading={'Review Your Report'}
          content={
            'Review your report before submission. Return to previous screens to edit.'
          }
        />
      </View>
      <View style={styles.review_wrap}>
        <Text style={styles.review_item}>
          Name: {firstName} {lastName}
        </Text>
        <Text style={styles.review_item}>Email Address: {email}</Text>
        <Text style={styles.review_item}>Phone Number: {phone}</Text>
        <Text style={styles.review_item}>Category: {category}</Text>
        <Text style={styles.review_item}>
          Location:{' '}
          {location
            ? location
            : latitude
            ? 'map location submitted'
            : ''}
        </Text>
        <Text style={styles.review_item}>
          Description: {description}{' '}
        </Text>
        <Text style={styles.review_item}>
          Images Submitted:{' '}
          {image1 === undefined
            ? 'none'
            : image1 === null
            ? 'none'
            : 'yes'}
        </Text>
        <Image
          source={getCategoryIcon(category)}
          style={styles.category_icon}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  header: {
    height: 190,
    borderBottomWidth: 1,
    borderColor: '#585858',
    marginBottom: 10,
  },
  review_wrap: {
    flex: 1,
    margin: 20,
  },
  review_item: {
    fontSize: 18,
    padding: 5,
  },
  category_icon: {
    alignSelf: 'center',
    marginTop: 5,
  },
})

const mapStateToProps = ({ report }) => ({
  category: report.category,
  description: report.description,
  email: report.email,
  firstName: report.firstName,
  image1: report.image1,
  image2: report.image2,
  lastName: report.lastName,
  latitude: report.latitude,
  location: report.location,
  longitude: report.longitude,
  phone: report.phone,
})

const mapDispatchToProps = {}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ReviewScreen)
