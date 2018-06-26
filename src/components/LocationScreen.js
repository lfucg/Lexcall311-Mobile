import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';
import LocationInput from './LocationInput.js';

// images
import marker_img from '../assets/images/summary_icon_map-marker-alt.png';


export default class LocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      base_map: {},
      layer_map: {},
      bbox_xmax: -9414495.222138507,
      bbox_xmin: 4574321.311047046,
      bbox_ymax: -9398863.84985421,
      bbox_ymin: 4598093.2268437045,
      map_scale: 800000,
    };
  }

  componentDidMount() {
    this.fetchMapFromAPI();
    this.setState({
      category: this.props.navigation.getParam('category'),  // TODO - handle street light category
    });
  }

  updateLocation(location) {
    this.setState({
      location: location,
    });
    this.props.navigation.navigate('Location', {
      location: location,
    });
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderBack
          navigation={navigation}
          text={"< Back"}
          nav_link={"Category"}
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerRight: (
        <HeaderNext 
          navigation={navigation}
          text={"Next >"}
          nav_link={"Description"}
          category={navigation.getParam('category')}
          location={navigation.getParam('location')}
          description={navigation.getParam('description')}
          image1={navigation.getParam('image1')}
          image2={navigation.getParam('image2')}
          firstName={navigation.getParam('firstName')}
          lastName={navigation.getParam('lastName')}
          email={navigation.getParam('email')}
          phone={navigation.getParam('phone')}
        />
      ),
    };
  };



  fetchMapFromAPI(map_scale=undefined) {
    console.log('MAP BEING FETCHED');

    const base_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/export?";
    const layer_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer/export?";
    let bbox = this.state.bbox_xmax + "%2C" + this.state.bbox_xmin + "%2C" + this.state.bbox_ymax + "%2C" + this.state.bbox_ymin;

    if (map_scale==undefined) {
      map_scale = this.state.map_scale;
    } 

    let base_params = (
      // "&layerDefs=" +
      // "&layerTimeOptions=" +
      // "&layerRangeValues=" +
      // "&dynamicLayers=" +
      // "&layerParameterValues=" +
      // "&time=" +
      // "&gdbVersion=" +
      // "&rotation=" +
      // "&datumTransformations=" +
      // "&mapRangeValues=" +
      // "&layers=show:4,20" +
      "bbox=" + bbox + 
      "&mapScale=" + map_scale +
      "&bboxSR=102100" + 
      "&size=409,622" +
      "&imageSR=102100" +
      "&dpi=600" +
      "&format=png32" +
      "&transparent=true" +
      "&f=json" 
    );
    let base_map_url = base_url + base_params;
    // console.log('URL: ', map_params);


    let layer_params = (
      // "&layerDefs=" +
      // "&layerTimeOptions=" +
      // "&layerRangeValues=" +
      // "&dynamicLayers=" +
      // "&layerParameterValues=" +
      // "&time=" +
      // "&gdbVersion=" +
      // "&rotation=" +
      // "&datumTransformations=" +
      // "&mapRangeValues=" +
      "bbox=" + bbox + 
      // "&layers=show:4" +
      "&mapScale=" + map_scale +
      "&bboxSR=102100" + 
      "&size=409,622" +
      "&imageSR=102100" +
      "&dpi=600" +
      "&format=png32" +
      "&transparent=true" +
      "&f=json" 
    );
    let layer_map_url = layer_url + layer_params;


    fetch(base_map_url)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({
        base_map: response,
      });
    });

    fetch(layer_map_url)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({
        layer_map: response,
      });
    });

  };

  zoomIn() {
    let map_scale = this.state.map_scale;
    if (map_scale > 400000) {
      map_scale = map_scale - 250000;
    } else if (map_scale > 100000) {
      map_scale = map_scale - 100000;
    } else {
      map_scale = map_scale - 20000;
    }
    this.setState({ map_scale: map_scale });
    this.fetchMapFromAPI(map_scale);
  }

  zoomOut() {
    let map_scale = this.state.map_scale + 250000;
    this.setState({ map_scale: map_scale });
    this.fetchMapFromAPI(map_scale);
  }

  render() {
    console.log('LOCATION SCREEN PARAMS: ', this.props.navigation.state.params);
    const dimensions = Dimensions.get('window');
    const mapWidth = dimensions.width;
    const mapHeight = dimensions.height * .54;


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={marker_img} 
            heading={"Set Location of Issue"}
            content={"Enter the address, use your current location or tap and hold on the map to place a marker near the issue."} 
          />
          <LocationInput 
            navigation={this.props.navigation}
            updateLocation={this.updateLocation.bind(this)}
          />
        </View>

        <View 
          style={[styles.map_and_layers_wrap, { 
            width: mapWidth, 
            height: mapHeight, 
          }]}
        >

          <View>
            <ImageBackground
              source={{ uri: this.state.base_map['href'] }} 
              style={[styles.map, {
                width: mapWidth,
                height: mapHeight,
              }]}
              resizeMode='cover'
            >
              <Image 
                source={{ uri: this.state.layer_map['href'] }} 
                style={[styles.map, {
                  width: mapWidth,
                  height: mapHeight,
                }]}
                resizeMode='cover'                
              />
            </ImageBackground>

          </View>
        </View>

        <View style={styles.zoom_button_wrap}>
          <TouchableOpacity 
            style={styles.zoom_button}
            disabled={this.state.map_scale > 20000 ? false : true}
            onPress={this.state.map_scale > 20000 ? this.zoomIn.bind(this) : null}
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
    flex: 1,
  },
  map_and_layers_wrap: {
    flex: 1.5,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
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

