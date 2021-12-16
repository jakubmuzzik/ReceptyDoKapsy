import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import RecipesStack from './RecipesStack'
import ProfileStack from './ProfileStack'
import SavedStack from './SavedStack'
import Search from '../screens/Search'
import { Ionicons, FontAwesome, FontAwesome5, Fontisto } from '@expo/vector-icons'
import { COLORS } from '../constants'
import { Host } from 'react-native-portalize'

const Tab = createMaterialBottomTabNavigator()

const MainTabNavigation = (props) => {
    return (
        <Host>
        <Tab.Navigator
            initialRouteName="RecipesStack"
            activeColor="#fff"
        >
            <Tab.Screen
                name="RecipesStack"
                component={RecipesStack}
                options={{
                    tabBarLabel: 'Recepty',
                    tabBarColor: COLORS.green,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="list-ul" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Hledat',
                    tabBarColor: COLORS.purple,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="search" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add"
                component={View}
                options={{
                    tabBarLabel: 'Přidat',
                    tabBarColor: COLORS.blue,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            style={{
                                shadowColor: 'white',
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,
                                
                                elevation: 7,
                            }} name="plus" size={24} color="white" />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault()
                        navigation.navigate('CreateRecipe')
                    },
                })}
            />
            <Tab.Screen
                name="Saved"
                component={SavedStack}
                options={{
                    tabBarLabel: 'Uložené',
                    tabBarColor: COLORS.red,
                    tabBarIcon: ({ color }) => (
                        <Fontisto name="favorite" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarColor: COLORS.blue,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-sharp" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
        </Host>
    )
}

export default MainTabNavigation