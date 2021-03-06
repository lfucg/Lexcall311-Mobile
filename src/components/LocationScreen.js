import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
} from "react-native";
import WebView from "react-native-webview";

import * as Location from "expo-location";

import Autocomplete from "react-native-autocomplete-input";
import Modal from "react-native-modal";
import { phonecall } from "react-native-communications";

// components
import HeaderTitle from "./HeaderTitle.js";
import HeaderBack from "./HeaderBack.js";
import HeaderNext from "./HeaderNext.js";
import NineOneOne from "./NineOneOne.js";
import Summary from "./Summary.js";
import { debounce } from "./DebounceFunction.js";

// images
import marker_img from "../assets/images/summary_icon_map-marker-alt.png";
import search_img from "../assets/images/icon_search.png";
import crosshair_img from "../assets/images/icon_crosshairs.png";

export default class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_map: {},
      layer_map: {},
      locations: [],
      longitude: 0,
      latitude: 0,
      query: "", // this is the navigation param 'location'
      queryColor: "#888",
      inputHeight: 42,
      debounceTimeout: null,
      debounceMapErrorTimeout: null,
      loadingOpacity: 0,
      modalHasBeenChecked: false,
      map_error: null,
      screenOffset: 0,
    };
  }

  UNSAFE_componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  componentDidMount() {
    this.startingQuery();
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
    if (this.unsubscribe) {
      return this.unsubscribe;
    }
  }

  keyboardDidShow = (event) => {
    this.setState({
      screenOffset: -180,
    });
  };

  keyboardDidHide = (event) => {
    this.setState({
      screenOffset: 0,
    });
  };

  modalCheck() {
    if (
      this.props.navigation.getParam("category") == "traffic_light" &&
      this.state.modalHasBeenChecked == false
    ) {
      return true;
    } else {
      return false;
    }
  }

  startingQuery() {
    currentQuery = this.props.navigation.getParam("location");
    if (currentQuery) {
      this.setState({
        queryColor: "#000",
        query: currentQuery,
      });
    } else {
      this.setState({
        queryColor: "#888",
        query: "Enter address or describe location",
      });
    }
  }

  fetchLocationFromAPI(location) {
    const location_url =
      "https://maps.lexingtonky.gov/lfucggis/rest/services/locator/GeocodeServer/findAddressCandidates";
    const location_params =
      "?Street=" +
      location +
      "&outSR=" +
      4326 + // world geocoding coordinate system wkid (forces return of lat / lng)
      // "&SingleLine=" +
      // "&category=" +
      // "&outFields=" +
      // "&searchExtent=" +
      // "&location=" +
      // "&distance=" +
      // "&magicKey=" +
      "&maxLocations=4" +
      "&f=json";
    const location_url_and_params = location_url + location_params;
    fetch(location_url_and_params)
      .then((response) => response.json())
      .then((response) => {
        let location_list = [];
        for (let i = 0; i < response.candidates.length; i++) {
          var locationObj = {
            address: response.candidates[i].address,
            latitude: response.candidates[i].location.y,
            longitude: response.candidates[i].location.x,
          };
          location_list.push(locationObj);
          // hide dropdown of suggestions
          this.updateInputHeight(location_list.length);

          this.setState({
            ...this.state,
            locations: location_list,
          });
        }
      });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <HeaderBack
          navigation={navigation}
          text={"Back"}
          nav_link={"Category"}
          category={navigation.getParam("category")}
          location={navigation.getParam("location")}
          latitude={navigation.getParam("latitude")}
          longitude={navigation.getParam("longitude")}
          description={navigation.getParam("description")}
          image1={navigation.getParam("image1")}
          image2={navigation.getParam("image2")}
          firstName={navigation.getParam("firstName")}
          lastName={navigation.getParam("lastName")}
          email={navigation.getParam("email")}
          phone={navigation.getParam("phone")}
        />
      ),
      headerTitle: () => <HeaderTitle text={"Create A Report"} />,
      headerRight: () => (
        <HeaderNext
          navigation={navigation}
          text={"Next"}
          nav_link={"Description"}
          category={navigation.getParam("category")}
          location={navigation.getParam("location")}
          latitude={navigation.getParam("latitude")}
          longitude={navigation.getParam("longitude")}
          description={navigation.getParam("description")}
          image1={navigation.getParam("image1")}
          image2={navigation.getParam("image2")}
          firstName={navigation.getParam("firstName")}
          lastName={navigation.getParam("lastName")}
          email={navigation.getParam("email")}
          phone={navigation.getParam("phone")}
        />
      ),
    };
  };

  debounceUpdateQueryFromInput(query) {
    clearTimeout(this.state.debounceTimeout);
    let thisScreen = this;

    this.setState({
      debounceTimeout: setTimeout(function () {
        thisScreen.updateQueryFromInput(query);
      }, 300),
    });
  }

  mapError(error) {
    clearTimeout(this.state.debounceTimeout);
    let thisScreen = this;
    this.setState({ map_error: error });
    this.setState({
      debounceMapErrorTimeout: setTimeout(function () {
        thisScreen.clearMapError();
      }, 4000),
    });
  }

  clearMapError() {
    this.setState({ map_error: null });
  }

  updateQueryFromInput(query) {
    if (query != undefined) {
      this.setState({
        query: query,
        queryColor: "#000",
      });
      this.props.navigation.navigate("Location", {
        location: query,
      });
      this.fetchLocationFromAPI(query);
    } else {
      this.setState({
        queryColor: "#888",
        query: "Enter address or describe location",
      });
      this.props.navigation.navigate("Location", { location: undefined });
      this.fetchLocationFromAPI(undefined);
    }
  }

  updateQueryFromSelection(locationObj) {
    this.setState({
      query: locationObj.item.address,
      queryColor: "#000",
    });
    this.props.navigation.navigate("Location", {
      location: locationObj.item.address,
      longitude: locationObj.item.longitude,
      latitude: locationObj.item.latitude,
    });
    this.updateInputHeight(0);

    let message = {
      action: "place_marker",
      longitude: locationObj.item.longitude,
      latitude: locationObj.item.latitude,
      is_user_location: false,
      title: locationObj.item.address,
    };

    let stringMessage = JSON.stringify(message);
    const updatePin = `
        window.postMessage(${stringMessage});  
    `;
    setTimeout(() => {
      this.webView.injectJavaScript(updatePin);
    }, 500);
  }

  updateLongitude(longitude) {
    this.setState({ longitude: longitude });
    this.props.navigation.navigate("Location", {
      longitude: longitude,
    });
  }
  updateLatitude(latitude) {
    this.setState({ latitude: latitude });
    this.props.navigation.navigate("Location", {
      latitude: latitude,
    });
  }

  handleInputFocus() {
    if (this.state.query == "Enter address or describe location") {
      this.setState({
        query: "",
      });
    }
  }

  updateInputHeight(locationCount) {
    if (locationCount == 0) {
      this.setState({
        inputHeight: 42,
      });
    } else if (locationCount == 1) {
      this.setState({
        inputHeight: 84,
      });
    } else if (locationCount == 2) {
      this.setState({
        inputHeight: 126,
      });
    } else if (locationCount == 3) {
      this.setState({
        inputHeight: 146,
      });
    } else {
      this.setState({
        inputHeight: 170,
      });
    }
  }

  getMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      // check if phone location is turned on
      let locationEnabled = await Location.getProviderStatusAsync();
      if (locationEnabled.locationServicesEnabled) {
        this.setState({ loadingOpacity: 100 });

        let location = await Location.getCurrentPositionAsync({});

        this.setState({ loadingOpacity: 0 });
        this.updateQueryFromInput(undefined);
        this.updateLongitude(location.coords.longitude);
        this.updateLatitude(location.coords.latitude);

        // posts through webview to the html map
        let message = {
          action: "place_marker",
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          is_user_location: true,
          title: "My Location",
        };
        let stringMessage = JSON.stringify(message);
        const updatePin = `
        window.postMessage(${stringMessage});  
        `;
        setTimeout(() => {
          this.webView.injectJavaScript(updatePin);
        }, 500);
      } else {
        this.mapError(
          "Phone location is turned off.  Please enable and then try again."
        );
      }
    }
  };

  render() {
    const dimensions = Dimensions.get("window");
    const mapWidth = dimensions.width;
    const mapHeight = dimensions.height * 0.54;

    const map5 = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width,user-scalable=no">
          
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
            :focus {
              outline: none;
            }
          </style>
          <script src="https://js.arcgis.com/3.24/"></script>

          <script>
            let map;
            require([
              "esri/map", 
              "esri/layers/ArcGISTiledMapServiceLayer",
              "dojo/domReady!",
              "esri/graphic",
              "esri/geometry/Point", 
              "esri/SpatialReference", 
            ], function(
              Map, 
              ArcGISTiledMapServiceLayer, 
              Graphic,
              Point, 
              SpatialReference,
            ) {

              // create map
              let centerLong = 38.0417769;
              let centerLat = -84.5027069;
              map = new esri.Map("map", {
                center: [centerLat, centerLong],
                zoom: 12
              });
              
              // build map layers
              let base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
              map.addLayer(base_map);
              let road_names = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer")
              map.addLayer(road_names);

              // listen for zoom events - limit outer zoom
              map.on("zoom-end", capZoomLevels);
              function capZoomLevels(evt) {
                if (evt.level < 11) {
                  map.centerAndZoom(map.center, 11);
                }
              };

              // place marker when user touches map
              dojo.connect(map, 'onClick', function(evt) { 
                let coords = []
                map.graphics.clear();
                map.graphics.add(new esri.Graphic(
                  evt.mapPoint,
                  new esri.symbol.SimpleMarkerSymbol().setColor([0, 92, 183]),                  
                ));

                // convert geographic coordinate system to latitude/longitude and send back to app 
                let message = { 
                  'action':'user_tapped_map',
                  'longitude': evt.mapPoint.getLongitude(),
                  'latitude': evt.mapPoint.getLatitude(),
                  'is_user_location':false,
                  'title':''
                }
                let zoom = 16;
                if (map.getZoom() > 16) { zoom = map.getZoom() }
                map.centerAndZoom(evt.mapPoint, zoom);
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
              });
            });


            // place marker for phone location - called from getMyLocation() 
              window.addEventListener("message", (event) => {  
              var data = JSON.stringify(event.data);
              var message = JSON.parse(data);
              
              if (message.action != null) {
                var action = message.action;
                if (action == "place_marker") {
                  let pt = new esri.geometry.Point(message.longitude, message.latitude, new esri.SpatialReference({ 'wkid': 4326 }));  
                  let mapCoordsPt = esri.geometry.geographicToWebMercator(pt);
                  map.graphics.clear();
                  map.graphics.add(new esri.Graphic(
                    mapCoordsPt,
                    new esri.symbol.SimpleMarkerSymbol().setColor([0, 92, 183]),
                  ));                  
                  map.centerAndZoom(mapCoordsPt, 16);
                } 
              } 
            });
          </script>
          
        </head>
        <body>
          <div id="map" class="map">
            <div id="data" style="width:95%; word-wrap:break-word"></div>
          </div>   
        </body>
      </html>      
    `;

    return (
      <View
        style={[
          styles.container,
          {
            marginTop: this.state.screenOffset,
          },
        ]}
      >
        <Modal isVisible={this.modalCheck()}>
          <View style={styles.modal}>
            <Text
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              *ATTN
            </Text>
            <Text style={{ textAlign: "center" }}>
              If this is regarding a downed stop sign, please contact the
              Division of Police at 859-258-3600 for immediate attention. Thank
              you.
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalHasBeenChecked: true });
                  phonecall("8592583600", true);
                }}
                style={styles.modal_button}
              >
                <Text style={styles.modal_button_text}>CALL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalHasBeenChecked: true });
                  this.modalCheck();
                }}
                style={styles.modal_button}
              >
                <Text style={styles.modal_button_text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <NineOneOne />
          <Summary
            icon={marker_img}
            heading={"Set Location of Issue"}
            content={
              "Enter the address, use your current location or tap the map to place a marker near the issue."
            }
          />
        </View>

        <View
          style={[
            styles.location_input,
            {
              backgroundColor: "#fff",
              height: this.state.inputHeight,
            },
          ]}
        >
          <Autocomplete
            data={this.state.locations}
            value={this.state.query}
            listStyle={{
              padding: 10,
            }}
            renderTextInput={(text) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 42,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 20, width: 20, marginLeft: 5 }}
                  source={search_img}
                />
                <TextInput
                  style={{ marginLeft: 10, color: this.state.queryColor }}
                  onFocus={() => this.handleInputFocus()}
                  onChangeText={(text) =>
                    this.debounceUpdateQueryFromInput(text)
                  }
                  underlineColorAndroid="transparent"
                  defaultValue={this.state.query}
                />
              </TouchableOpacity>
            )}
            flatListProps={{
              keyExtractor: (_, idx) => idx.toString(),
              renderItem: (locationObj) => (
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => this.updateQueryFromSelection(locationObj)}
                >
                  <Text>{locationObj.item.address}</Text>
                </TouchableOpacity>
              ),
            }}
          ></Autocomplete>
        </View>

        <View
          style={[
            styles.map_and_layers_wrap,
            {
              width: mapWidth,
              height: mapHeight,
            },
          ]}
        >
          {this.state.map_error ? (
            <View style={{ zIndex: 1000 }}>
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {this.state.map_error}
              </Text>
            </View>
          ) : null}
          {this.state.map_error ? null : (
            <View style={styles.locate}>
              <TouchableOpacity onPress={() => this.getMyLocation()}>
                <Image
                  style={styles.lacate_img}
                  source={crosshair_img}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          )}

          <View
            style={[
              styles.loading,
              {
                opacity: this.state.loadingOpacity,
              },
            ]}
          >
            <Text>LOADING...</Text>
          </View>

          <WebView
            ref={(webView) => (this.webView = webView)}
            source={{ html: map5, baseUrl: "https://www.google.com/" }}
            style={[
              styles.map_and_layers_wrap,
              {
                width: mapWidth,
                height: mapHeight,
              },
            ]}
            onMessage={(event) => {
              // (this is called when the webview calls window.ReactNativeWebView.postMessage(...)
              // gets coordinates of map marker (from touch or getting user location) and assigns to state
              var message = JSON.parse(event.nativeEvent.data);
              this.updateLongitude(message.longitude);
              this.updateLatitude(message.latitude);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modal: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modal_button: {
    borderColor: "#585858",
    borderWidth: 2,
    padding: 20,
    margin: 20,
    width: 100,
  },
  modal_button_text: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  header: {
    height: 180,
  },
  map_and_layers_wrap: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  loading: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 100,
    backgroundColor: "#fff",
    borderColor: "#585858",
    borderWidth: 1,
    zIndex: 10,
    paddingLeft: 2,
  },
  locate: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 20,
    left: 20,
    zIndex: 100,
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: "#585858",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  lacate_img: {
    width: 25,
    height: 25,
  },
});
