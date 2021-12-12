import {
    USER_STATE_CHANGE,
    CLEAR_DATA,
    APP_SETTINGS_STATE_CHANGE
} from './actionTypes'
import { firebase } from '../firebase/config'

export const fetchUser = () => (dispatch) => {
    return firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                console.log('user data fetched')
            } else {
                dispatch({ type: USER_STATE_CHANGE, currentUser: null })
                console.log('user does not exist')
            }
        })
}

export const clearData = () => ({
    type: CLEAR_DATA
})

export const changeAppSettings = (settingsName, value) => ({
    type: APP_SETTINGS_STATE_CHANGE,
    settingsName,
    value
})

export const saveProfile = (userData) => async (dispatch) => {
    if (!userData.profilePhotoUri) {
        return saveUserDataToFirestore(userData).then(() => {
            console.log('profile saved in Firestore')
            dispatch({ type: USER_STATE_CHANGE, currentUser: userData })
        })
    } else {
        const photoId = Math.random().toString(36)
        const result = await uploadImageToFirestore(userData.profilePhotoUri, 'profilePhoto', photoId)
        const downloadUrl = await result.ref.getDownloadURL()
        userData.profilePhoto = downloadUrl
        delete userData.profilePhotoUri
        return saveUserDataToFirestore(userData).then(() => {
            console.log('user data saved to Firestore')
            dispatch({ type: USER_STATE_CHANGE, currentUser: userData })
        })
    }
}

const saveUserDataToFirestore = (data) => {
    return firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
            ...data
        }, { merge: true })
}

const uploadImageToFirestore = async (uri, folderName, photoId) => {
    const childPath = `${folderName}/${firebase.auth().currentUser.uid}/${photoId}`

    const response = await fetch(uri)
    const blob = await response.blob()

    return firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob)
}