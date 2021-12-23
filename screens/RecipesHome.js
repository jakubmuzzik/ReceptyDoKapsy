import React, { useState, useRef, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { FONTS, FONT_SIZES, COLORS, SPACING, CATEGORIES, CUISINES } from '../constants'
import { normalize } from '../utils'
import { connect } from 'react-redux'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import ListRecipe from '../components/ListRecipe'

const RecipesHome = ({ newestRecipes = [], navigation }) => {
    const headerHeight = useHeaderHeight()
    const cuisinesModalRef = useRef()
    const categoriesModalRef = useRef()

    const openCuisinesModal = () => {
        cuisinesModalRef.current?.open()
    }

    const openCategoriesModal = () => {
        categoriesModalRef.current?.open()
    }

    const onSelectionPress = (label, selectionType, modalRef) => {
        modalRef?.close()

        let selection = ''

        if(selectionType === 'category') {
            selection = CATEGORIES.find(c => c.label === label).value
        } else {
            selection = CUISINES.find(c => c.label === label).value
        }

        navigation.navigate('RecipesList', {
            label,
            selection,
            selectionType
        })
    }

    const renderCategoriesModalContent = useCallback(() => (
        <View style={styles.panel}>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Burgery', 'category', categoriesModalRef.current)}>
                <FontAwesome5 name="hamburger" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Burgery
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Fast Food', 'category', categoriesModalRef.current)}>
                <MaterialIcons name="fastfood" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Fast Food
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Fit', 'category', categoriesModalRef.current)}>
                <Ionicons name="fitness" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Fit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Mlsání', 'category', categoriesModalRef.current)}>
                <MaterialCommunityIcons name="candycane" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Mlsání
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Oběd', 'category', categoriesModalRef.current)}>
                <MaterialCommunityIcons name="food-drumstick" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Oběd
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Párty', 'category', categoriesModalRef.current)}>
                <MaterialCommunityIcons name="party-popper" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Párty
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Pizza', 'category', categoriesModalRef.current)}>
                <Ionicons name="pizza" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Pizza
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Steaky', 'category', categoriesModalRef.current)}>
                <MaterialCommunityIcons name="food-steak" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Steaky
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Snídaně', 'category', categoriesModalRef.current)}>
                <MaterialIcons name="free-breakfast" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Snídaně
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Večeře', 'category', categoriesModalRef.current)}>
                <MaterialIcons name="dinner-dining" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Večeře
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Vegan', 'category', categoriesModalRef.current)}>
                <MaterialCommunityIcons name="cow" size={24} color="black" />
                <Text style={styles.bottomSheetItemText}>
                    Vegan
                </Text>
            </TouchableOpacity>
        </View>
    ))

    const renderCuisinesModalContent = useCallback(() => (
        <View style={styles.panel}>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Americká', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/us.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Americká
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Vietnamská', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/vn.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Vietnamská
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Česká', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/cz.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Česká
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Indická', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/in.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Indická
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Italská', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/it.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Italská
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Mexická', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/mx.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Mexická
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Řecká', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/gr.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Řecká
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Slovenská', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/sk.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Slovenská
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onSelectionPress('Thajská', 'cuisine', cuisinesModalRef.current)}>
                <Image
                    resizeMode='contain'
                    source={require('../assets/flags/th.png')}
                    style={{
                        width: normalize(20),
                        height: normalize(15),
                    }}
                />
                <Text style={styles.bottomSheetItemText}>
                    Thajská
                </Text>
            </TouchableOpacity>
        </View>
    ), [])

    return (
        <>
            <ScrollView style={{
                flex: 1,
                marginTop: headerHeight,
                padding: SPACING.small
            }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionName}>KUCHYNĚ</Text>
                        <TouchableOpacity style={styles.sectionButton} onPress={openCuisinesModal}>
                            <Text style={styles.buttonText}>Zobrazit více</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={200}
                        decelerationRate='fast'
                        snapToAlignment='center'
                    >
                        <View style={[styles.cuisine, { marginLeft: 0 }]}>
                            <TouchableOpacity
                                onPress={() => onSelectionPress('Česká', 'cuisine')}
                                style={{
                                    width: normalize(160),
                                    height: normalize(110),
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../assets/cuisines/czech.jpg')}
                                    style={{
                                        width: normalize(160),
                                        height: normalize(110),
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.cuisineName}>Česká</Text>
                        </View>

                        <View style={styles.cuisine}>
                            <TouchableOpacity 
                                onPress={() => onSelectionPress('Italská', 'cuisine')}
                                style={{
                                    width: normalize(160),
                                    height: normalize(110),
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../assets/cuisines/italian.jpg')}
                                    style={{
                                        width: normalize(160),
                                        height: normalize(110),
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.cuisineName}>Italská</Text>
                        </View>

                        <View style={styles.cuisine}>
                            <TouchableOpacity 
                                onPress={() => onSelectionPress('Vietnamská', 'cuisine')} 
                                style={{
                                    width: normalize(160),
                                    height: normalize(110),
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../assets/cuisines/asian.jpg')}
                                    style={{
                                        width: normalize(160),
                                        height: normalize(110),
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.cuisineName}>Vietnamská</Text>
                        </View>

                        <View style={styles.cuisine}>
                            <TouchableOpacity 
                                onPress={() => onSelectionPress('Mexická', 'cuisine')}
                                style={{
                                    width: normalize(160),
                                    height: normalize(110),
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../assets/cuisines/mexican.jpg')}
                                    style={{
                                        width: normalize(160),
                                        height: normalize(110),
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.cuisineName}>Mexická</Text>
                        </View>

                        <View style={[styles.cuisine, { marginRight: 0 }]}>
                            <TouchableOpacity 
                                onPress={() => onSelectionPress('Indická', 'cuisine')}
                                style={{
                                    width: normalize(160),
                                    height: normalize(110),
                                    borderRadius: 20,
                                    overflow: 'hidden'
                                }}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../assets/cuisines/indian.jpg')}
                                    style={{
                                        width: normalize(160),
                                        height: normalize(110),
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.cuisineName}>Indická</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionName}>KATEGORIE</Text>
                        <TouchableOpacity style={styles.sectionButton} onPress={openCategoriesModal}>
                            <Text style={styles.buttonText}>Zobrazit více</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoryRow}>
                        <TouchableOpacity onPress={() => onSelectionPress('Snídaně', 'category')} style={styles.categoryButtonLeft}>
                            <Text style={styles.categoryButtonText}>Snídaně</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onSelectionPress('Fit', 'category')} style={styles.categoryButtonRight}>
                            <Text style={styles.categoryButtonText}>Fit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoryRow}>
                        <TouchableOpacity onPress={() => onSelectionPress('Oběd', 'category')} style={styles.categoryButtonLeft}>
                            <Text style={styles.categoryButtonText}>Oběd</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onSelectionPress('Párty', 'category')} style={styles.categoryButtonRight}>
                            <Text style={styles.categoryButtonText}>Párty</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoryRow}>
                        <TouchableOpacity onPress={() => onSelectionPress('Večeře', 'category')} style={styles.categoryButtonLeft}>
                            <Text style={styles.categoryButtonText}>Večeře</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onSelectionPress('Mlsání', 'category')} style={styles.categoryButtonRight}>
                            <Text style={styles.categoryButtonText}>Mlsání</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionName}>NEJNOVĚJŠÍ RECEPTY</Text>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={200}
                        decelerationRate='fast'
                        snapToAlignment='center'
                    >
                        {newestRecipes.map((recipe, index) => (
                            <ListRecipe key={index} recipe={recipe} navigation={navigation} width={normalize(250)}/> 
                            // <View key={index} style={styles.newestRecipeContainer}>
                            //     <Text style={styles.newestRecipeText}>{recipe.name}</Text>
                            // </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            <Portal>
                <Modalize ref={cuisinesModalRef} adjustToContentHeight={true}>
                    {renderCuisinesModalContent()}
                </Modalize>
            </Portal>

            <Portal>
                <Modalize ref={categoriesModalRef} adjustToContentHeight={true}>
                    {renderCategoriesModalContent()}
                </Modalize>
            </Portal>
        </>
    )
}

const mapStateToProps = (store) => ({
    newestRecipes: store.userState.newestRecipes
})

export default connect(mapStateToProps)(RecipesHome)

const styles = StyleSheet.create({
    section: {
        paddingBottom: SPACING.xxx_large
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: SPACING.medium
    },
    sectionName: {
        flex: 1,
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.large,
        color: COLORS.green
    },
    sectionButton: {
        flex: 1,
        alignItems: 'flex-end'
    },
    buttonText: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.medium,
        color: COLORS.blue
    },
    cuisine: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SPACING.x_small
    },
    cuisineName: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey,
        paddingTop: SPACING.x_small
    },
    categoryRow: {
        flexDirection: 'row',
    },
    categoryButtonLeft: {
        flex: 1,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        justifyContent: 'center',
        height: normalize(35),
        marginRight: SPACING.x_small,
        marginVertical: SPACING.xx_small,
        borderRadius: normalize(7)
    },
    categoryButtonRight: {
        flex: 1,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        justifyContent: 'center',
        height: normalize(35),
        marginLeft: SPACING.x_small,
        marginVertical: SPACING.xx_small,
        borderRadius: normalize(7)
    },
    categoryButtonText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        color: '#FFF'
    },
    newestRecipeContainer: {
        height: normalize(200),
        width: normalize(300)
    },
    newestRecipeText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        color: '#FFF'
    },
    panel: {
        padding: SPACING.medium
    },
    bottomSheetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: SPACING.medium
    },
    bottomSheetItemText: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.large,
        color: COLORS.darkBlue,
        alignSelf: 'center',
        paddingLeft: SPACING.small
    }
})