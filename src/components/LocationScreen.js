import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import HeaderTitle from './HeaderTitle.js';
import HeaderLeft from './HeaderLeft.js';
import HeaderRight from './HeaderRight.js';

import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';
import LocationInput from './LocationInput.js';


import search_img from '../assets/images/search.png';


export default class LocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: search_img,
    };
  }

  componentDidMount() {
    this.fetchMapFromAPI();
  }

 static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderLeft
          navigation={navigation}
          text={"< Back"}
          nav_link={"Category"}
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerRight: (
        <HeaderRight 
          navigation={navigation}
          text={"Next >"}
          nav_link={"Home"}
        />
      ),
    };
  };

  fetchMapFromAPI = () => {
    console.log('MAP BEING FETCHED');
    // const url = "http://ron-swanson-quotes.herokuapp.com/v2/quotes";
    const url = "http://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/export?bbox=-9428175.245577637%2C4580475.59411816%2C-9378804.567160327%2C4599457.540949435&bboxSR=&layers=&layerDefs=&size=&imageSR=&format=png&transparent=false&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=json";
    
    // const url = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export?bbox=-127.8,15.4,-63.5,60.5";

    fetch(url)
    .then(response => response.json())
    .then(response => {
      this.setState({
        map: response['href'],
      });
    });
  };

  render() {
    console.log('MAP: ', this.state.map)
    return (
      <View style={styles.container}>
        <NineOneOne />
        <Summary 
          icon={search_img} 
          heading={"Set Location of Issue"}
          content={"Enter the address, use your current location or tap and hold on the map to place a marker near the issue."} 
        />
        <LocationInput />
        <View>
          <Image 
            source={{ uri: "https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/" }} 
            style={styles.map}
            resizeMode='cover'
          />
          <Text>MAP?
            {
              this.state.map
            }
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
  map: {
    // flex: 1,
    width: 300,
    height: 300,
  }
});

