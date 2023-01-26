import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, Keyboard } from 'react-native'

// components
import HeaderTitle from './HeaderTitle.js'
import HeaderBack from './HeaderBack.js'
import HeaderNext from './HeaderNext.js'
import NineOneOne from './NineOneOne.js'
import Summary from './Summary.js'

// images
import summary_pencil from '../assets/images/summary_icon_pencil-alt.png'

import { setDescription } from '../actions/report'

const DescriptionScreen = ({ 
  description,
  navigation, 
  setDescription,
}) => {
  const [screenOffset, setScreenOffset] = useState(0)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBack
          nav_link={'Location'}
          navigation={navigation}
          text={'Back'}
        />
      ),
      headerTitle: () => <HeaderTitle text={'Create A Report'} />,
      headerRight: () => (
        <HeaderNext
          nav_link={'Photo'}
          navigation={navigation}
          text={'Next'}
        />
      ),
    })
  }, [navigation])

  useEffect(() => {
    // manage keyboard subscriptions
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => keyboardDidShow()
    )
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => keyboardDidHide()
    )
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const keyboardDidShow = () => {
    setScreenOffset(-160)
  }

  const keyboardDidHide = () => {
    setScreenOffset(0)
  }

  const updateDescription = (newDescription) => {
    setDescription(newDescription)
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: 20,
          marginTop: screenOffset,
        },
      ]}
    >
      <View style={styles.header}>
        <NineOneOne />
        <Summary
          icon={summary_pencil}
          heading={'Add Description of Issue'}
          content={'Add notes, comments, license number, etc.'}
        />
      </View>
      <View style={styles.description_wrap}>
        <TextInput
          style={[styles.description, { color: '#000' }]}
          onChangeText={(description) => {
            updateDescription(description)}
          }
          placeholder={'Add description here...'}
          value={description}
          multiline={true}
          underlineColorAndroid='transparent'
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
    borderBottomWidth: 1,
    borderColor: '#585858',
  },
  description_wrap: {
    flex: 6,
  },
  description: {
    margin: 10,
  },
})

const mapStateToProps = ({ report }) => ({
  description: report.description
})

const mapDispatchToProps = {
  setDescription
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DescriptionScreen)
