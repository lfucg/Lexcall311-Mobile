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
      category: this.props.navigation.state.category,
      description: 'Add description here...', 
      image: null,
      uploading: false,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
    };
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
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerRight: (
        <HeaderNext 
          navigation={navigation}
          text={"Next"}
          nav_link={"Home"}
          category={navigation.getParam('category')}
          location={navigation.getParam('location')}
          description={navigation.getParam('description')}
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

  // _pickImage = async () => {
  //   const { cameraRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   this.setState({ hasCameraRollPermission: cameraRollStatus === 'granted' });
  //   const { hasCameraRollPermission } = this.state;
  //   console.log('PICK IMAGE: ');
  //   if (hasCameraRollPermission === null) {
  //     console.log('CAMERA ROLL PERMISSION IS NULL');
  //     // <View />
  //   } else if (hasCameraRollPermission === false) {
  //     console.log('CAMERA ROLL PERMISSION IS FALSE');
  //     // return <Text>No access to camera roll.</Text>
  //     const { cameraRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   } else {
  //     console.log('PICKER?');
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: false,
  //       aspect: [4,4],
  //     });

  //     this._handleImagePicked(pickerResult);
  //   }
  // };

  // _handleImagePicked = async pickerResult => {
  //   let uploadResponse, uploadResult;

  //   try {
  //     this.setState({ uploading: true });

  //     if (!pickerResult.cancelled) {
  //       uploadResponse = await uploadImageAsync(pickerResult.uri);
  //       uploadResult = await uploadResponse.json();
  //       this.setState({ image: uploadResult.location });
  //     }
  //   } catch (e) {
  //     console.log('uploadResponse: ', uploadResponse);
  //     console.log('uploadResult: ', uploadResult);
  //     console.log({ e });
  //     alert('Upload failed');
  //   } finally {
  //     this.setState({ uploading: false });
  //   }
  // };
}

// async function uploadImageAsync(uri) {
//   let uriParts = uri.split('.');
//   let fileType = uriParts[uriParts.length - 1];

//   let formData = new FormData();
//   formData.append('photo', {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: 'POST',
//     body: formData,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//   };

//   return fetch(apiUrl, options);
// }

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

