import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, 
  View, 
} from 'react-native'
import {
  password,
  url,
} from '@env'

// components
import HeaderTitle from './HeaderTitle.js'
import HeaderBack from './HeaderBack.js'
import HeaderNext from './HeaderNext.js'
import MenuOption from './MenuOption.js'
import IndexCreateReport from './IndexCreateReport.js'
import HeaderImg from './HeaderImg.js'

// images
import search_img from '../assets/images/icon_search.png'
import phone_img from '../assets/images/icon_phone.png'
import car_img from '../assets/images/icon_car.png'
import external_link_alt_img from '../assets/images/icon_external-link-alt.png'
import bell_img from '../assets/images/icon_bell.png'
import map_img from '../assets/images/icon_map.png'



const HomeScreen = ({ navigation }) => {
  console.log(url == 'https://lexcall--uat.sandbox.my.salesforce.com' ? 'STAGE' : 'PRODUCTION')
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBack />,
      headerTitle: () => <HeaderTitle text={'LexCall 311'} />,
      headerRight: () => <HeaderNext />,
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderImg />
      </View>
      <View style={styles.menu}>
        {
          <MenuOption
            navigation={navigation}
            nav_link={'Phone'}
            img={phone_img}
            text={'Call LexCall 311'}
          />
        }
        <MenuOption
          navigation={navigation}
          nav_link={'SignUp'}
          img={bell_img}
          text={'Sign up for 311 Alerts'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'WebReport'}
          img={search_img}
          text={'Look up a 311 Report'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'MapOfReports'}
          img={map_img}
          text={'View Map of Current Reports'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'TrafficInfo'}
          img={car_img}
          text={'Traffic Info'}
        />
        <MenuOption
          navigation={navigation}
          nav_link={'LexingtonWebsite'}
          img={external_link_alt_img}
          text={'Visit lexingtonky.gov'}
        /> 
        <IndexCreateReport navigation={navigation} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menu: {
    flex: 5,
  },
  header: {
    flex: 4,
  },
})

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)