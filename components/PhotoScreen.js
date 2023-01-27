import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

// components
import HeaderTitle from './HeaderTitle.js'
import HeaderBack from './HeaderBack.js'
import HeaderNext from './HeaderNext.js'
import NineOneOne from './NineOneOne.js'
import Summary from './Summary.js'

// actions
import {
  setImage1,
  setImage2,
} from '../actions/report'

// images
import summary_camera_img from '../assets/images/summary_icon_camera.png'
import camera_img from '../assets/images/icon_camera.png'

const PhotoScreen = ({ 
  image1,
  image2,
  navigation,
  setImage1,
  setImage2,
}) => {
  const [loadingOpacity, setLoadingOpacity] = useState(0)    
  const [loadingHeight, setLoadingHeight] = useState(0)
  
  const dimensions = Dimensions.get('window')
  const imageWidth = dimensions.width / 2 - 10
  const imageHeight = imageWidth
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBack
          navigation={navigation}
          nav_link={'Description'}
          text={'Back'}
        />
      ),
      headerTitle: () => <HeaderTitle text={'Create A Report'} />,
      headerRight: () => (
        <HeaderNext
          navigation={navigation}
          nav_link={'Contact'}
          text={'Next'}
        />
      ),
    })
  }, [navigation])

  const updateImage1 = (img1) => {
    setImage1(img1)
  }

  const removeImage1 = () => {
    setImage1(null)
  }

  const updateImage2 = (img2) => {
    setImage2(img2)
  }

  const removeImage2 = () => {
    setImage2(null)
  }

  const askCameraPermissions = async () => {
    // TODO - we should be checking these permissions and using them
    await Camera.requestCameraPermissionsAsync()
    await MediaLibrary.requestPermissionsAsync()
  }

  const camera = async () => {
    await askCameraPermissions()
    setLoadingOpacity(100)
    setLoadingHeight(25)
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Camera,
      allowsEditing: false,
      aspect: [1, 1],
      base64: true,
    })
    if (image.canceled == false) {
      if (!image1) {
        updateImage1(image.assets[0])
      } else {
        updateImage2(image.assets[0])
      }
    }
    setLoadingOpacity(0)
    setLoadingHeight(0)
  }

  const gallery = async () => {
    await askCameraPermissions()
    setLoadingOpacity(100)
    setLoadingHeight(30)
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      base64: true,
    })
    if (image.canceled == false) {
      if (!image1) {
        updateImage1(image.assets[0])
      } else {
        updateImage2(image.assets[0])
      }
    }
    setLoadingOpacity(0)
    setLoadingHeight(0)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NineOneOne />
        <Summary
          icon={summary_camera_img}
          heading={'Attach Photos of Issue'}
          content={'Choose up to two photos to upload.'}
        />
      </View>
      <View style={styles.photo_wrap}>
        <View style={styles.button_wrap}>
          <TouchableOpacity
            onPress={camera}
            style={image2 ? styles.button_disabled : styles.button}
            disabled={image2 ? true : false}
          >
            <Text style={styles.button_text}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={gallery}
            style={image2 ? styles.button_disabled : styles.button}
            disabled={image2 ? true : false}
          >
            <Text style={styles.button_text}>Gallery</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.loading,
            {
              opacity: loadingOpacity,
              height: loadingHeight,
            },
          ]}
        >
          <Text>LOADING...</Text>
        </View>

        {!image1 && (
          <View style={styles.img_display}>
            <Image
              source={camera_img}
              style={styles.img_in_display}
              resizeMode='cover'
            />
          </View>
        )}
        {image1 && !image2 && (
          <View>
            <View
              style={[
                styles.photo_count_wrap,
                {
                  width: dimensions.width,
                },
              ]}
            >
              <Text style={styles.photo_count_text}>1 photo added:</Text>
            </View>
            <View style={styles.img_display}>
              <ImageBackground
                source={image1}
                style={styles.img_in_display}
                resizeMode='cover'
              >
                <TouchableOpacity
                  onPress={() => removeImage1()}
                  style={styles.img_remove}
                >
                  <Text style={styles.img_remove_text}>Remove</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        )}
        {image1 && image2 && (
          <View>
            <View
              style={[
                styles.photo_count_wrap,
                {
                  width: dimensions.width,
                },
              ]}
            >
              <Text style={styles.photo_count_text}>2 photos added:</Text>
            </View>
            <View style={styles.img_multiple_display}>
              <ImageBackground
                source={image1}
                style={[
                  styles.img_multiple_in_display,
                  {
                    width: imageWidth,
                    height: imageHeight,
                  },
                ]}
                resizeMode='cover'
              >
                <TouchableOpacity
                  onPress={() => {
                    setImage1(image2)
                    setImage2(null)
                  }}
                  style={styles.img_remove}
                >
                  <Text style={styles.img_remove_text}>Remove</Text>
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground
                source={image2}
                style={[
                  styles.img_multiple_in_display,
                  {
                    width: imageWidth,
                    height: imageHeight,
                  },
                ]}
                resizeMode='cover'
              >
                <TouchableOpacity
                  onPress={() => removeImage2()}
                  style={styles.img_remove}
                >
                  <Text style={styles.img_remove_text}>Remove</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        )}
      </View>
    </View>
  )
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
    top: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 30,
  },
  img_remove_text: {
    color: '#fff',
  },
  loading: {
    justifyContent: 'center',
    paddingLeft: 2,
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#585858',
    borderWidth: 1,
    zIndex: 100,
  },
})

const mapStateToProps = ({ report }) => ({
  image1: report.image1,
  image2: report.image2,
})

const mapDispatchToProps = {
  setImage1,
  setImage2,
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PhotoScreen)