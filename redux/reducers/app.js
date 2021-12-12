import {
    APP_SETTINGS_STATE_CHANGE
} from '../actionTypes'

const INITIAL_STATE = {
    appSettings: {
        showNotifications: false
    }
}

export const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_SETTINGS_STATE_CHANGE:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    [action.settingsName] : action.value
                }
            }
        default:
            return state;
    }
}