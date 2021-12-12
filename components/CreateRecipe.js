import React from 'react'
import { View, Text } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'


const CreateRecipe = () => {
    const headerHeight = useHeaderHeight()

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: headerHeight }}>
            <Text style={{fontSize: 50}}>TODO...</Text>
        </View>
    )
}

export default CreateRecipe