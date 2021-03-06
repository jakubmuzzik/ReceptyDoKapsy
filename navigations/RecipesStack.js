import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import RecipesHome from '../screens/RecipesHome'
import RecipesList from '../screens/RecipesList'

import { SPACING, FONTS } from '../constants'

const Stack = createStackNavigator()

const RecipesStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName='RecipesHome'
            screenOptions={{
                headerStyle: { backgroundColor: 'transparent' }
            }}
        >
            <Stack.Screen
                name="RecipesHome"
                component={RecipesHome}
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
                name="RecipesList"
                component={RecipesList}
                options={{
                    headerTitle: '',
                    headerBackTitle: 'Zpět',
                    headerBackTitleStyle: { fontFamily: FONTS.bold },
                    headerTitleStyle: { fontFamily: FONTS.bold }
                }}
            />
        </Stack.Navigator>
    )
}

export default RecipesStack