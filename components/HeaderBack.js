import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'

import chevron_left_img from '../assets/images/icon_chevron-left.png'

import { clearState } from '../actions/report'

const HeaderBack = ({ 
  clearState,
  navigation,
  nav_link,
  text,
}) => {
  
  const navigateBackToPrevious = () => {
    navigation.navigate(nav_link)
  }

  const returnToLocationScreen = () => {
    navigation.navigate('Location')
  }

  const backToCategoryScreen = () => {
    navigateBackToPrevious()
  }

  const alertUser = () => {
    Alert.alert(
      'Discard changes?',
      'Your report information will be lost if you confirm.',
      [
        {
          text: 'No, continue editing',
          onPress: () => returnToLocationScreen(),
        },
        {
          text: 'Yes, discard changes',
          onPress: () => {
            clearState(),
            backToCategoryScreen()
          },
          style: 'cancel',
        },
      ],
      { cancelable: false }
    )
  }

  const backOrAbort = () => {
    if (nav_link === 'Category') {
      alertUser()
    } else {
      navigateBackToPrevious()
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => backOrAbort()}
    >
      <View style={styles.wrap}>
        {text ? (
          <Image style={styles.chevron} source={chevron_left_img} />
        ) : null}

        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  wrap: {
    flexDirection: 'row',
  },
  chevron: {
    height: 20,
    width: 20,
    tintColor: '#007aff',
    ...Platform.select({
      android: {
        marginTop: 3,
      },
    }),
  },
  text: {
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontSize: 18,
      },
    }),
    fontWeight: '600',
    color: '#007aff',
  },
})

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {
  clearState,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBack)
