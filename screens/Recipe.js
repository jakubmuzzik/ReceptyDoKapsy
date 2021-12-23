import React from 'react'
import { View, Text, StyleSheet, LogBox } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
])

const Recipe = ({ route, navigation }) => {
    const { recipeId, recipe } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recipe Screen {recipe?.name}</Text>
        </View>
    )
}


export default Recipe

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: SPACING.small 
    },
    heading: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.medium,
    },
})