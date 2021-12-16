import { Dimensions, Platform, PixelRatio, Text } from 'react-native'
import Toast from 'react-native-root-toast'
import React from 'react'

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

export const getDateObject = (timestamp) => {
  return timestamp.hasOwnProperty('seconds') ? new Date(timestamp.seconds * 1000) : new Date(timestamp)
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

export const getContentByIds = (ids, path) => {
  const db = firebase.firestore()
  return new Promise((res) => {
    if (!ids || !ids.length || !path) return res([])

    const collectionPath = db.collection(path)
    let batches = []

    while (ids.length) {
      // firestore limits batches to 10
      const batch = ids.splice(0, 10)

      // add the batch request to to a queue
      batches.push(
        new Promise(response => {
          collectionPath
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              [...batch]
            )
            .get()
            .then(results => response(results.docs.map(result => ({ id: result.id, ...result.data() }))))
        })
      )
    }

    // after all of the data is fetched, return it
    Promise.all(batches).then(content => {
      res(content.flat())
    })

  })
}