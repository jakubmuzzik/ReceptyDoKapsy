import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AppDrawer from './AppDrawer'
import CreateRecipe from '../components/CreateRecipe'
import { connect } from 'react-redux'
import { fetchUser, clearData, fetchNewestRecipes } from '../redux/actions'
import { COLORS, FONTS, SPACING, FONT_SIZES } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { normalize } from '../utils'
import Recipe from '../screens/Recipe'

const Stack = createStackNavigator()

const Main = ({ clearData, fetchUser, fetchNewestRecipes, navigation }) => {
    useEffect(() => {
        clearData()
        fetchUser()
        fetchNewestRecipes()
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
                name="RecipeScreen"
                component={Recipe}
                options={{
                    //headerShown: false,
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
                    )
                }}
            />
            </Stack.Navigator>
    )
}

//export default Main
export default connect(null, { clearData, fetchUser, fetchNewestRecipes })(Main)