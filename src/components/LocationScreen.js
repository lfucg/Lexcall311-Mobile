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
  // Modal,
  TouchableHighlight,
} from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import Autocomplete from 'react-native-autocomplete-input';
import Modal from "react-native-modal";
import { phonecall } from 'react-native-communications';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import marker_img from '../assets/images/summary_icon_map-marker-alt.png';
import search_img from '../assets/images/icon_search.png';
import crosshair_img from '../assets/images/icon_crosshairs.png';

export default class LocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      base_map: {},
      layer_map: {},
      locations: [],
      longitude: 0,
      latitude: 0,
      query: this.startingQuery(),  // this is the navigation param 'location'
      inputHeight: 42,
      inputMarginOffset: 0,
      // bbox_xmax: -9414495.222138507,
      // bbox_xmin: 4574321.311047046,
      // bbox_ymax: -9398863.84985421,
      // bbox_ymin: 4598093.2268437045,
      loadingOpacity: 0,
      modalVisible: false,
    };
  }

  componentDidMount() {
    if (this.props.navigation.getParam('category') == 'traffic_light') {
      console.log("TRAFFIC LIGHT!");
      this.setModalVisible(true);
    }
    // this.fetchMapFromAPI();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
      "&outSR=" + 4326 + // world geocoding coordinate system wkid (forces return of lat / lng)
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
      //let lat_list = [];
      //let lat = 0;
      for (let i=0; i < response.candidates.length; i++) {

        // lat = response.candidates[i].location.y;

        // lat_list.push(lat);
        var locationObj = {
          'address':response.candidates[i].address,
          'lat':response.candidates[i].location.y,
          'lng':response.candidates[i].location.x
        };

        //location_list.push(response.candidates[i].address);
        location_list.push(locationObj);
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

  // updateQuery(query) {
  //   console.log('Updating Query ---------: ', query);
  //   this.setState({ query: query });
  //   this.props.navigation.navigate('Location', {
  //     location: query,
  //   });
  //   this.fetchLocationFromAPI(query);
  // }


/*  TODO: updateQueryFromInput should probably only be triggered if query is a certain length (>= 3 chars?)
          and also only after 0.5 seconds of inaction from the user.  The reason for this is
          you end up with race conditions with this getting called every time the user strikes
          a key on the keyboard.  You could have several requests that aren't yet complete and
          the order they finish is not predictable, so while typing 348 east main street, you
          may end up with a result for '348' finishing after a previous result for '348 east m'
          finished, resulting in a jittery UI and also worse results

*/
  updateQueryFromInput(query) {
    console.log('Updating Query ---------: ', query);
    this.setState({ query: query });
    this.props.navigation.navigate('Location', {
      location: query,
    });
    if (query.length > 3) {  
      this.fetchLocationFromAPI(query);
    }
  }

  updateQueryFromSelection(locationObj) {
    console.log('User selected location ---------: ', JSON.stringify(locationObj));
    this.setState({ query: locationObj.address });
    this.props.navigation.navigate('Location', {
      location: locationObj.address,
      longitude: locationObj.lng,
      latitude: locationObj.lat,
    });
    //this.webview.postMessage({'action':'place_marker', 'location': locationObj}) // TODO: this is no longer working?  We need a way to pass this lat and lng to the webview
    //this.webview.injectJavaScript("executeMessage({'action':'place_marker', 'location': locationObj})") // this is not working either
  }
  
  updateLongitude(longitude) {
    this.setState({ longitude: longitude });
    this.props.navigation.navigate('Location', {
      longitude: longitude,
    });
  }
  updateLatitude(latitude) {
    this.setState({ latitude: latitude });
    this.props.navigation.navigate('Location', {
      latitude: latitude,
    });
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

  getMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status == 'granted') {
      this.setState({ loadingOpacity: 100 });

      let location = await Location.getCurrentPositionAsync({});

      console.log("LOCATION: ", location);

      this.setState({
        loadingOpacity: 0,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      this.props.navigation.navigate('Location', {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      this.webview.postMessage([location.coords.longitude, location.coords.latitude]); // TODO: this is no longer working?  We need a way to pass this lat and lng to the webview

      
      // TODO: place a marker, recenter map and zoom
    }
  };


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
            // FROM Justin: Sample function for handling communication from App -> Webview
            // function executeMessage(data) {
            //   alert("message received: '" + JSON.stringify(data) + "'")
            //   if data["action"] != null {
            //     var action = data["action"];
            //     if action == "place_marker" {
            //       alert(JSON.stringify(data["location"]));
            //     } else {
            //       alert("unknown action: '" + action + "'");
            //     }
            //   } else {
            //     alert("action undefined");
            //   }
            // }

            // FROM JUSTIN: this was how this was working before, but you got rid of react-native-webview-bridge
            // so I don't think this works anymore
            // FROM JASON: It works.  You can display the data like this:  document.getElementById('data').innerHTML = data.data
            // document.addEventListener("message", function(data) {
            //   executeMessage(data)
            // });

          </script>

          <script>
            function placeMarker() {

            }

            let map;
            require([
              "esri/map", 
              "esri/layers/ArcGISTiledMapServiceLayer",
              "dojo/domReady!",
              "esri/graphic",
              "esri/geometry/webMercatorUtils",
            ], function(
              Map, 
              ArcGISTiledMapServiceLayer, 
              Graphic,
              webMercatorUtils
            ) {
              /*
                // TODO: make this centerLat and centerLong constants (I don't know where an appropriate
                          code-location for that is).  Use those constants here and also pass them with the
                          fetchLocationFromAPI call
              */
              let centerLat = -84.5027069;
              let centerLong = 38.0417769;


              //var lexingtonExtentAndSR = new esri.geometry.Extent(-85,37.5,-84,38.5, new esri.SpatialReference({"wkid":4326}));              
              map = new esri.Map("map", {
                center: [centerLat, centerLong],
                zoom: 12
                //extent: lexingtonExtentAndSR
              });
              
              // build map layers
              let base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
              map.addLayer(base_map);
              let road_names = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer")
              map.addLayer(road_names);

              // place marker when user touches map
              dojo.connect(map, 'onClick', function(evt) { 
                let coords = []
                map.graphics.clear();
                map.graphics.add(new esri.Graphic(
                  evt.mapPoint,
                  new esri.symbol.SimpleMarkerSymbol().setColor([0, 92, 183]),                  
                  // document.getElementById('data').innerHTML = 'longitude: ' + evt.mapPoint.x + '  Latitude: ' + evt.mapPoint.y,
                  // var normalizedVal = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y);

                ));

                // NOTE: - might be the right system?  Square_Mile_US   WKID: 109413  Conversion value: 2589998.4703195216 - projected coordinate systems
                // NOTE: webMercatorUtils always breaks everything.  Not sure why.  Wrong conversion system?
                // NOTE: The WKID seems to be the key to the translation?  Where do we plug in what WKID to use?  
                // var value = webMercatorUtils.xyToLngLat(42215329, 1321748, true);
                // let lat_long = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y, true);
                coords.push(evt.mapPoint.x);
                coords.push(evt.mapPoint.y);
                document.getElementById('data').innerHTML = 'marker coords: ' + coords;
                
                window.postMessage(coords) // TODO: coords are some crazy format - convert to lat/long
              });

            });

            // place marker for phone location - called from getMyLocation() 
            document.addEventListener("message", function(data) {
              document.getElementById('data').innerHTML = 'location:  ' + data.data;
              map.graphics.clear();
              // NOTE: this needs to happen.  But the data.data (lat/long) probably needs to be translated to the same projected coordinate system as above
              // map.graphics.add(new esri.Graphic(
              //   data.data,
              //   new esri.symbol.SimpleMarkerSymbol().setColor([0, 92, 183]),
              // ));              
            });

          </script>
        </head>
        <body>
          <div id="map" class="map">
            <div id="data" style=""></div>
          </div>
        </body>
      </html>      
    `;

    return (
      <View style={styles.container}>

        <Modal
          isVisible={this.state.modalVisible}
        >
          <View 
            style={[styles.modal, {
              // backgroundColor: '#fff',
              // height: dimensions.height/2,
            }]}
          >
            <Text 
              style={{ 
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 20, 
                fontWeight: '600' 
              }}
            >
              *ATTN
            </Text>
            <Text style={{textAlign: 'center'}}>
              If this is regarding a downed stop sign, please contact the 
              Division of Police at 859-258-3600 for immediate attention. 
              Thank you.
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  phonecall('8592583600', true);
                }}
                style={[styles.modal_button, {
                }]}
              >
                <Text style={{ color: 'blue' }}>CALL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false);
                }}
                style={[styles.modal_button, {
                }]}
              >
                <Text style={{ color: 'blue' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={marker_img} 
            heading={"Set Location of Issue"}
            content={"Enter the address, use your current location or tap the map to place a marker near the issue."} 
          />
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
            onChangeText={text => this.updateQueryFromInput(text)}
            renderItem={locationObj => (
              <TouchableOpacity
                style={{
                  padding: 5,
                }}
                onPress={() => this.updateQueryFromSelection(locationObj)}
              >
                <Text>{locationObj.address}</Text>
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

          <View style={styles.locate}>
            <TouchableOpacity
              onPress={() => this.getMyLocation()}
            >
              <Image source={crosshair_img} resizeMode='cover'/>
            </TouchableOpacity>
          </View>

          <View 
            style={[styles.loading, {
              opacity: this.state.loadingOpacity,
            }]}>
            <Text>LOADING...</Text>
          </View>


          <WebView 
            source={{html: map5, baseUrl: 'https://www.google.com/'}}
            style={[styles.map_and_layers_wrap, { 
              width: mapWidth, 
              height: mapHeight, 
            }]}
            onMessage={(event) => console.log('WEBVIEW: ', event.nativeEvent.data)}
            onMessage={(event) => { // (this is called when the webview calls window.postMessage(...)
              let coords = event.nativeEvent.data;
              coords = coords.split(',');
              this.updateLongitude(coords[0]);
              this.updateLatitude(coords[1]);
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
  modal: {
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  modal_button: {
    borderColor: '#585858',
    borderWidth: 1,
    padding: 20,
    margin: 20,
  },
  header: {
    height: 180,
  },
  map_and_layers_wrap: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  loading: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 100,
    backgroundColor: '#fff',
    borderColor: '#585858',
    borderWidth: 1,
    zIndex: 10,
  },
  locate: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 20,
    left: 20,
    zIndex: 1000,
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#585858',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});





  // fetchMapFromAPI(map_scale=undefined) {
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

  // };


