import { connect } from 'react-redux'
import { 
  Image, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View, 
} from 'react-native'
import { web, phonecall } from 'react-native-communications'

import { setCategory } from '../actions/report'

const MenuOption = ({
  img,
  nav_link,
  navigation,
  selectedCategory='',
  setCategory,
  text,
}) => {
  const link_logic = ({
    nav_link, 
    navigation,
    selectedCategory,
  }) => {
    if (nav_link == 'Phone') {
      phonecall('8594252255', true)
    } else if (nav_link == 'SignUp') {
      web('https://arcg.is/0SPWPG')
    } else if (nav_link == 'WebReport') {
      web('https://www.lexingtonky.gov/lexcall')
    } else if (nav_link == 'MapOfReports') {
      web(
        'http://www.arcgis.com/apps/webappviewer/index.html?id=587e882ba3784c088a5cc410f868d7e5'
      )
    } else if (nav_link == 'TrafficInfo') {
      web('https://www.lexingtonky.gov/traffic-ticker')
    } else if (nav_link == 'LexingtonWebsite') {
      web('https://www.lexingtonky.gov')
    } else {
      // internal screen + params
      setCategory(selectedCategory)
      navigation.navigate(nav_link)
    }
  }

  return (
    <TouchableOpacity
      style={styles.menu_option}
      activeOpacity={0.6}
      onPress={() => {
        link_logic({
          selectedCategory: selectedCategory,
          nav_link: nav_link,
          navigation: navigation
        })
      }}
    >
      <View style={styles.wrap}>
        <Image
          source={img}
          style={styles.icon}
          resizeMode='cover'
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menu_option: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#585858',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  icon: {
    height: 16,
    width: 16,
  },
  text: {
    color: '#585858',
    fontSize: 16,
    paddingLeft: 10,
  },
})

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {
  setCategory,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuOption)
