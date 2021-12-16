import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import {
    FONTS,
    FONT_SIZES,
    COLORS,
    SPACING
} from '../constants'
import { Card, Divider } from 'react-native-paper'
import { normalize } from '../utils'

const CARD_IMAGE_HEIGHT = normalize(150)

const ListRecipe = ({ recipe, navigation }) => {

    const onRecipePress = () => {
        //navigate
    }

    return (
        <View style={styles.cardContainer}>
            <Card style={styles.card} onPress={onRecipePress}>
                <Card.Content style={styles.cardContent}>
                    {recipe.picture ? (
                        <Image
                            source={{ uri: recipe.picture }}
                            resizeMode="cover"
                            style={{
                                height: CARD_IMAGE_HEIGHT
                            }}
                        />
                    ) : (
                        <View style={{ paddingVertical: SPACING.small }}>
                            <Image
                                source={require('../assets/man.png')}
                                resizeMode="contain"
                                style={{
                                    alignSelf: 'center',
                                    height: CARD_IMAGE_HEIGHT - (SPACING.small * 2)
                                }}
                            />
                        </View>
                    )}
                    <View style={styles.cardBody}>
                       
                    <Text>Name</Text>
                    <Text>Category</Text>
                    <Text>Cuisine</Text>
                    <Text>CreatedDate</Text>

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