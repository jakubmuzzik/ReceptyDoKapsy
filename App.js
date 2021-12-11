import * as SplashScreen from "expo-splash-screen"
import React, { useRef, useState, useEffect } from "react"
import { StatusBar } from "react-native"
import { firebase } from './firebase/config'

import store from './redux/store'
import { Provider } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import AuthStack from './navigations/AuthStack'
import Main from "./navigations/Main"

import AnimatedAppLoader from './components/AnimatedAppLoader'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StackActions } from '@react-navigation/native'

import { RootSiblingParent } from 'react-native-root-siblings'

SplashScreen.preventAutoHideAsync().catch(() => { })

export default function App() {
  const [loggedInOnInit, setLoggedIn] = useState(null)
  const navigationRef = useRef()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setLoggedIn(false)
        navigationRef.current?.dispatch(StackActions.replace('AuthStack'))
      } else {
        setLoggedIn(true)
        navigationRef.current?.dispatch(StackActions.replace('Main'))
      }
    })

    return () => unsubscribe()
  }, [])

  if (loggedInOnInit == null) {
    return null
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <Provider store={store}>
        <SafeAreaProvider>
          <RootSiblingParent>
            <AnimatedAppLoader loggedIn={loggedInOnInit}>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                  initialRouteName={loggedInOnInit ? 'Main' : 'AuthStack'}
                  headerMode='none'
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                  />
                  <Stack.Screen
                    name="Main"
                    component={Main}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </AnimatedAppLoader>
          </RootSiblingParent>
        </SafeAreaProvider>
      </Provider>
    </>
  )
}
