import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native'

import {
  client_id,
  client_secret,
  password,
  token,
  username,
  url,
} from '@env'

import chevron_right_img from '../assets/images/icon_chevron-right.png'

import { 
  setCategory,
  setFirstName,
  setLatitude,
  setLongitude,
  setTrackingId,
} from '../actions/report'

const HeaderNext = ({ 
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
  nav_link,
  phone,
  setCategory,
  setLatitude,
  setLongitude,
  setTrackingId,
  text,
}) => {
  const [loading, setLoading] = useState(false)

  const navigateToNext = () => {
    navigation.navigate(nav_link)
  }

  const checkRequiredData = (nextPage) => {
    if (nextPage === 'Photo') {
      if (
        !description ||
        // this is default from the DescriptionScreen
        description === 'Add description here...'
      ) {
        alert('A description is required')
      } else {
        navigateToNext()
      }
    } else {
      if (!email) {
        alert('An email is required')
      } else {
        navigateToNext()
      }
    }
  }

  const nextPageOrSubmit = () => {
    if (text == 'Submit') {
      setLoading(true)

      // is report anonymous?
      let anonymous = true
      if (firstName || lastName) {
        anonymous = false
      }

      const auth_params =
        'username=' + username +
        '&password=' + password +
        token +
        '&grant_type=password' +
        '&client_id=' + client_id +
        '&client_secret=' + client_secret

      try {
        // get authorization
        // to change environments, change .env information 
        fetch(`${url}/services/oauth2/token`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: auth_params,
        })
          .then((auth) => auth.json())
          .catch((error) => {
            console.error('AUTH ERROR: ', error)
            throw error
          })
          .then((auth_response) => {
            // throw error
            const noCategory = 'other'
            if (!category) {
              setCategory(noCategory)
            }
            const noLatitude = ''
            if (!latitude) {
              setLatitude(noLatitude)
            }
            const noLongitude = ''
            if (!longitude) {
              setLongitude(noLongitude)
            }

            // create new case
            const caseUrl = `${auth_response?.instance_url}/services/data/v55.0/sobjects/Case/`
            const headers = {
              Authorization: 'Bearer ' + auth_response.access_token,
              'Content-Type': 'application/json',
            }
            const body = JSON.stringify({
              RecordTypeId: '01241000001IK5KAAW', // RecordTypeId (Id): '01241000001IK5KAAW'
              Status: 'Open', // Status (picklist): 'Open'
              Origin: 'Mobile App', // Origin (picklist): 'Mobile App'
              Priority: 'Normal', // Priority (picklist): 'Normal'
              Anonymous__c: anonymous,

              Subject: `${category}`, // Subject (text/255): Main subject or summary of the request. In our current web-to-case form, we are mapping a picklist of "concern" values to this Subject field.
              Description: `${description}`, // Description (text/32000): Details of the request.
              Anonymous__c: `${anonymous}`, // Anonymous__c (true/false): Set to true if the requestor does not wish to furnish their name. Set to false otherwise. There is validation to ensure that this field must be set to true if first and last name are blank, and it must be set to false if either first or last name is not blank. Email and phone are optional either way.
              Case_Contact_First_Name__c: `${firstName}`, // Case_Contact_First_Name__c (text/50): First name of the requestor
              Case_Contact_Last_Name__c: `${lastName}`, // Case_Contact_Last_Name__c (text/50): Last name of the requestor
              Case_Contact_Email__c: `${email}`, // Case_Contact_Email__c (email): Email address of the requestor
              Case_Contact_Phone__c: `${phone}`, // Case_Contact_Phone__c (phone): Phone number of the requestor

              Location_Description__c: `${location}`, // (text/1000): The user can be given the option to describe the location rather than supply a point on a map.
              Location__Latitude__s: `${latitude}`, // (double) The latitude of the geolocation.
              Location__Longitude__s: `${longitude}`, // (double) The longitude of the geolocation.
            })
            fetch(
              caseUrl,
              {
                method: 'POST',
                headers: headers,
                body: body
              }
            )
              .then((case_res) => case_res.json())
              .catch((error) => {
                alert('There was an error submitting your report.')
                throw error
              })
              .then((case_response) => {
                console.log('CASE SUCCESS: ', case_response)

                // create image1 as attachment
                if (image1) {
                  fetch(
                    auth_response.instance_url +
                      '/services/data/v55.0/sobjects/Attachment/',
                    {
                      method: 'POST',
                      headers: {
                        Authorization: 'Bearer ' + auth_response.access_token,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        ParentId: `${case_response.id}`,
                        Name: 'LexCall_image_1',
                        Body: `${image1?.base64}`,
                      }),
                    }
                  )
                    .then((image1_res) => image1_res.json())
                    .catch((error) => console.error('ERROR: ', error))
                    .then((image1_response) => {})
                }

                // create image2 as attachment
                if (image2) {
                  fetch(
                    auth_response.instance_url +
                      '/services/data/v55.0/sobjects/Attachment/',
                    {
                      method: 'POST',
                      headers: {
                        Authorization: 'Bearer ' + auth_response.access_token,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        ParentId: `${case_response.id}`,
                        Name: 'LexCall_image_2',
                        Body: `${image2?.base64}`,
                      }),
                    }
                  )
                    .then((image2_res) => image2_res.json())
                    .catch((error) => console.error('ERROR: ', error))
                    .then((image2_response) => {})
                }

                if (case_response?.id) {
                  setFirstName(firstName)
                  setTrackingId(case_response.id)
                  navigation.navigate('Confirmation')
                }
              })
          })

        // **************** OTHER API SUBMISSION FIELDS ****************
        // Street_Number__c: "625",   // (text/10)
        // Street_Name__c: "HILL N DALE RD",   // (text/100)
        // Override_Address_Validation__c (true/false): Set to false.
        // Case_Contact_Role__c (picklist): This field has not fully been defined. Will have values like 'Resident', 'Owner', and 'Neighbor'. Full list TBD.
        // For the remaining fields, simply pass through the values that come from ESRI. Most should be self-explanatory.
        // Address_ID__c (text/20): The ESRI Address ID for the address, or the ESRI Intersection ID if it is an intersection.
        // Location_Type__c (picklist): 'Address', 'Intersection', 'Landmark', 'Range of Addresses'
        // Parcel_ID__c (text/20)
        // Intersection__c (text/255): The name of the intersection (e.g. 'Main St / Elm St').
        // Unit_Number__c (text/10)
        // City__c (text/100)
        // State__c (text/2)
        // ZIP__c (text/10)
        // Property_Owner__c (text/255)
        // Property_Owner_Mailing_Address__c (text/255)
        // Property_Class__c (text/25)
        // Tax_District__c (text/40)
        // Council_District__c (text/2)
        // Quad__c (text/10)
        // Business_Pickup__c (text/10)
        // Residential_Pickup__c (text/10)
        // Urban_Service_Area__c (text/10)
      } catch (error) {
        console.log('SUBMIT ERROR: ', error)
      }
    } else {
      if (nav_link === "Photo" || nav_link === "Review") {
        checkRequiredData(nav_link)
      } else {
        navigateToNext()
      }
    }
  }

  
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => nextPageOrSubmit()}
    >
      {text ? (
        <View>
          {loading ? (
            <View
              style={[
                styles.loading,
              ]}
            >
              <Text>LOADING...</Text>
            </View>
          ) : (
            <View style={styles.wrap}>
              <Text style={styles.text}>{text}</Text>
              <Image style={styles.chevron} source={chevron_right_img} />
            </View>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  wrap: {
    flexDirection: "row",
  },
  chevron: {
    height: 20,
    width: 20,
    tintColor: "#007aff",
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
    fontWeight: "600",
    color: "#007aff",
  },
  loading: {
    justifyContent: "center",
    paddingLeft: 2,
    width: 80,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderColor: "#585858",
    borderWidth: 1,
    zIndex: 100,
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

const mapDispatchToProps = {
  setCategory,
  setLatitude,
  setLongitude,
  setTrackingId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps  
)(HeaderNext)

