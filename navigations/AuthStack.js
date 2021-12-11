import React from 'react'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const AuthStack = () => {

    return (
        <Stack.Navigator initialRouteName='SignInScreen'>
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack
