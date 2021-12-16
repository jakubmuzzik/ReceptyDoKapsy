import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { connect } from 'react-redux'
import ListRecipe from '../components/ListRecipe'

const SavedList = ({ savedRecipes= [], navigation }) => {

    return (
        <FlatList
            data={[{name: 'name'}]}
            renderItem={({ item }) => ListRecipe({ recipe: item, navigation })}
            keyExtractor={item => item.id}
        />
    )
}

const mapStateToProps = (store) => ({
    savedRecipes: store.userState.savedRecipes
})

export default connect(mapStateToProps)(SavedList)

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: SPACING.small 
    }
})