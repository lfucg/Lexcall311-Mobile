import React from 'react';
import { 
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from './src/components/HomeScreen.js';
import CategoryScreen from './src/components/CategoryScreen.js';
import LocationScreen from './src/components/LocationScreen.js';


const Root = createStackNavigator(
  {
    Home:  HomeScreen,
    Category: CategoryScreen,
    Location: LocationScreen,
  },
  {
    initialRouteName: 'Location',
    navigationOptions: {
      headerStyle: {
        elevation: 1,
        backgroundColor: '#fff',
      },
    },
  },
);

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
