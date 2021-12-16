import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import SavedList from '../screens/SavedList'

import { SPACING, FONTS } from '../constants'

const Stack = createStackNavigator()

const SavedStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName='SavedList'
            screenOptions={{
                headerStyle: { backgroundColor: 'transparent' }
            }}
        >
            <Stack.Screen
                name="SavedList"
                component={SavedList}
                options={{
                    headerTitle: 'Uložené recepty',
                    headerTitleStyle: { fontFamily: FONTS.bold },
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
        </Stack.Navigator>
    )
}

export default SavedStack