import React, { useState, useLayoutEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    LogBox, 
    Dimensions, 
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, CATEGORIES, CUISINES, CUSINES_FLAGS } from '../constants'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Fontisto, AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import{ normalize, getDate } from '../utils'
import * as Haptics from 'expo-haptics'
import { connect } from 'react-redux'
import { addRecipeToFavourites, removeRecipeFromFavourites, removeRecipe } from '../redux/actions'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
])

const windowWidth = Dimensions.get('window').width
//calculate 4:3 aspect ratio
const HEADER_IMAGE_HEIGHT = windowWidth * 3 / 4

const Recipe = ({ route, navigation, savedRecipes, createdRecipes, addRecipeToFavourites, removeRecipeFromFavourites, removeRecipe }) => {
    const { recipeId, recipe } = route.params

    const insets = useSafeAreaInsets()
    const headerHeight = useHeaderHeight()

    const [moreTextShown, setMoreTextShown] = useState(false)
    const [showTextTriggeringButton, setShowTextTriggeringButton] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: recipe.name
        })
    }, [recipe])

    const onTextLayout = (e) => {
        if (e.nativeEvent.lines.length >= 4) {
            setShowTextTriggeringButton(true)
        }
    }

    const onDeletePress = () => {
        Alert.alert(
            "Smazat recept",
            "Opravdu chcete smazat tento recept?",
            [
                {
                    text: "Zrušit",
                    style: "cancel"
                },
                { text: "Delete", onPress: () => onDeleteRecipe(), style: 'destructive' }
            ],
            { cancelable: false }
        )
    }

    const onDeleteRecipe = () => {
        removeRecipe(recipe)
        navigation.goBack()
    }

    const onSavePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        if (savedRecipes?.includes(recipe.id)) {
            removeRecipeFromFavourites(recipe)
        } else {
            addRecipeToFavourites(recipe)
        }
    }

    return (
        <ImageHeaderScrollView
            maxHeight={HEADER_IMAGE_HEIGHT}
            minHeight={headerHeight}
            renderHeader={() => recipe.picture ?
                <Image
                    source={{uri: recipe.picture}}
                    resizeMode="cover"
                    style={{
                        height: HEADER_IMAGE_HEIGHT,
                        width: windowWidth
                    }}
                /> :
                <Image
                    source={require('../assets/adaptive-icon.png')}
                    resizeMode="center"
                    style={{
                        height: HEADER_IMAGE_HEIGHT,
                        width: windowWidth,
                        alignSelf: 'center'
                    }}
                />
            }
            useNativeDriver={true}
            style={{ width: windowWidth, overflow: 'visible' }}
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
        >
            <TriggeringView style={{ paddingBottom: insets.bottom, flex: 1 }}>
                <View style={styles.headerButtons} zIndex="2">
                    {!createdRecipes?.includes(recipe.id) && <TouchableOpacity
                        style={[styles.shadow, styles.saveButton, { shadowColor: COLORS.green, marginRight: normalize(10) }]}
                        activeOpacity="1"
                        onPress={onSavePress}
                    >
                        <Fontisto name="favorite" size={18} color="white" style={{ paddingRight: normalize(4) }} />
                        <Text style={styles.immageHeaderButtonText}>{
                            savedRecipes?.includes(recipe.id) ? 'Uloženo' : 'Uložit'
                        }</Text>
                    </TouchableOpacity>}

                    {createdRecipes?.includes(recipe.id) && <TouchableOpacity
                        style={[styles.shadow, styles.deleteButton, { shadowColor: COLORS.placeholder, marginRight: normalize(10) }]}
                        activeOpacity="1"
                        onPress={onDeletePress}
                    >
                        <AntDesign
                            name="delete"
                            size={normalize(20)}
                            color="white"
                        />
                    </TouchableOpacity>}

                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.recipeName} numberOfLines={1}>{recipe.name}</Text>

                    <View style={[styles.section, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                        <View style={styles.headerItem}>
                            <Image
                                resizeMode='contain'
                                source={CUSINES_FLAGS[recipe.cuisine]}
                                style={{
                                    width: normalize(20),
                                    height: normalize(15),
                                }}
                            />
                            <Text style={{ paddingLeft: normalize(10), fontFamily: FONTS.medium, color: 'grey' }}>
                                {CUISINES.find(c => c.value === recipe.cuisine).label}
                            </Text>
                        </View>
                        <View style={styles.headerItem}>
                            <MaterialCommunityIcons name="food-fork-drink" size={normalize(18)} color="black" />
                            <Text style={{ paddingLeft: normalize(10), fontFamily: FONTS.medium, color: 'grey' }}>
                                {CATEGORIES.find(c => c.value === recipe.category).label}
                            </Text>
                        </View>
                        <View style={styles.headerItem}>
                            <Fontisto name="date" size={normalize(18)} color="black" />
                            <Text style={{ paddingLeft: normalize(10), fontFamily: FONTS.medium, color: 'grey' }}>
                                {getDate(recipe.createdDate, false, true)}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.shadow, styles.sectionHeader, { shadowColor: COLORS.green, zIndex: 2 }]}>
                        <Text style={styles.sectionText}>INGREDIENCE</Text>
                    </View>

                    <View style={styles.section}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientRow}>
                                <Text style={styles.ingredient}>{ingredient.name}</Text>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Text style={styles.ingredientAmount}>{ingredient.amount} g</Text>
                                </View>
                            </View>
                        ))}  
                    </View>

                    <View style={[styles.shadow, styles.sectionHeader, { shadowColor: COLORS.green, zIndex: 2, width: normalize(70) }]}>
                        <Text style={styles.sectionText}>POPIS</Text>
                    </View>

                    <View style={styles.section}>
                        <Text
                            onTextLayout={onTextLayout}
                            style={{ fontFamily: FONTS.large, fontSize: FONT_SIZES.small }}
                            numberOfLines={moreTextShown ? undefined : 4}>
                            {recipe.description}
                        </Text>
                        {
                            showTextTriggeringButton && (
                                <Text
                                    onPress={() => setMoreTextShown(v => !v)}
                                    style={{ fontFamily: FONTS.bold, marginTop: 10 }}>
                                    {moreTextShown ? 'Read less...' : 'Read more...'}
                                </Text>
                            )
                        }
                    </View>

                </View>
            </TriggeringView>
        </ImageHeaderScrollView>
    )
}

