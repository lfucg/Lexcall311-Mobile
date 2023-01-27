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

export const clearState = payload => ({ type: CLEAR_STATE, payload })
export const setCategory = payload => ({ type: SET_CATEGORY, payload })
export const setDescription = payload => ({ type: SET_DESCRIPTION, payload })
export const setEmail = payload => ({ type: SET_EMAIL, payload })
export const setFirstName = payload => ({ type: SET_FIRST_NAME, payload })
export const setImage1 = payload => ({ type: SET_IMAGE_1, payload })
export const setImage2 = payload => ({ type: SET_IMAGE_2, payload })
export const setLastName = payload => ({ type: SET_LAST_NAME, payload })
export const setLatitude = payload => ({ type: SET_LATITUDE, payload })
export const setLocation = payload => ({ type: SET_LOCATION, payload })
export const setLongitude = payload => ({ type: SET_LONGITUDE, payload })
export const setPhone = payload => ({ type: SET_PHONE, payload })
export const setTrackingId =  payload => ({ type: SET_TRACKING_ID, payload })
