import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
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
      aerial_layer: {},
      transportation_layer: {},
      bbox_xmax: -9428175.25,
      bbox_xmin: 4580475.59,
      bbox_ymax: -9378804.57,
      bbox_ymin: 4599457.54,
      // map_scale: 1500000,
      map_scale: 500000,
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

  fetchMapFromAPI(map_scale=undefined) {
    console.log('MAP BEING FETCHED');
    

    
    const base_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_grayscale/MapServer/export?";
    let bbox = this.state.bbox_xmax + "%2C" + this.state.bbox_xmin + "%2C" + this.state.bbox_ymax + "%2C" + this.state.bbox_ymin;

    // const transportation_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/export?f=json";
    // fetch(transportation_url)
    // .then(response => response.json())
    // .then(response => {
    //   this.setState({
    //     transportation_layer: response,
    //   });
    // });
    if (map_scale==undefined) {
      map_scale = this.state.map_scale;
    } 

    let map_params = (
      "bbox=" + bbox + 
      "&mapScale=" + map_scale +
      "&layers=27" +
      "&layerDefs=" +
      "&layerTimeOptions=" +
      "&layerRangeValues=" +
      "&dynamicLayers=" +
      "&layerParameterValues=" +
      "&bboxSR=" + 
      "&size=" +
      "&imageSR=" +
      "&time=" +
      "&gdbVersion=" +
      "&rotation=" +
      "&datumTransformations=" +
      "&mapRangeValues=" +
      "&dpi=600" +
      "&format=png" +
      "&transparent=false" +
      "&f=json" 
    );
    let url = base_url + map_params;
    console.log('URL: ', map_params);

    fetch(url)
    .then(response => response.json())
    .then(response => {
      this.setState({
        map: response,
      });
    });


    // const aerial_base_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/aerial2016/MapServer/export?";
    // let aerial_url = aerial_base_url + map_params;

    // fetch(aerial_url)
    // .then(response => response.json())
    // .then(response => {
    //   this.setState({
    //     aerial_layer: response,
    //   });
    // });


  };

  zoomIn() {
    let map_scale = this.state.map_scale - 80000;
    this.setState({
      map_scale: map_scale,
    })
    this.fetchMapFromAPI(map_scale);
  }

  zoomOut() {
    let map_scale = this.state.map_scale + 80000;
    this.setState({
      map_scale: map_scale,
    })
    this.fetchMapFromAPI(map_scale);
  }

  render() {
    // console.log('MAP: ', this.state.map);


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

        <View style={styles.map_and_layers_wrap}>

          <View style={styles.map_wrap}>
{

            <Image 
              source={{ uri: this.state.map['href'] }} 
              style={styles.map}
              resizeMode='cover'
            />
            
          // <View style={styles.aerial_layer_wrap}>
          // </View>


            // <Image 
            //   source={{ uri: this.state.aerial_layer['href'] }} 
            //   style={styles.aerial_layer}
            //   resizeMode='cover'
            // />

}
          </View>
        </View>

        <View style={styles.zoom_button_wrap}>
          <TouchableOpacity 
            style={styles.zoom_button}
            disabled={this.state.map_scale > 50000 ? false : true}
            onPress={this.state.map_scale > 50000 ? this.zoomIn.bind(this) : null}
          >
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.zoom_button}
            disabled={this.state.map_scale < 2000000 ? false : true}
            onPress={this.state.map_scale < 2000000 ? this.zoomOut.bind(this) : null}
          >
            <Text>-</Text>
          </TouchableOpacity>
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
  map_and_layers_wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
  },
  map_wrap: {
    // flex: 1,
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#585858',
  },
  map: {
    // flex: 1,
    width: 400,
    height: 400,
  },
  aerial_layer_wrap: {
    // flex: 1,
    // width: 400,
    // height: 400,

    // position: 'absolute',
    opacity: .3,
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  aerial_layer: {
    // flex: 1,
    width: 400,
    height: 400,
  },
  zoom_button_wrap: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 35,
  },
  zoom_button: {
    backgroundColor: '#fff',
    borderColor: '#585858',
    borderWidth: 1,
    elevation: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

