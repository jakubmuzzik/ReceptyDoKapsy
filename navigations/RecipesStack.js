import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import Recipes from '../screens/Recipes'

import { SPACING } from '../constants'

const Stack = createStackNavigator()

const RecipesStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName='Recipes'
            screenOptions={{
                headerStyle: { backgroundColor: 'transparent' }
            }}
        >
            <Stack.Screen
                name="Recipes"
                component={Recipes}
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
        </Stack.Navigator>
    )
}

export default RecipesStack