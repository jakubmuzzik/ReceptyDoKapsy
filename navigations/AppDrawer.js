import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import DrawerContent from '../components/DrawerContent'
import MainTabNavigation from './MainTabNavigation'
import { SPACING } from '../constants'

const Drawer = createDrawerNavigator()

const AppDrawer = ({ navigation }) => {
    return (
        <Drawer.Navigator 
            screenOptions={{
                headerShown: false
            }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name="MainTabNavigation"
                component={MainTabNavigation} />
        </Drawer.Navigator>
    )
}

export default AppDrawer