import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import Profile from '../screens/Profile'
import PersonalDetails from '../screens/PersonalDetails'
import AppInfo from '../screens/AppInfo'

import { SPACING, FONTS } from '../constants'

const Stack = createStackNavigator()

const ProfileStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerStyle: { backgroundColor: 'transparent' }
            }}
        >
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: SPACING.medium }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <MaterialCommunityIcons
                                name="menu"
                                size={26}
                                color='black'
                            />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="AppInfo"
                component={AppInfo}
                options={{
                    headerTitle: 'O aplikaci',
                    headerBackTitle: 'Zpět',
                    headerBackTitleStyle: { fontFamily: FONTS.bold },
                    headerTitleStyle: { fontFamily: FONTS.bold }
                }}
            />
            <Stack.Screen
                name="PersonalDetails"
                component={PersonalDetails}
                options={{
                    headerTitle: 'Osobní údaje',
                    headerBackTitle: 'Zpět',
                    headerBackTitleStyle: { fontFamily: FONTS.bold },
                    headerTitleStyle: { fontFamily: FONTS.bold }
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack