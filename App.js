import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'

import HomeScreen from './components/HomeScreen'
import CategoryScreen from "./components/CategoryScreen.js"
import LocationScreen from "./components/LocationScreen.js"
import DescriptionScreen from "./components/DescriptionScreen.js"
import PhotoScreen from "./components/PhotoScreen.js"
import ContactScreen from "./components/ContactScreen.js"
import ReviewScreen from "./components/ReviewScreen.js"
import ConfirmationScreen from "./components/ConfirmationScreen.js"

import rootReducer from './reducers/index'
const  Stack = createNativeStackNavigator()

const Store = () => {
  // REDUX
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store
}

function App() {
  
  const options = {
    headerBackVisible: false, // https://github.com/react-navigation/react-navigation/issues/10391
    headerTitleAlign: 'center',
  }

  return (
    <Provider store={Store()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={options} />
          <Stack.Screen name='Category' component={CategoryScreen} options={options} />
          <Stack.Screen name='Location' component={LocationScreen} options={options} />
          <Stack.Screen name='Description' component={DescriptionScreen} options={options} />
          <Stack.Screen name='Photo' component={PhotoScreen} options={options} />
          <Stack.Screen name='Contact' component={ContactScreen} options={options} />
          <Stack.Screen name='Review' component={ReviewScreen} options={options} />
          <Stack.Screen name='Confirmation' component={ConfirmationScreen} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App