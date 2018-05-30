import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Platform, 
} from 'react-native';

export default class Summary extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.img_wrap}>
            <Image
              source={this.props.icon}
              style={styles.icon}
            />
          </View>

          <Text style={styles.heading}>
            {this.props.heading}
          </Text>
          <Text style={styles.content}>
            {this.props.content}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_wrap: {
    flex: 2,
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  heading: {
    flex: 3,
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 3,
    fontSize: 16,
  },
})

