import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native'

// components
import HeaderTitle from './HeaderTitle.js'
import HeaderBack from './HeaderBack.js'
import HeaderNext from './HeaderNext.js'
import NineOneOne from './NineOneOne.js'
import Summary from './Summary.js'

// actions
import {
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
} from '../actions/report'

// images
import summary_pencil from '../assets/images/summary_icon_pencil-alt.png'


const ContactScreen = ({ 
  firstName,
  lastName,
  email,
  phone,
  navigation,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
}) => {
  const [screenOffset, setScreenOffset] = useState(0)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBack
          navigation={navigation}
          nav_link={'Photo'}
          text={'Back'}
        />
      ),
      headerTitle: () => <HeaderTitle text={'Create A Report'} />,
      headerRight: () => (
        <HeaderNext
          navigation={navigation}
          nav_link={'Review'}
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
    setScreenOffset(-190)
  }

  const keyboardDidHide = () => {
    setScreenOffset(0)
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
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          scrollEnabled={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.header}>
            <NineOneOne />
            <Summary
              icon={summary_pencil}
              heading={'Enter Contact Info'}
              content={
                'Add your contact info so we can follow up with you if needed.  An email is required.'
              }
            />
          </View>

          <View style={styles.all_contact_wrap}>
            <View style={styles.contact_wrap}>
              <TextInput
                onChangeText={(firstName) => setFirstName(firstName)}
                placeholder='First Name'
                style={[styles.contact]}
                underlineColorAndroid='transparent'
                value={firstName}
              />
            </View>
            <View style={styles.contact_wrap}>
              <TextInput
                onChangeText={(lastName) => setLastName(lastName)}
                placeholder='Last Name'
                style={[styles.contact]}
                underlineColorAndroid='transparent'
                value={lastName}
              />
            </View>
            <View style={styles.contact_wrap}>
              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(email) => setEmail(email)}
                placeholder='Email Address'
                style={[styles.contact]}
                value={email}
                underlineColorAndroid='transparent'
                keyboardType='email-address'
              />
            </View>
            <View style={styles.contact_wrap}>
              <TextInput
                keyboardType='phone-pad'
                onChangeText={(phone) => setPhone(phone)}
                placeholder='Phone Number'
                style={[styles.contact]}
                underlineColorAndroid='transparent'
                value={phone}
              />
            </View>
          </View>
        </ScrollView>
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
    height: 190,
    borderBottomWidth: 1,
    borderColor: '#585858',
    marginBottom: 10,
  },
  all_contact_wrap: {
    flex: 1,
  },
  contact_wrap: {},
  contact: {
    color: '#000',
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    borderColor: '#585858',
    borderWidth: 1,
  },
})

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ContactScreen)
