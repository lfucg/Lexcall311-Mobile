import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import summary_camera_img from '../assets/images/summary_icon_camera.png';
import camera_img from '../assets/images/icon_camera.png';

import { ImagePicker, Permissions, Constants } from 'expo';

export default class PhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image1: this.startingImage1(),
      image2: this.startingImage2(),
      uploading: false,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      disabled_buttons: this.startingButtonState(),
    };
  }

  startingButtonState() {
    currentImage2 = this.props.navigation.getParam('image2');
    if (currentImage2) {
      return true;
    } else {
      return false;
    }
  }

  startingImage1() {
    currentImage1 = this.props.navigation.getParam('image1');
    if (currentImage1) {
      return currentImage1;
    } else {
      return null;
    }
  }

  updateImage1(image1) {
    this.setState({
      image1: image1,
    });
    this.props.navigation.navigate('Photo', {
      image1: image1,
    });
  }

  startingImage2() {
    currentImage2 = this.props.navigation.getParam('image2');
    if (currentImage2) {
      return currentImage2;
    } else {
      return null;
    }
  }

  updateImage2(image2) {
    this.setState({
      image2: image2,
    });
    this.props.navigation.navigate('Photo', {
      image2: image2,
    });
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderBack
          navigation={navigation}
          text={"< Back"}
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
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerRight: (
        <HeaderNext 
          navigation={navigation}
          text={"Next >"}
          nav_link={"Contact"}
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
  }

  askCameraPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  camera = async () => {
    console.log('CAMERA');
    await this.askCameraPermission();
    let image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [1,1],
      base64: true,
    });
    if (!this.state.image1) {
      this.setState({ 
        image1: image
      });
      this.updateImage1(image);
    } else {
      this.setState({ 
        image2: image,
        disabled_buttons: true,
      });
      this.updateImage2(image);
    }
  }

  askCameraRollPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  
  gallery = async () => {
    console.log('GALLERY');
    await this.askCameraRollPermission();
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [1,1],
      base64: true,
    });
    if (!this.state.image1) {
      this.setState({ 
        image1: image
      });
      this.updateImage1(image);
    } else {
      this.setState({ 
        image2: image,
        disabled_buttons: true,
      });
      this.updateImage2(image);
    }
  };


  render() {
    // console.log('PHOTO SCREEN PARAMS: ', this.props.navigation.state.params);
    
    let { image1 } = this.state;
    let { image2 } = this.state;
    const { hasCameraPermission } = this.state;
    const { hasCameraRollPermission } = this.state;

    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width / 2 - 10;
    const imageHeight = imageWidth;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={summary_camera_img} 
            heading={"Attach Photos of Issue"}
            content={"Choose up to two photos to upload."}
          />
        </View>
        <View style={styles.photo_wrap}>
          
          <View style={styles.button_wrap}>
            <TouchableOpacity 
              onPress={this.camera} 
              style={this.state.disabled_buttons ? styles.button_disabled : styles.button}
              disabled={this.state.disabled_buttons}
            >
              <Text style={styles.button_text}>
                Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={this.gallery} 
              style={this.state.disabled_buttons ? styles.button_disabled : styles.button}
              disabled={this.state.disabled_buttons}
            >
              <Text style={styles.button_text}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>


          { !image1 &&
            <View style={styles.img_display}>
              <Image source={camera_img} style={styles.img_in_display} resizeMode='cover' />
            </View>
          }
          { image1 && !image2 &&
            <View>
              <View 
                style={[styles.photo_count_wrap, {
                  width: dimensions.width,
                }]}
              >
                <Text style={styles.photo_count_text}>
                  1 photo added:
                </Text>
              </View>
              <View style={styles.img_display}>
                <ImageBackground source={image1} style={styles.img_in_display} resizeMode='cover'>
                  <TouchableOpacity
                    onPress={() => this.setState({ image1: null })}
                    style={styles.img_remove}
                  >
                    <Text style={styles.img_remove_text}>Remove</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          }
          { image1 && image2 &&
            <View>
              <View 
                style={[styles.photo_count_wrap, {
                  width: dimensions.width,
                }]}
              >
                <Text style={styles.photo_count_text}>
                  2 photos added:
                </Text>
              </View>
              <View style={styles.img_multiple_display}>
                <ImageBackground
                  source={image1} 
                  style={[styles.img_multiple_in_display, 
                    { 
                      width: imageWidth, 
                      height: imageHeight
                    }]} 
                  resizeMode='cover' 
                >
                  <TouchableOpacity
                    onPress={() => this.setState({
                      image1: image2,
                      image2: null,
                      disabled_buttons: false,
                    })}
                    style={styles.img_remove}
                  >
                    <Text style={styles.img_remove_text}>Remove</Text>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground 
                  source={image2} 
                  style={[styles.img_multiple_in_display, 
                    { 
                      width: imageWidth, 
                      height: imageHeight
                    }]} 
                  resizeMode='cover' 
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ 
                      image2: null, 
                      disabled_buttons: false,
                    })}
                    style={styles.img_remove}
                  >
                    <Text style={styles.img_remove_text}>Remove</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
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
    height: 160,
    borderBottomWidth: 1,
    borderColor: '#585858',
  },
  photo_wrap: {
    flex: 6,
  },
  button_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0057a8',
  },
  button_disabled: {
    flex: 1,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  button_text: {
    color: '#fff',
    fontSize: 20,
  },
  photo_count_wrap: {
    alignItems: 'center',
  },
  photo_count_text: {
    color: '#585858',
    fontSize: 18,
    padding: 10,
  },
  img_display: {
    padding: 5,
    backgroundColor: '#ddd',
    alignItems: 'center', 
  },
  img_in_display: {
    margin: 5,
    width: 300,
    height: 300,
  },
  img_multiple_display: {
    padding: 5,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  img_multiple_in_display: {
    margin: 5,
  },
  img_remove: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 30,
  },
  img_remove_text: {
    color: '#fff',
  },
});

