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
  WebView,
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
      locations: [],
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

  updateLocation(location) {
    this.setState({
      location: location,
    });
    this.props.navigation.navigate('Location', {
      location: location,
    });

    this.fetchLocationFromAPI(location);
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
      for (let i=0; i < response.candidates.length; i++) {
        location_list.push(response.candidates[i].address);
      }
      // console.log('LOCATION SCREEN: FETCH LOCATION FROM API: LOCATION LIST: ', location_list);
      this.setState({
        locations: location_list,
      });
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

    this.setState({
      base_map_url: base_map_url,
    })


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

  render() {
    // console.log('LOCATION SCREEN PARAMS: ', this.props.navigation.state.params);
    const dimensions = Dimensions.get('window');
    const mapWidth = dimensions.width;
    const mapHeight = dimensions.height * .54;

    let mapJS = `
      document.querySelector('#lat').innerHTML = "-84.5027069";
    `;

    const map_html = `
      <!DOCTYPE HTML>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
        <title>LexCall</title>
        <link rel="stylesheet" href="https://js.arcgis.com/3.24/esri/css/esri.css">
        <style>
          html, body, #map {
            padding:0;
            margin:0;
            height:100%;
          }
          #map_zoom_slider {
            left: 10px;
            top: 75%;
          }
          #LocateButton {
            position: absolute;
            top: 95px;
            left: 20px;
            z-index: 50;
          }
        </style>
        <script src="https://js.arcgis.com/3.24/"></script>

        <script>
          let map;

          require(
          [
            "esri/map", 
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/dijit/LocateButton",
            "dojo/domReady!",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/graphic"
          ], 
          function(
            Map, 
            ArcGISTiledMapServiceLayer, 
            LocateButton, 
            SimpleMarkerSymbol
          ) {
            
            // if (document.querySelector('#lat').innerHTML) {
              // let centerLat = -84.5027069;
              // centerLat = document.querySelector('#lat').innerHTML;
            // }
            let centerLat = -84.5027069;
            let centerLong = 38.0417769;

            map = new Map("map", { 
              center: [centerLat, centerLong],
              zoom: 12 
            });
            
            // geoLocate = new LocateButton({
            //   map: map
            // }, "LocateButton");
            // geoLocate.startup();

            let base_map;
            base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
            map.addLayer(base_map);
            let road_names;
            road_names = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer")
            map.addLayer(road_names);

            // Add a point when the map is clicked
            dojo.connect(map, 'onClick', function(evt) {
              map.graphics.add(new esri.Graphic(
                evt.mapPoint,
                new esri.symbol.SimpleMarkerSymbol()
              ));
            });

          });
        </script>

      </head>
      <body>
        <div id="map" class="map">
          <div id="lat"></div>
          <div id="LocateButton"></div>
        </div>
      </body>
      </html>
    `;

    const map2 = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width,user-scalable=no">
          
          <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
          <title>Maps Toolbar</title>
          
          <link rel="stylesheet" href="https://js.arcgis.com/3.24/dijit/themes/nihilo/nihilo.css">
          <link rel="stylesheet" href="https://js.arcgis.com/3.24/esri/css/esri.css">
          <style>
            html, body, #mainWindow {
              font-family: sans-serif; 
              height: 100%; 
              width: 100%; 
            }
            #map {
              height: 100%;
              width: 100%;
            }
            html, body {
              margin: 0; 
              padding: 0;
            }
            #header {
              height: 80px; 
              overflow: auto;
              padding: 0.5em;
            }
          </style>
          
          <script src="https://js.arcgis.com/3.24/"></script>
          <script>
            var map, toolbar, symbol, geomTask;

            require([
              "esri/map", 
              "esri/layers/ArcGISTiledMapServiceLayer",
              "esri/toolbars/draw",
              "esri/graphic",

              "esri/symbols/SimpleMarkerSymbol",
              "esri/symbols/SimpleLineSymbol",
              "esri/symbols/SimpleFillSymbol",

              "dojo/parser", 
              "dijit/registry",

              "dijit/layout/BorderContainer", 
              "dijit/layout/ContentPane", 
              "dijit/form/Button", 
              "dijit/WidgetSet", 
              "dojo/domReady!"
            ], function(
              Map, 
              ArcGISTiledMapServiceLayer,
              Draw, 
              Graphic,
              SimpleMarkerSymbol, 
              SimpleLineSymbol, 
              SimpleFillSymbol,
              parser, 
              registry
            ) {
              parser.parse();

              let centerLat = -84.5027069;
              let centerLong = 38.0417769;

              map = new Map("map", {
                center: [centerLat, centerLong],
                zoom: 12
              });
              
              let base_map;
              base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
              map.addLayer(base_map);
              let road_names;
              road_names = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer")
              map.addLayer(road_names);

              
              map.on("load", createToolbar);

              // loop through all dijits, connect onClick event
              // listeners for buttons to activate drawing tools
              registry.forEach(function(d) {
                // d is a reference to a dijit
                // could be a layout container or a button
                if ( d.declaredClass === "dijit.form.Button" ) {
                  d.on("click", activateTool);
                }
              });

              function activateTool() {
                var tool = this.label.toUpperCase().replace(/ /g, "_");
                toolbar.activate(Draw[tool]);
                map.hideZoomSlider();
              }

              function createToolbar(themap) {
                toolbar = new Draw(map);
                toolbar.on("draw-end", addToMap);
              }

              function addToMap(evt) {
                var symbol;
                toolbar.deactivate();
                map.showZoomSlider();
                switch (evt.geometry.type) {
                  case "point":
                  case "multipoint":
                    symbol = new SimpleMarkerSymbol();
                    break;
                  case "polyline":
                    symbol = new SimpleLineSymbol();
                    break;
                  default:
                    symbol = new SimpleFillSymbol();
                    break;
                }
                var graphic = new Graphic(evt.geometry, symbol);
                map.graphics.add(graphic);
              }
            });
          </script>
        </head>
        <body class="nihilo">

          <div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'headline'">
            <div id="header" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'">
              <button data-dojo-type="dijit/form/Button">Point</button>
            </div>
            <div id="map" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center'"></div>
          </div>

        </body>
      </html>
    `;


    const map3 = `
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
          </style>
          
          <script src="https://js.arcgis.com/3.24/"></script>
          <script>
            var map, symbol;

            require([
              "esri/map", 
              "esri/layers/ArcGISTiledMapServiceLayer",
              "esri/toolbars/draw",
              "esri/graphic",

              "esri/symbols/SimpleMarkerSymbol",
              "dijit/WidgetSet", 
              "dojo/domReady!"
            ], function(
              Map, 
              ArcGISTiledMapServiceLayer,
              Draw, 
              Graphic,
              SimpleMarkerSymbol, 
            ) {

              let centerLat = -84.5027069;
              let centerLong = 38.0417769;

              map = new Map("map", {
                center: [centerLat, centerLong],
                zoom: 12
              });
              
              let base_map;
              base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
              map.addLayer(base_map);
              let road_names;
              road_names = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/labels/MapServer")
              map.addLayer(road_names);

            });
          </script>
        </head>
        <body>
          <div id="map"></div>
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
            content={"Enter the address, use your current location or tap and hold on the map to place a marker near the issue."} 
          />
          <LocationInput 
            navigation={this.props.navigation}
            updateLocation={this.updateLocation.bind(this)}
            locations={this.state.locations}
            dimensions={dimensions}
          />
        </View>

        <View 
          style={[styles.map_and_layers_wrap, { 
            width: mapWidth, 
            height: mapHeight, 
          }]}
        >

          <View>
            {

              <WebView 
                source={{html: map3, baseUrl: 'https://www.google.com/'}}
                style={[styles.map_and_layers_wrap, { 
                  width: mapWidth, 
                  height: mapHeight, 
                }]}
                // ref={webview => { this._webview = webview; }}
                mixedContentMode='always'
                // javaScriptEnabled={true}
                // injectedJavaScript={mapJS}
              />
            }

          </View>
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


  // zoom_button_wrap: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: 20,
  //   width: 35,
  // },
  // zoom_button: {
  //   backgroundColor: '#fff',
  //   borderColor: '#585858',
  //   borderWidth: 1,
  //   elevation: 1,
  //   height: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

