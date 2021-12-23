import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import ListRecipe from '../components/ListRecipe'

const SavedList = ({ savedRecipes= [], navigation }) => {

    return (
        <FlatList
            data={savedRecipes}
            renderItem={({ item }) => ListRecipe({ recipe: item, navigation })}
            keyExtractor={item => item.id}
        />
    )
}

const mapStateToProps = (store) => ({
    savedRecipes: store.userState.savedRecipes
})

export default connect(mapStateToProps)(SavedList)