import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
} from 'react-native';

import env from '../env.js';

export default class HeaderNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: this.email(),
    };
  }

  email() {
    if (this.props.email == undefined) {
      return '';
    } else {
      return this.props.email;
    }
  }

  nextPageOrSubmit() {
    if (this.props.text == 'Submit >') {
      console.log('SUBMIT TO API');

      // is report anonymous?
      let anonymous = true;
      if (this.props.firstName || this.props.lastName) {
        anonymous = false;
      }

      const auth_params = (
        'username=' + env.data.username +
        '&password=' + env.data.password +
        '&grant_type=password' + 
        '&client_id=' + env.data.client_id +
        '&client_secret=' + env.data.client_secret
      )

      // get authorization
      fetch("https://test.salesforce.com/services/oauth2/token", {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: auth_params,
      }).then(auth => auth.json())
        .catch(error => console.error('ERROR: ', error))
        .then(auth_response => {
          console.log('AUTH SUCCESS: ', auth_response);
          let category = 'other';
          if (this.props.category) { category = this.props.category }
          let latitude = '';
          if (this.props.latitude) { latitude = this.props.latitude }
          let longitude = '';
          if (this.props.longitude) { longitude = this.props.longitude }

          // create new case
          fetch(auth_response.instance_url + '/services/data/v20.0/sobjects/Case/', {
            method: 'POST',
            headers: {
              'Authorization': "Bearer " + auth_response.access_token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              RecordTypeId: "01241000001IK5KAAW",   // RecordTypeId (Id): '01241000001IK5KAAW' 
              Status: "Open",   // Status (picklist): 'Open'
              Origin: "Mobile App",   // Origin (picklist): 'Mobile App'
              Priority: "Normal",   // Priority (picklist): 'Normal'
              Anonymous__c: anonymous,

              Subject: `${category}`,   // Subject (text/255): Main subject or summary of the request. In our current web-to-case form, we are mapping a picklist of "concern" values to this Subject field.
              Description: `${this.props.description}`,   // Description (text/32000): Details of the request.
              Anonymous__c: `${anonymous}`,   // Anonymous__c (true/false): Set to true if the requestor does not wish to furnish their name. Set to false otherwise. There is validation to ensure that this field must be set to true if first and last name are blank, and it must be set to false if either first or last name is not blank. Email and phone are optional either way.
              Case_Contact_First_Name__c: `${this.props.firstName}`,   // Case_Contact_First_Name__c (text/50): First name of the requestor
              Case_Contact_Last_Name__c: `${this.props.lastName}`,   // Case_Contact_Last_Name__c (text/50): Last name of the requestor
              Case_Contact_Email__c: `${this.state.email}`,   // Case_Contact_Email__c (email): Email address of the requestor
              Case_Contact_Phone__c: `${this.props.phone}`,   // Case_Contact_Phone__c (phone): Phone number of the requestor


              Location_Description__c: `${this.props.location}`, // (text/1000): The user can be given the option to describe the location rather than supply a point on a map.
              Location__Latitude__s: `${latitude}`, // (double) The latitude of the geolocation.
              Location__Longitude__s: `${longitude}`,  // (double) The longitude of the geolocation.
            })
          }).then(case_res => case_res.json())
            .catch(error => console.error('ERROR: ', error))
            .then(case_response => {
              console.log('CASE SUCCESS: ', case_response);

              // create image1 as attachment
              if (this.props.image1) {
                console.log('IMAGE1 BEING ATTACHED: ');
                fetch(auth_response.instance_url + '/services/data/v20.0/sobjects/Attachment/', {
                  method: 'POST',
                  headers: {
                    'Authorization': "Bearer " + auth_response.access_token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ParentId: `${case_response.id}`,
                    Name: "LexCall_image_1",
                    Body: `${this.props.image1.base64}`,
                  })
                }).then(image1_res => image1_res.json())
                  .catch(error => console.error('ERROR: ', error))
                  .then(image1_response => {
                    console.log('Image1 attachment SUCCESS: ', image1_response);
                });
              }

              // create image2 as attachment
              if (this.props.image2) {
                console.log('IMAGE2 BEING ATTACHED: ');
                fetch(auth_response.instance_url + '/services/data/v20.0/sobjects/Attachment/', {
                  method: 'POST',
                  headers: {
                    'Authorization': "Bearer " + auth_response.access_token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ParentId: `${case_response.id}`,
                    Name: "LexCall_image_2",
                    Body: `${this.props.image2.base64}`,
                  })
                }).then(image2_res => image2_res.json())
                  .catch(error => console.error('ERROR: ', error))
                  .then(image2_response => {
                    console.log('Image2 attachment SUCCESS: ', image2_response);
                });
              }



              if (case_response.id) {     
                this.props.navigation.navigate('Confirmation', {
                  firstName: this.props.firstName,
                  trackingID: case_response.id,
                });
              }
          });


      });

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

    } else {
      this.props.navigation.navigate(this.props.nav_link, {
        category: this.props.category,
        location: this.props.location,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        description: this.props.description,
        image1: this.props.image1,
        image2: this.props.image2,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        phone: this.props.phone,        
      });
    }
  }


  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={.6}
        onPress={() => this.nextPageOrSubmit()}
      >
        <View style={styles.wrap}>

          <Text style={styles.text}>
            {this.props.text}
          </Text>
    
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  wrap: {
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
    paddingRight: 10,
  },
});
