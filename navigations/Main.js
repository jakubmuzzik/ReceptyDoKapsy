import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AppDrawer from './AppDrawer'
import CreateRecipe from '../components/CreateRecipe'
import { connect } from 'react-redux'
import { fetchUser, clearData } from '../redux/actions'
import { COLORS, FONTS, SPACING, FONT_SIZES } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { normalize } from '../utils'

const Stack = createStackNavigator()

const Main = ({ clearData, fetchUser, navigation }) => {
    useEffect(() => {
        clearData()
        fetchUser()
    }, [])

    return (
        <Stack.Navigator
            initialRouteName='AppDrawer'
            screenOptions={{
                headerTintColor: 'black'
            }}
        >
            <Stack.Screen
                name="AppDrawer"
                component={AppDrawer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateRecipe"
                component={CreateRecipe}
                options={{
                    presentation: 'modal',
                    headerTitle: 'Přidat recept',
                    headerTitleStyle: { fontFamily: FONTS.bold },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: SPACING.small }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginRight: SPACING.small }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={{
                                fontFamily: FONTS.bold, 
                                color: COLORS.blue, 
                                fontSize: FONT_SIZES.medium
                            }}>Uložit</Text>
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                }}
            />
            {/*
            <Stack.Screen
                name="ProfileSettings"
                component={EditProfileScreen}
                options={{
                    headerTitle: 'Edit Profile',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: { fontFamily: FONTS.bold },
                    headerTitleStyle: { fontFamily: FONTS.bold }
                }}
            />
            <Stack.Screen
                name="UserProfile"
                component={ProfileScreen}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: { fontFamily: FONTS.bold, color: 'black' }
                }}
            />
            <Stack.Screen
                name="CreateEvent"
                component={CreateEvent}
                options={{
                    presentation: 'modal',
                    ...TransitionPresets.ModalTransition,
                    headerTitle: 'New Event',
                    headerTitleStyle: { fontFamily: FONTS.bold },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: normalize(10) }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="EventScreen"
                component={EventScreen}
                options={{
                    headerTitle: '',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: { fontFamily: FONTS.bold },
                    //headerTitleStyle: { fontFamily: FONTS.bold },
                    headerTransparent: 'true'
                }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    presentation: 'modal',
                    ...TransitionPresets.ModalTransition,
                    headerTitle: 'Search',
                    headerTitleStyle: { fontFamily: FONTS.bold },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: normalize(10) }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="EventsCalendar"
                component={EventsCalendar}
                options={{
                    presentation: 'modal',
                    ...TransitionPresets.ModalTransition,
                    headerTitle: 'Calendar',
                    headerTitleStyle: { fontFamily: FONTS.bold },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: normalize(10) }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTransparent: true,
                }}
            />*/}
            </Stack.Navigator>
    )
}

//export default Main
export default connect(null, { clearData, fetchUser })(Main)