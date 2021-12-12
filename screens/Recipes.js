import React from 'react'
import { View, Text } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'


const Recipes = () => {
    const headerHeight = useHeaderHeight()

    return (
        <View style={{flex: 1, flexDirection: 'center', alignItems: 'center', marginTop: headerHeight }}>
            <Text>Recipes List</Text>
        </View>
    )
}

export default Recipes