import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  WebView,
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';


// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import marker_img from '../assets/images/summary_icon_map-marker-alt.png';
import search_img from '../assets/images/icon_search.png';

export default class LocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      base_map: {},
      layer_map: {},
      locations: [],
      latitude: 77,
      longitude: 100,
      query: this.startingQuery(),  // this is the navigation param 'location'
      inputHeight: 42,
      inputMarginOffset: 0,
      bbox_xmax: -9414495.222138507,
      bbox_xmin: 4574321.311047046,
      bbox_ymax: -9398863.84985421,
      bbox_ymin: 4598093.2268437045,
    };
  }

  componentDidMount() {
    this.fetchMapFromAPI();
    this.setState({
      category: this.props.navigation.getParam('category'),  // TODO - handle street light category
    });
  }

  startingQuery() {
    currentQuery = this.props.navigation.getParam('location');
    if (currentQuery) {
      return currentQuery;
    } else {
      return 'Enter address or describe location';
    }
  }

  fetchLocationFromAPI(location) {
    console.log('FETCH LOCATION FROM API: LOCATION: ', location);

    const location_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/locator/GeocodeServer/findAddressCandidates"
    const location_params = (
      "?Street=" + location +
      // "&SingleLine=" +
      // "&category=" +
      // "&outFields=" +
      // "&outSR=" +
      // "&searchExtent=" +
      // "&location=" +
      // "&distance=" +
      // "&magicKey=" +
      "&maxLocations=4" + 
      "&f=json"
    );
    const location_url_and_params = location_url + location_params;
    fetch(location_url_and_params)
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      // console.log(response.candidates.length);
      let location_list = [];
      let lat_list = [];
      let lat = 0;
      for (let i=0; i < response.candidates.length; i++) {

        // lat = response.candidates[i].location.y;

        // lat_list.push(lat);

        location_list.push(response.candidates[i].address);
      }
      // console.log('LAT LIST: ', lat_list);

      this.updateInputHeight(location_list.length);
      
      // console.log('LOCATION SCREEN: FETCH LOCATION FROM API: LOCATION LIST: ', location_list);
      this.setState({
        locations: location_list,
      });

      this.webview.postMessage(location);
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
          latitude={navigation.getParam('latitude')}
          longitude={navigation.getParam('longitude')}
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
    // console.log('MAP BEING FETCHED');

    // const base_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/export?";
    // const layer_url = "https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer/export?";
    // let bbox = this.state.bbox_xmax + "%2C" + this.state.bbox_xmin + "%2C" + this.state.bbox_ymax + "%2C" + this.state.bbox_ymin;

    // if (map_scale==undefined) {
    //   map_scale = this.state.map_scale;
    // } 

    // let base_params = (
    //   // "&layerDefs=" +
    //   // "&layerTimeOptions=" +
    //   // "&layerRangeValues=" +
    //   // "&dynamicLayers=" +
    //   // "&layerParameterValues=" +
    //   // "&time=" +
    //   // "&gdbVersion=" +
    //   // "&rotation=" +
    //   // "&datumTransformations=" +
    //   // "&mapRangeValues=" +
    //   // "&layers=show:4,20" +
    //   "bbox=" + bbox + 
    //   "&mapScale=" + map_scale +
    //   "&bboxSR=102100" + 
    //   "&size=409,622" +
    //   "&imageSR=102100" +
    //   "&dpi=600" +
    //   "&format=png32" +
    //   "&transparent=true" +
    //   "&f=json" 
    // );
    // let base_map_url = base_url + base_params;
    // // console.log('URL: ', map_params);

    // this.setState({
    //   base_map_url: base_map_url,
    // })


    // let layer_params = (
    //   // "&layerDefs=" +
    //   // "&layerTimeOptions=" +
    //   // "&layerRangeValues=" +
    //   // "&dynamicLayers=" +
    //   // "&layerParameterValues=" +
    //   // "&time=" +
    //   // "&gdbVersion=" +
    //   // "&rotation=" +
    //   // "&datumTransformations=" +
    //   // "&mapRangeValues=" +
    //   "bbox=" + bbox + 
    //   // "&layers=show:4" +
    //   "&mapScale=" + map_scale +
    //   "&bboxSR=102100" + 
    //   "&size=409,622" +
    //   "&imageSR=102100" +
    //   "&dpi=600" +
    //   "&format=png32" +
    //   "&transparent=true" +
    //   "&f=json" 
    // );
    // let layer_map_url = layer_url + layer_params;


    // fetch(base_map_url)
    // .then(response => response.json())
    // .then(response => {
    //   // console.log(response);
    //   this.setState({
    //     base_map: response,
    //   });
    // });

    // fetch(layer_map_url)
    // .then(response => response.json())
    // .then(response => {
    //   // console.log(response);
    //   this.setState({
    //     layer_map: response,
    //   });
    // });

  };

  updateQuery(query) {
    this.setState({ query: query });
    this.props.navigation.navigate('Location', {
      location: query,
    });
    this.fetchLocationFromAPI(query);
  }


  handleInputFocus() {
    // console.log('FOCUSED-------------');
    if (this.state.query == 'Enter address or describe location') {
      this.setState({ query: '' })
    }
  }

  updateInputHeight(locationCount) {
    // console.log('HEIGHT UPDATE----------------')
    if (locationCount == 0) {
      this.setState({ 
        inputHeight: 42, 
        inputMarginOffset: 0 
      });
    } else if (locationCount == 1) {
      this.setState({ 
        inputHeight: 84, 
        inputMarginOffset: -29 
      });
    } else if (locationCount == 2) {
      this.setState({
        inputHeight: 126, 
        inputMarginOffset: -71 
      });
    } else if (locationCount == 3) {
      this.setState({
        inputHeight: 146, 
        inputMarginOffset: -91 
      });
    } else {
      this.setState({ 
        inputHeight: 170, 
        inputMarginOffset: -115 
      });
    }
  }

  render() {
    console.log('LOCATION SCREEN PARAMS: ', this.props.navigation.state.params);
    const dimensions = Dimensions.get('window');
    const mapWidth = dimensions.width;
    const mapHeight = dimensions.height * .54;

    const map5 = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width,user-scalable=no">
          
          <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
          <title>Maps Toolbar</title>
          
          <link rel="stylesheet" href="https://js.arcgis.com/3.24/esri/css/esri.css">
          <style>
            html, body, #map {
              font-family: sans-serif; 
              height: 100%; 
              width: 100%; 
            }
            html, body {
              margin: 0; 
              padding: 0;
            }
            #map_zoom_slider {
              top: 75%;
            }
          </style>
          
          <script src="https://js.arcgis.com/3.24/"></script>

          <script>
            // let location = 'Something';
            // document.addEventListener("message", function(data) {
            //   location = data.data;
            // });
          </script>

          <script>
            let map;

            require([
              "esri/map", 
              "esri/layers/ArcGISTiledMapServiceLayer",
              "dojo/domReady!",
              "esri/graphic"
            ], function(
              Map, 
              ArcGISTiledMapServiceLayer, 
              Graphic
            ) {

              let centerLat = -84.5027069;
              let centerLong = 38.0417769;

              map = new Map("map", {
                center: [centerLat, centerLong],
                zoom: 12
              });
              
              // build map layers
              let base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
              map.addLayer(base_map);
              let road_names = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer")
              map.addLayer(road_names);

              // place marker
              dojo.connect(map, 'onClick', function(evt) {

                map.graphics.clear();
                map.graphics.add(new esri.Graphic(
                  evt.mapPoint,
                  new esri.symbol.SimpleMarkerSymbol().setColor([0, 92, 183])
                ));
              });
            });
          </script>
        </head>
        <body>
          <div id="map" class="map">
          </div>
        </body>
      </html>      
    `;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={marker_img} 
            heading={"Set Location of Issue"}
            content={"Enter the address, use your current location or tap the map to place a marker near the issue."} 
          />
          { 
          // <TouchableOpacity onPress={() => {this.webview.postMessage('BLAMMO')}}>
          //   <Text> TEST OF THE OPERATING SYSTEM </Text>
          // </TouchableOpacity>
          }
        </View>


        <View
          style={[styles.location_input, {
            backgroundColor: '#fff',
            height: this.state.inputHeight,
            marginTop: this.state.inputMarginOffset,
          }]}
        >  
          <Autocomplete 
            style={{ 
              paddingLeft: 10, 
              height: 42,
            }}
            listStyle={{
              padding: 10,
            }}
            underlineColorAndroid='transparent'
            data={this.state.locations}
            defaultValue={this.state.query}
            onFocus={() => this.handleInputFocus()}
            onChangeText={text => this.updateQuery(text)}
            renderItem={item => (
              <TouchableOpacity
                style={{
                  padding: 5,
                }}
                onPress={() => this.updateQuery(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          >
          </Autocomplete> 
        </View>

        <View 
          style={[styles.map_and_layers_wrap, { 
            width: mapWidth, 
            height: mapHeight, 
          }]}
        >
            <WebView 
              source={{html: map5, baseUrl: 'https://www.google.com/'}}
              style={[styles.map_and_layers_wrap, { 
                width: mapWidth, 
                height: mapHeight, 
              }]}
              onMessage={(event) => console.log('WEBVIEW: ', event.nativeEvent.data)}
              onMessage={(event) => {
                let message = event.nativeEvent.data;
                console.log('MESSAGE ---------: ', message);
              }}
              ref={(r)=> { this.webview = r}}
              mixedContentMode='always'
              javaScriptEnabled={true}
            />
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
    height: 180,
  },
  map_and_layers_wrap: {
    flex: 1,
    backgroundColor: '#ddd',
  },
});

