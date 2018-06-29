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

// import { MapView } from 'expo';

// import { Map } from 'react-arcgis';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';
import LocationInput from './LocationInput.js';

// images
import marker_img from '../assets/images/summary_icon_map-marker-alt.png';









    // @import "https://js.arcgis.com/3.18/esri/css/esri.css";
  // <script type="text/javascript" src="https://js.arcgis.com/3.18/init.js"></script>

const html = `
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
  
  <title>Lexcall Map</title>

  <style type="text/css">
    @import "https://js.arcgis.com/3.18/dijit/themes/tundra/tundra.css";
    @import "/lfucggis/rest/static/jsapi.css";
  </style>
  <link rel="stylesheet" href="https://js.arcgis.com/3.24/esri/css/esri.css">

  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/esri/nls/jsapi_en-us.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/esri/layers/VectorTileLayerImpl.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dojox/gfx/svg.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dijit/layout/BorderContainer.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dijit/layout/LayoutContainer.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dojox/gfx/filters.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dojox/gfx/svgext.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dijit/layout/_LayoutWidget.js"></script>
  <script type="text/javascript" charset="utf-8" src="https://js.arcgis.com/3.18/dijit/_Contained.js"></script>
  <script src="https://js.arcgis.com/3.24/"></script>

  
  <style>
    html, body, #map {
      padding:0;
      margin:0;
      height:100%;
    }
  </style>
  <script>
    var map;
    require([
      "esri/map", 
      "dojo/domReady!",
      "esri/layers/ArcGISDynamicMapServiceLayer",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "dojo/parser",
      "dojo/domReady!",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane"
    ], function(
      ArcGISDynamicMapServiceLayer,
      Map, 
      ArcGISTiledMapServiceLayer,
      parser
    )  {
      parser.parse();

      map = new Map("map");
      var base_map;
      base_map = new ArcGISTiledMapServiceLayer("https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer");
      map.addLayer(base_map);            
    });
  </script>
</head>
<body class="tundra" data-gr-c-s-loaded="true"> 
  <div data-dojo-type="dijit/layout/BorderContainer" design="headline" gutters="true" style="width: 100%; height: 100%; margin: 0px; padding: 0px;" class="dijitBorderContainer dijitContainer dijitLayoutContainer" id="dijit_layout_BorderContainer_0" widgetid="dijit_layout_BorderContainer_0">
    <div class="dijitGutter dijitGutterH dijitAlignTop" role="presentation" id="navtable_splitter" widgetid="navtable_splitter" style="left: 5px; top: 43px; position: absolute; width: 804px;">
    </div> 
    <div id="map" data-dojo-type="dijit/layout/ContentPane" region="center" class="dijitContentPane dijitBorderContainer-child dijitBorderContainer-dijitContentPane dijitBorderContainerPane dijitAlignCenter map" widgetid="map" data-zoom="12" data-scale="144447.638572" data-loaded="" style="left: 5px; top: 48px; position: absolute; width: 802px; height: 725px;">
      <div id="map_root" class="esriMapContainer"><div id="map_container" class="esriMapContainer" style="position: absolute; cursor: default; clip: auto;">
        <div id="map_layers" class="esriMapLayers">
          <div id="map_layer0">
            <img id="map_layer0_tile_12_0_0" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1577/1084" style="width: 256px; height: 256px; visibility: inherit; transform: translate(-24px, -115px);">
            <img id="map_layer0_tile_12_1_0" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1578/1084" style="width: 256px; height: 256px; visibility: inherit; transform: translate(-24px, 141px);">
            <img id="map_layer0_tile_12_2_0" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1579/1084" style="width: 256px; height: 256px; visibility: inherit; transform: translate(-24px, 397px);">
            <img id="map_layer0_tile_12_3_0" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1580/1084" style="width: 256px; height: 256px; visibility: inherit; transform: translate(-24px, 653px);">
            <img id="map_layer0_tile_12_0_1" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1577/1085" style="width: 256px; height: 256px; visibility: inherit; transform: translate(232px, -115px);">
            <img id="map_layer0_tile_12_1_1" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1578/1085" style="width: 256px; height: 256px; visibility: inherit; transform: translate(232px, 141px);">
            <img id="map_layer0_tile_12_2_1" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1579/1085" style="width: 256px; height: 256px; visibility: inherit; transform: translate(232px, 397px);">
            <img id="map_layer0_tile_12_3_1" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1580/1085" style="width: 256px; height: 256px; visibility: inherit; transform: translate(232px, 653px);">
            <img id="map_layer0_tile_12_0_2" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1577/1086" style="width: 256px; height: 256px; visibility: inherit; transform: translate(488px, -115px);">
            <img id="map_layer0_tile_12_1_2" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1578/1086" style="width: 256px; height: 256px; visibility: inherit; transform: translate(488px, 141px);">
            <img id="map_layer0_tile_12_2_2" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1579/1086" style="width: 256px; height: 256px; visibility: inherit; transform: translate(488px, 397px);">
            <img id="map_layer0_tile_12_3_2" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1580/1086" style="width: 256px; height: 256px; visibility: inherit; transform: translate(488px, 653px);">
            <img id="map_layer0_tile_12_0_3" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1577/1087" style="width: 256px; height: 256px; visibility: inherit; transform: translate(744px, -115px);">
            <img id="map_layer0_tile_12_1_3" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1578/1087" style="width: 256px; height: 256px; visibility: inherit; transform: translate(744px, 141px);">
            <img id="map_layer0_tile_12_2_3" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1579/1087" style="width: 256px; height: 256px; visibility: inherit; transform: translate(744px, 397px);">
            <img id="map_layer0_tile_12_3_3" alt="" class="layerTile" src="https://maps.lexingtonky.gov/lfucggis/rest/services/basemap_lexcall/MapServer/tile/12/1580/1087" style="width: 256px; height: 256px; visibility: inherit; transform: translate(744px, 653px);">
          </div>
        </div>
      </div>
    </div>
    <div id="map_zoom_slider" class="esriSimpleSlider esriSimpleSliderVertical esriSimpleSliderTL" style="z-index: 30;">
      <div class="esriSimpleSliderIncrementButton" tabindex="0" role="button" title="Zoom In">
        <span>+</span>
      </div>
      <div class="esriSimpleSliderDecrementButton" tabindex="0" role="button" title="Zoom Out">
        <span>–</span>
      </div>
    </div>
  </div> 
</div> 

</body>
</html>

`;


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
            
            <WebView 
              source={{html, baseUrl: 'web/'}}
              style={[styles.map_and_layers_wrap, { 
                width: mapWidth, 
                height: mapHeight, 
              }]}
              mixedContentMode='always'
            />

{


// REACT MAP  
            // <Map />



// GOOGLE MAPS 
//             <MapView 
//               style={[styles.map, {
//                 width: mapWidth,
//                 height: mapHeight,
//               }]}
//               initialRegion={{
//                 latitude: 38.0417769,
//                 longitude: -84.5027069,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//               }}
//             />
}


{
// ArcGIS images
            // <ImageBackground
//               source={{ uri: this.state.base_map['href'] }} 
//               style={[styles.map, {
//                 width: mapWidth,
//                 height: mapHeight,
//               }]}
//               resizeMode='cover'
//             >
//               <Image 
//                 source={{ uri: this.state.layer_map['href'] }} 
//                 style={[styles.map, {
//                   width: mapWidth,
//                   height: mapHeight,
//                 }]}
//                 resizeMode='cover'                
//               />
//             </ImageBackground>
}

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

