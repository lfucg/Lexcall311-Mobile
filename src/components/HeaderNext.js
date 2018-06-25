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

      fetch("https://test.salesforce.com/services/oauth2/token", {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: auth_params,
      }).then(res => res.json())
        .catch(error => console.error('ERROR: ', error))
        .then(response => {
          console.log('SUCCESS: ', response)
      });

      // fetch("https://lexcall--devlex311.cs20.my.salesforce.com/services/data/v20.0/sobjects/Account/", {
      //   method: 'POST',
      //   headers: {
      //     // 'Accept': 'application/json',
      //     // "Authorization": "Bearer token",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: `${env.data.username}`,
      //     password: `${env.data.password}`,

      //     RecordTypeId: "01241000001IK5KAAW",   // RecordTypeId (Id): '01241000001IK5KAAW' 
      //     Status: "Open",   // Status (picklist): 'Open'
      //     Origin: "Mobile App",   // Origin (picklist): 'Mobile App'
      //     Priority: "Normal",   // Priority (picklist): 'Normal'
      //     Anonymous__c: "true",
        
      //     Subject: "Dead Animal Pickup",   
      //     Description: "Trash",
      //     Street_Number__c: "625",   // (text/10)
      //     Street_Name__c: "HILL N DALE RD",   // (text/100)
      //     Location__Latitude__s: "38.0168302600",
      //     Location__Longitude__s: "-84.5403933100"
      //   })
      // }).then(res => res.json())
      // .catch(error => console.error('ERROR: ', error))
      // .then(response => {
      //   console.log('SUCCESS: ', response)
      // });


// NOT NEEDED? 
// grant_type: 'password',
// "&client_id=" + env.data.client_id +
// "&client_secret=" + env.data.client_secret +

          // Description: `${this.props.description}`,   // Description (text/32000): Details of the request.
          // Case_Contact_First_Name__c: `${this.props.firstName}`,   // Case_Contact_First_Name__c (text/50): First name of the requestor
          // Case_Contact_Last_Name__c: `${this.props.lastName}`,   // Case_Contact_Last_Name__c (text/50): Last name of the requestor
          // Anonymous__c: `${anonymous}`,   // Anonymous__c (true/false): Set to true if the requestor does not wish to furnish their name. Set to false otherwise. There is validation to ensure that this field must be set to true if first and last name are blank, and it must be set to false if either first or last name is not blank. Email and phone are optional either way.
          // Subject: `${this.props.category}`,   // Subject (text/255): Main subject or summary of the request. In our current web-to-case form, we are mapping a picklist of "concern" values to this Subject field.
          // Case_Contact_Email__c: `${this.props.email}`,   // Case_Contact_Email__c (email): Email address of the requestor
          // Case_Contact_Phone__c: `${this.props.phone}`,   // Case_Contact_Phone__c (phone): Phone number of the requestor
      //     // Case_Contact_Role__c (picklist): This field has not fully been defined. Will have values like 'Resident', 'Owner', and 'Neighbor'. Full list TBD.
      //     // Override_Address_Validation__c (true/false): Set to false. 
      //     // Location_Description__c (text/1000): The user can be given the option to describe the location rather than supply a point on a map.
      //     // Location__Latitude__s (double): The latitude of the geolocation.
      //     // Location__Longitude__s (double): The longitude of the geolocation.
      //     // For the remaining fields, simply pass through the values that come from ESRI. Most should be self-explanatory.
      //     // Address_ID__c (text/20): The ESRI Address ID for the address, or the ESRI Intersection ID if it is an intersection.
      //     // Location_Type__c (picklist): 'Address', 'Intersection', 'Landmark', 'Range of Addresses'
      //     // Parcel_ID__c (text/20)
      //     // Intersection__c (text/255): The name of the intersection (e.g. 'Main St / Elm St').
      //     // Unit_Number__c (text/10)
      //     // City__c (text/100)
      //     // State__c (text/2)
      //     // ZIP__c (text/10)
      //     // Property_Owner__c (text/255)
      //     // Property_Owner_Mailing_Address__c (text/255)
      //     // Property_Class__c (text/25)
      //     // Tax_District__c (text/40)
      //     // Council_District__c (text/2)
      //     // Quad__c (text/10)
      //     // Business_Pickup__c (text/10)
      //     // Residential_Pickup__c (text/10)
      //     // Urban_Service_Area__c (text/10)





        // PASS CONFIRMATION ID BACK TO USER
        // this.props.navigation.navigate('Confirmation', {
        //   category: this.props.category,
        //   location: this.props.location,
        //   description: this.props.description,
        //   image1: this.props.image1,
        //   image2: this.props.image2,
        //   firstName: this.props.firstName,
        //   lastName: this.props.lastName,
        //   email: this.props.email,
        //   phone: this.props.phone,        
        // });
    } else {
      this.props.navigation.navigate(this.props.nav_link, {
        category: this.props.category,
        location: this.props.location,
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
    fontWeight: '600',
    fontSize: 18,
    color: '#007aff',
    paddingRight: 10,
  },
});
