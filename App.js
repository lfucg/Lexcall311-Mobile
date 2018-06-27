import React from 'react';
import { 
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from './src/components/HomeScreen.js';
import CategoryScreen from './src/components/CategoryScreen.js';
import LocationScreen from './src/components/LocationScreen.js';
import DescriptionScreen from './src/components/DescriptionScreen.js';
import PhotoScreen from './src/components/PhotoScreen.js';
import ContactScreen from './src/components/ContactScreen.js';
import ConfirmationScreen from './src/components/ConfirmationScreen.js';

const Root = createStackNavigator(
  {
    Home:  HomeScreen,
    Category: CategoryScreen,
    Location: LocationScreen,
    Description: DescriptionScreen,
    Photo: PhotoScreen,
    Contact: ContactScreen,
    Confirmation: ConfirmationScreen,
  },
  {
    initialRouteName: 'Home',
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
