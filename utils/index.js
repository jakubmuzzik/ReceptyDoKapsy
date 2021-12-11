import { useState } from 'react'
import { Dimensions, Platform, PixelRatio } from 'react-native'
import { firebase } from '../firebase/config'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

// based on iPhone 8's scale
const wscale = SCREEN_WIDTH / 375
const hscale = SCREEN_HEIGHT / 667

export const normalize = (size, based = 'width') => {
  const newSize = based === 'height' ? size * hscale : size * wscale

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const getDate = (timestamp, getDayName = false, getYear = false) => {
  if (!timestamp) {
    return ''
  }

  let out = ''

  const dateTime = timestamp.hasOwnProperty('seconds') ? new Date(timestamp.seconds * 1000) : new Date(timestamp)

  out += getDayName ? DAY_NAMES[dateTime.getDay()] + ', ' : ''
  out += dateTime.getDate() + '.' + (dateTime.getMonth() + 1)
  out += getYear ? ' ' + dateTime.getFullYear() : ''

  return out
}

export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}