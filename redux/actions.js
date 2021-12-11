import {
    USER_STATE_CHANGE,
    CLEAR_DATA
} from './actionTypes'
import { firebase } from '../firebase/config'

// if the function is returned it acts as synchronous function / if not it is called asynchronously
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