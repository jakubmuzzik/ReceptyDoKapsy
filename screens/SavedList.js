import React from 'react'
import { FlatList, View, Image, Text, useWindowDimensions } from 'react-native'
import { connect } from 'react-redux'
import ListRecipe from '../components/ListRecipe'
import { FONTS, COLORS } from '../constants'
import { normalize } from '../utils'

const SavedList = ({ savedRecipes = [], navigation }) => {
    const layout = useWindowDimensions()

    return savedRecipes.length > 0 ? <FlatList
        data={savedRecipes}
        renderItem={({ item }) => ListRecipe({ recipe: item, navigation })}
        keyExtractor={item => item.id}
    /> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} >
        <Text style={{ fontFamily: FONTS.bold, color: COLORS.grey, position: 'absolute', top: layout.height * 0.20 }}>Nemáte žádné uložené recepty...</Text>
        <Image
            resizeMode='contain'
            source={require('../assets/not_found.png')}
            style={{
                height: normalize(280),
                width: normalize(280),
                position: 'absolute',
                top: layout.height * 0.26
            }}
        />
    </View>

}

const mapStateToProps = (store) => ({
    savedRecipes: store.userState.savedRecipes
})

export default connect(mapStateToProps)(SavedList)