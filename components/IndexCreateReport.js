import { 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View, 
} from 'react-native'
import pencil_img from '../assets/images/icon_pencil-alt.png'

const IndexCreateReport =({
  navigation
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={.8}
      onPress={() => {
        navigation.navigate('Category')
      }}
    >
      <View style={styles.wrap}>
        <Image 
          source={pencil_img} 
          style={styles.pencil_img}
        />
        <Text style={styles.text}>
          Create a New 311 Report
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderColor: '#585858',
    borderTopWidth: 2,
  },
  wrap: {
    backgroundColor: '#0456A8',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',
    margin: 5,
    ...Platform.select({
      ios: {
        shadowOffset:{ width: 0, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pencil_img: {
    height: 18,
    width: 18,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
})

export default IndexCreateReport