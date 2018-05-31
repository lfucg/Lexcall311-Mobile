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
      map: {},
      bbox_xmax: -9420000,  // -9428175.245577637
      bbox_xmin: 4580000,   // 4580475.59411816
      bbox_ymax: -9370000,  // -9378804.567160327
      bbox_ymin: 4590000,   // 4599457.540949435
      map_scale: 200000,
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
    const base_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/export?";
    let bbox = this.state.bbox_xmax + "%2C" + this.state.bbox_xmin + "%2C" + this.state.bbox_ymax + "%2C" + this.state.bbox_ymin;

    let map_params = (
      "bbox=" + bbox + 
      "&mapScale=" + this.state.map_scale +
      "&bboxSR=" + 
      "&layers=1" +
      "&layerDefs=" +
      "&size=" +
      "&imageSR=" +
      "&dpi=" +
      "&time=" +
      "&layerTimeOptions=" +
      "&dynamicLayers=" +
      "&gdbVersion=" +
      "&rotation=" +
      "&datumTransformations=" +
      "&layerParameterValues=" +
      "&mapRangeValues=" +
      "&layerRangeValues=" +
      "&format=jpg" +
      "&transparent=false" +
      "&f=json" 
    );
    let url = base_url + map_params;

    fetch(url)
    .then(response => response.json())
    .then(response => {
      this.setState({
        map: response,
      });
    });
  };

  render() {
    console.log('MAP: ', this.state.map)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={search_img} 
            heading={"Set Location of Issue"}
            content={"Enter the address, use your current location or tap and hold on the map to place a marker near the issue."} 
          />
          <LocationInput />
        </View>
        <View style={styles.map_wrap}>
{
          <Image 
            source={{ uri: this.state.map['href'] }} 
            style={styles.map}
            resizeMode='cover'
          />
}
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
  header: {
    flex: .6,
  },
  map_wrap: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#585858',
  },
  map: {
    flex: 1,
  }
});

