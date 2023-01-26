import {
  CLEAR_STATE,
  SET_CATEGORY,
  SET_DESCRIPTION,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_IMAGE_1,
  SET_IMAGE_2,
  SET_LAST_NAME,
  SET_LATITUDE,
  SET_LOCATION,
  SET_LONGITUDE,
  SET_PHONE,
  SET_TRACKING_ID,
} from '../constants/actionTypes'

export const initialState = {
  category: '',
  description: '',
  email: '',
  firstName: '',
  image1: '',
  image2: '',
  lastName: '',
  latitude: '',
  location: '',
  longitude: '',
  phone: '',
  trackingID: '',
}

const report = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_STATE:
      console.log('reducer: report: CLEAR_STATE')
      return initialState
    case SET_CATEGORY:
      console.log('reducer: report: SET_CATEGORY: ', payload)
      return {
        ...state,
        category: payload,
      }  
    case SET_DESCRIPTION:
      console.log('reducer: report: SET_DESCRIPTION: ', payload)
      return {
        ...state,
        description: payload,
      }  
    case SET_EMAIL:
      console.log('reducer: report: SET_EMAIL: ', payload)
      return {
        ...state,
        email: payload,
      }  
    case SET_FIRST_NAME:
      console.log('reducer: report: SET_FIRST_NAME: ', payload)
      return {
        ...state,
        firstName: payload,
      }  
    case SET_IMAGE_1:
      console.log('reducer: report: SET_IMAGE_1: ', payload)
      return {
        ...state,
        image1: payload,
      }  
    case SET_IMAGE_2:
      console.log('reducer: report: SET_IMAGE_2: ', payload)
      return {
        ...state,
        image2: payload,
      }  
    case SET_LAST_NAME:
      console.log('reducer: report: SET_LAST_NAME: ', payload)
      return {
        ...state,
        lastName: payload,
      }  
    case SET_LATITUDE:
      console.log('reducer: report: SET_LATITUDE: ', payload)
      return {
        ...state,
        latitude: payload,
      }  
    case SET_LOCATION:
      console.log('reducer: report: SET_LOCATION: ', payload)
      return {
        ...state,
        location: payload,
      }  
    case SET_LONGITUDE:
      console.log('reducer: report: SET_LONGITUDE: ', payload)
      return {
        ...state,
        longitude: payload,
      }  
    case SET_PHONE:
      console.log('reducer: report: SET_PHONE: ', payload)
      return {
        ...state,
        phone: payload,
      }  
    case SET_TRACKING_ID:
      console.log('reducer: report: SET_TRACKING_ID: ', payload)
      return {
        ...state,
        trackingID: payload,
      }  

    default:
      return { ...state }
  }
}

export default report