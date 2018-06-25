import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
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
    let bbox = this.state.bbox_xmax + "%2C" + this.state.bbox_xmin + "%2C" + this.state.bbox_ymax + "%2C" + this.state.bbox_ymin;

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
    // console.log('URL: ', map_params);

// lexcall example
// bbox=-9412469.640888954%2C4574321.311047046%2C-9400889.431103764%2C4598093.2268437045&bboxSR=102100&imageSR=102100&size=303%2C622&dpi=96&format=png32&transparent=true&layers=show%3A0%2C1&f=image

    // fetch(url)
    // .then(response => response.json())
    // .then(response => {
    //   console.log(response);
    //   // console.log(response.headers.map)
    //   this.setState({
    //     map: response,
    //   });
    // });

    // fetch(url).then(response => {
      // console.log(response);
    // });


    // fetch("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_grayscale/MapServer/export?", {
    //   method: 'GET',
    //   params: {
    //     bbox: bbox,
    //     format: 'png',
    //     map_scale: map_scale,
    //     transparent: 'false',
    //     f: 'image',
    //   }
    // }).then(res => res.json())
    // .catch(error => console.error('ERROR: ', error))
    // .then(response => {
    //   console.log('SUCCESS: ', response)
    // });

    // }).then(response => {
    //   console.log(response.headers.map);
    // });



    fetch(base_url, {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        // "Authorization": "Bearer token",
        "Content-Type": "application/json",
      },
      params: JSON.stringify({
        bbox: bbox,
        format: 'png',
        map_scale: map_scale,
        transparent: 'false',
        f: 'json',
      })
    }).then(res => res.json())
    .catch(error => console.error('ERROR: ', error))
    .then(response => {
      console.log('SUCCESS: ', response)
    });



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
    console.log('LOCATION SCREEN PARAMS: ', this.props.navigation.state.params);

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

        <View style={styles.map_and_layers_wrap}>

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

