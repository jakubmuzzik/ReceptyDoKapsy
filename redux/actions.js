import {
    USER_STATE_CHANGE,
    CLEAR_DATA,
    APP_SETTINGS_STATE_CHANGE,
    NEWEST_RECIPES_STATE_CHANGE,
    SAVED_RECIPES_STATE_CHANGE,
    CREATED_RECIPES_STATE_CHANGE
} from './actionTypes'
import { firebase } from '../firebase/config'
import { getContentByIds } from '../utils'

export const fetchUser = () => (dispatch) => {
    return firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                const currentUser = snapshot.data()
                dispatch({ type: USER_STATE_CHANGE, currentUser })
                dispatch(fetchSavedRecipes(currentUser.savedRecipes))
                dispatch(fetchCreatedRecipes(currentUser.createdRecipes))
                console.log('user data fetched')
            } else {
                dispatch({ type: USER_STATE_CHANGE, currentUser: null })
                console.log('user does not exist')
            }
        })
}

const fetchSavedRecipes = (recipeIds) => (dispatch) => {
    if (!recipeIds || recipeIds.length < 1) {
        return
    }

    return getContentByIds([...recipeIds], 'recipes')
            .then(savedRecipes => {
                dispatch({ type: SAVED_RECIPES_STATE_CHANGE, savedRecipes })
                console.log('saved recipes fetched')
            })
}

const fetchCreatedRecipes = (recipeIds) => (dispatch) => {
    if (!recipeIds || recipeIds.length < 1) {
        return
    }

    return getContentByIds([...recipeIds], 'recipes')
            .then(createdRecipes => {
                dispatch({ type: CREATED_RECIPES_STATE_CHANGE, createdRecipes })
                console.log('created recipes fetched')
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

export const fetchNewestRecipes = () => (dispatch) => {
    return firebase.firestore()
        .collection('recipes')
        .orderBy('createdDate', 'desc')
        .limit(10)
        .get()
        .then((snapshot) => {
            let newestRecipes = snapshot.docs
                .map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data }
                })

            dispatch({ type: NEWEST_RECIPES_STATE_CHANGE, newestRecipes })
            console.log('newest recipes fetched')
        })
}

export const saveRecipe = (data) => async (dispatch, getState) => {
    if (data.picture) {
        const pictureId = Math.random().toString(36)
        const result = await uploadImageToFirestore(data.picture, 'recipes', pictureId)
        const downloadUrl = await result.ref.getDownloadURL()
        data.picture = downloadUrl
        console.log('Picture saved in Firestore')
    }

    const doc = await firebase.firestore()
        .collection('recipes')
        .add({
            ...data
        })

    console.log('Recipe saved in Firestore')

    data.id = doc.id

    const userData = JSON.parse(JSON.stringify(getState().userState.currentUser))
    userData.createdRecipes.push(doc.id)

    await saveUserDataToFirestore(userData)
    dispatch({ type: USER_STATE_CHANGE, currentUser: userData })
    console.log('User updated in Firestore and Redux')

    dispatch({type: CREATED_RECIPES_STATE_CHANGE, createdRecipes: getState().userState.createdRecipes.concat(data) })
    console.log('Created Recipes added to Redux')

    dispatch({ type: NEWEST_RECIPES_STATE_CHANGE, newestRecipes: getState().userState.newestRecipes.concat(data) })
    console.log('Newest Recipes updated in Redux')

    return data
}