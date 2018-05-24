import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './src/components/HomeScreen.js';
import CategoryScreen from './src/components/CategoryScreen.js';

const Root = createStackNavigator(
  {
    Home:  HomeScreen,
    Category: CategoryScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerBackTitle: 'Back',
    },
  },
);

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