const mapStateToProps = (store) => ({
    savedRecipes: store.userState.currentUser.savedRecipes,
    createdRecipes: store.userState.currentUser.createdRecipes
})

export default connect(mapStateToProps, { addRecipeToFavourites, removeRecipeFromFavourites, removeRecipe })(Recipe)

const styles = StyleSheet.create({
    caption: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.large
    },
    section: {
        paddingHorizontal: SPACING.medium,
        paddingBottom: SPACING.medium,
    },
    headerButtons: {
        position: 'absolute',
        top: -normalize(30),
        right: 0,
        flexDirection: 'row'
    },
    deleteButton: {
        padding: SPACING.small,
        flexDirection: 'row',
        borderRadius: normalize(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.placeholder
    },
    saveButton: {
        paddingHorizontal: SPACING.medium,
        paddingVertical: SPACING.small,
        height: normalize(40),
        flexDirection: 'row',
        borderRadius: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.green,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    immageHeaderButtonText: {
        backgroundColor: 'transparent',
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    sectionHeader: {
        width: normalize(120),
        padding: SPACING.x_small,
        backgroundColor: COLORS.green,
        borderTopRightRadius: SPACING.large,
        borderBottomRightRadius: SPACING.large,
        marginBottom: SPACING.small
    },
    button: {
        borderRadius: SPACING.small,
        borderColor: COLORS.darkestBlue,
        borderWidth: 1
    },
    recipeName: {
        fontFamily: FONTS.bold, 
        fontSize: FONT_SIZES.xx_large, 
        flexShrink: 1,
        paddingTop: SPACING.small,
        paddingHorizontal: SPACING.medium,
        marginBottom: SPACING.x_small
    },
    headerItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: SPACING.x_small,
        paddingRight: SPACING.large
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ingredient: {
        flex: 5,
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.large
    },
    ingredientAmount: {
        flex: 1,
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.large
    },
    sectionText: { 
        fontFamily: FONTS.medium, 
        fontSize: FONT_SIZES.small, 
        color: '#FFF' 
    }
})