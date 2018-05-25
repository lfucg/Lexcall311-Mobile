import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TouchableOpacity,
} from 'react-native';

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Text 
            style={styles.back}
            onPress={() => this.props.navigation.navigate(this.props.back_nav)}
          >
            {'<'} {this.props.back}
          </Text>
          
          <View style={styles.title_wrap}>
            <Text style={styles.title}>{this.props.text}</Text>
          </View>
          
          <Text 
          style={styles.next}
            activeOpacity={.6}
            onPress={() => this.props.navigation.navigate(this.props.next_nav)}
          >
            {this.props.next} {'>'}
          </Text>
    
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
      android: {
        paddingTop: 15,
      },
    }),
  },
  back: {
    position: 'absolute',
    left: 10,
    fontWeight: '600',
    fontSize: 18,
    color: '#007aff',
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
      android: {
        paddingTop: 15,
      },
    }),
  },
  title_wrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  next: {
    position: 'absolute',
    right: 10,
    fontWeight: '600',
    fontSize: 18,
    color: '#007aff',
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
      android: {
        paddingTop: 15,
      },
    }),
  },
});
