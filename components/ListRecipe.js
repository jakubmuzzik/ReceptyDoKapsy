import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import {
    FONTS,
    FONT_SIZES,
    COLORS,
    SPACING,
    CATEGORIES
} from '../constants'
import { Card, Divider } from 'react-native-paper'
import { normalize, getDate } from '../utils'

const CARD_IMAGE_HEIGHT = normalize(150)

const ListRecipe = ({ recipe, navigation, width }) => {

    const onRecipePress = () => {
        navigation.navigate('RecipeScreen', {
            recipe
        })
    }

    const getLabel = (value, array) => array.find(c => c.value === value).label

    return (
        <View style={[styles.cardContainer, width ? {width : width} : {}]}>
            <Card style={styles.card} onPress={onRecipePress}>
                <Card.Content style={styles.cardContent}>
                    {recipe.picture ?
                        <Image
                            source={recipe.picture ? { uri: recipe.picture } : require('../assets/adaptive-icon.png')}
                            resizeMode="cover"
                            style={{
                                height: CARD_IMAGE_HEIGHT
                            }}
                        /> :
                        <Image
                            source={require('../assets/adaptive-icon.png')}
                            resizeMode="cover"
                            style={{
                                height: CARD_IMAGE_HEIGHT,
                                width: CARD_IMAGE_HEIGHT,
                                alignSelf: 'center'
                            }}
                        />
                    }
                    
                    <View style={styles.cardBody}>

                    <Text numberOfLines={1} style={{fontFamily: FONTS.medium, fontSize: FONT_SIZES.x_large}}>
                        {recipe.name}
                    </Text>
                    <Text style={{fontFamily: FONTS.light, fontSize: FONT_SIZES.medium}}>
                        {getLabel(recipe.category, CATEGORIES)}
                    </Text>
                    {!width &&
                        <Text style={{fontFamily: FONTS.light, fontSize: FONT_SIZES.medium}}>
                        Délka přípravy: {recipe.duration} min
                    </Text>
                    }
                    <Text style={{fontFamily: FONTS.light, fontSize: FONT_SIZES.medium, color: COLORS.grey}}>
                        Přidáno: {getDate(recipe.createdDate, false, true)}
                    </Text>

                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}

export default ListRecipe

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingHorizontal: SPACING.x_small,
        paddingBottom: SPACING.medium
    },
    card: {
        flex: 1,
        borderRadius: normalize(5),
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    cardBody: {
        margin: SPACING.small,
        flex: 1
    }
})