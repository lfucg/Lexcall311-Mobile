import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
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
      image: this.startingImage(),
      uploading: false,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
    };
  }

  startingImage() {
    currentImage = this.props.navigation.getParam('image');
    if (currentImage) {
      return currentImage;
    } else {
      return null;
    }
  }

  updateImage(image) {
    this.setState({
      image: image,
    });
    this.props.navigation.navigate('Photo', {
      image: image,
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
          description={navigation.getParam('description')}
          image={navigation.getParam('image')}
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
          description={navigation.getParam('description')}
          image={navigation.getParam('image')}
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
    this.setState({ image });
    this.updateImage(image);
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
    this.setState({ image });
    this.updateImage(image);
  };

  render() {
    console.log('PHOTO SCREEN PARAMS: ', this.props.navigation.state.params);

    let { image } = this.state;
    const { hasCameraPermission } = this.state;
    const { hasCameraRollPermission } = this.state;

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
              style={styles.button}
            >
              <Text style={styles.button_text}>
                Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={this.gallery} 
              style={styles.button}
            >
              <Text style={styles.button_text}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.img_display}>
            {
              image && <Image source={image} style={styles.img_in_display} />
              // image && <Image source={{ uri: image }} style={styles.img_in_display} />
            }
            {
              !image && <Image source={camera_img} style={styles.img_in_display} resizeMode='cover'/>
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
    flex: 2,
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
    backgroundColor: '#0057a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: '#fff',
    fontSize: 20,
  },
  img_display: {
    backgroundColor: '#ddd',
    alignItems: 'center', 
  },
  img_in_display: {
    width: 300,
    height: 300,
  },
});

