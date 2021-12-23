import React, { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input, Button, Avatar } from 'react-native-elements'
import { FONTS, COLORS, FONT_SIZES, SPACING, CATEGORIES, CUISINES } from '../constants'
import { Modalize } from 'react-native-modalize'
import * as Animatable from 'react-native-animatable'
import { normalize, deepClone } from '../utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Picker } from 'react-native-woodpicker'
import { MaterialIcons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import * as ImagePicker from 'expo-image-picker'
import { ActivityIndicator } from 'react-native-paper'
import { saveRecipe } from '../redux/actions'
import { connect } from 'react-redux'

const CreateRecipe = ({ navigation, saveRecipe }) => {
    const [data, setData] = useState({
        name: '',
        description: '',
        category: '',
        cuisine: '',
        picture: null,
        duration: null
    })
    const [showErrorMessages, setShowErrorMessages] = useState(false)
    const [ingredients, setIngredients] = useState([...Array(4)])
    const [lottieVisible, setLottieVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const scrollViewRef = useRef()
    const category = useRef()
    const cuisine = useRef()
    const selectPictureModalRef = useRef()

    const insets = useSafeAreaInsets()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={onSavePress}
                    style={{ marginRight: SPACING.small }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={{
                        fontFamily: FONTS.bold,
                        color: COLORS.blue,
                        fontSize: FONT_SIZES.medium
                    }}>Uložit</Text>
                </TouchableOpacity>
            )
        })
    }, [data, ingredients])

    const onDataChange = (attribute, value) => {
        setData(data => ({
            ...data,
            [attribute]: value
        }))
    }

    const onIngredientChange = (index, attribute, value) => {
        setIngredients(data => data.map((ingredient, i) => {
            return index === i ? {
                ...ingredient,
                [attribute]: value
            } : ingredient
        }))
    }

    const hasIngredient = () => ingredients.some(i => i?.name && i?.amount ? true : false)

    const getIngredients = () => ingredients.filter(i => i?.name && i?.amount)

    const onSavePress = async () => {
        if (
            !data.name
            || !data.description
            || !data.duration
            || !data.cuisine
            || !data.category
            || !hasIngredient()
        ) {
            scrollViewRef.current.scrollToPosition(0, 0)
            setShowErrorMessages(true)
            return
        }

        setIsLoading(true)

        let toSave = deepClone(data)
        toSave.ingredients = [
            ...getIngredients()
        ]
        toSave.createdDate = new Date()

        const recipe = await saveRecipe(toSave)
        
        navigation.goBack()
        navigation.navigate('RecipeScreen', {
            recipe
        })
    }

    const onAddIngredientRowPress = () => {
        setIngredients(ingredients => ingredients.concat({}))
    } 

    const onCategoriesPickerChange = ({ value, label }) => {
        category.current = {value, label}
        setData(data => ({
            ...data,
            category: value
        }))
    }

    const onCuisinesPickerChange = ({ value, label }) => {
        cuisine.current = {value, label}
        setData(data => ({
            ...data,
            cuisine: value
        }))
    }

    const takePicture = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });

        if (!result.cancelled) {
            try {
                selectPictureModalRef.current.close()
                setData(data => ({ ...data, picture: result.uri }))
                setLottieVisible(true)
            } catch (e) {
                console.error(e)
            }
        }
    }

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access your gallery is required!")
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        })

        if (!result.cancelled) {
            try {
                selectPictureModalRef.current.close()
                setData(data => ({ ...data, picture: result.uri }))
                setLottieVisible(true)
            } catch (e) {
                console.error(e)
            }
        }
    }

    const renderSelectPictureModal = useCallback(() => (
        <View style={styles.panel}>
            <View style={styles.button_wrapper}>
                <Button
                    buttonStyle={styles.button}
                    titleStyle={{ fontFamily: FONTS.bold, color: COLORS.darkBlue }}
                    title="Udělat fotku"
                    onPress={takePicture}
                    type="outline"
                    icon={{
                        name: 'photo-camera',
                        size: 25,
                        type: 'material-icons',
                        color: COLORS.darkBlue
                    }}
                />
            </View>
            <View style={styles.button_wrapper}>
                <Button
                    buttonStyle={styles.button}
                    titleStyle={{ fontFamily: FONTS.bold, color: COLORS.darkBlue }}
                    title="Vybrat z knihovny"
                    onPress={pickImage}
                    type="outline"
                    icon={{
                        name: 'photo-library',
                        size: 25,
                        type: 'material-icons',
                        color: COLORS.darkBlue
                    }}
                />
            </View>
        </View>
    ))

    return (
        <>
            <KeyboardAwareScrollView
                ref={scrollViewRef}
                keyboardShouldPersistTaps='never'
                contentContainerStyle={[styles.container, { paddingBottom: insets.bottom }]}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={normalize('20', 'height')}
            >
                <Input
                    placeholder="Název"
                    label='Název receptu'
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    containerStyle={[styles.input_wrapper, { marginTop: 0 }]}
                    renderErrorMessage={false}
                    inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && data.name.length < 1) ? COLORS.error : COLORS.placeholder }]}
                    onChangeText={(val) => onDataChange('name', val)}
                />
                {data.name.length < 1 && showErrorMessages ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error_message}>Vyplňte jméno</Text>
                    </Animatable.View> : null
                }

                <View style={[styles.ingredientRow, { paddingTop: SPACING.large, paddingBottom: SPACING.small, borderBottomWidth: 1, borderBottomColor: (showErrorMessages && !data.category) ? COLORS.error : COLORS.placeholder }]}>
                    <View style={[styles.ingredient, { justifyContent: 'flex-end' }]}>
                        <Text style={styles.labelStyle}>Kategorie</Text>
                    </View>
                    <Picker
                        item={category.current}
                        items={CATEGORIES}
                        onItemChange={onCategoriesPickerChange}
                        title="Kategorie"
                        doneButtonLabel="Vybrat"
                        placeholder="Vybrat"
                        textInputStyle={{ fontFamily: FONTS.medium, color: COLORS.blue }}
                        isNullable={true}
                        style={[styles.ingredientAmount, { height: normalize(20), fontFamily: FONTS.medium, }]}
                    />
                </View>
                {!data.category && showErrorMessages ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error_message}>Vyberte kategorii</Text>
                    </Animatable.View> : null
                }

                <View style={[styles.ingredientRow, { paddingTop: SPACING.large, paddingBottom: SPACING.small, borderBottomWidth: 1, borderBottomColor: (showErrorMessages && !data.cuisine) ? COLORS.error : COLORS.placeholder }]}>
                    <View style={[styles.ingredient, { justifyContent: 'flex-end' }]}>
                        <Text style={styles.labelStyle}>Kuchyně</Text>
                    </View>
                    <Picker
                        item={cuisine.current}
                        items={CUISINES}
                        onItemChange={onCuisinesPickerChange}
                        title="Kuchyně"
                        doneButtonLabel="Vybrat"
                        placeholder="Vybrat"
                        textInputStyle={{ fontFamily: FONTS.medium, color: COLORS.blue }}
                        isNullable={true}
                        style={[styles.ingredientAmount, { height: normalize(20), fontFamily: FONTS.medium }]}
                    />
                </View>
                {!data.cuisine && showErrorMessages ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error_message}>Vyberte typ kuchyně</Text>
                    </Animatable.View> : null
                }

                <View style={[styles.ingredientRow, { paddingTop: SPACING.large }]}>
                    <Text style={[styles.labelStyle, styles.ingredient]}>Ingredience</Text>
                    <Text style={[styles.labelStyle, styles.ingredientAmount]}>g</Text>
                </View>
                {ingredients.map((ingredient, index) => (
                    <View style={styles.ingredientRow} key={index}>
                        <Input
                            placeholder="Název ingredience"
                            label=''
                            inputStyle={styles.inputStyle}
                            containerStyle={[styles.input_wrapper, styles.ingredient, { marginTop: SPACING.small, marginRight: SPACING.large }]}
                            renderErrorMessage={false}
                            inputContainerStyle={styles.input_container}
                            onChangeText={(val) => onIngredientChange(index, 'name', val)}
                        />
                        <Input
                            placeholder="0"
                            label=''
                            inputStyle={styles.inputStyle}
                            containerStyle={[styles.input_wrapper, styles.ingredientAmount, { marginTop: SPACING.small }]}
                            renderErrorMessage={false}
                            inputContainerStyle={styles.input_container}
                            onChangeText={(val) => onIngredientChange(index, 'amount', val)}
                            keyboardType='numeric'
                        />
                    </View>))
                }
                {!hasIngredient() && showErrorMessages ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error_message}>Přidejte alespoň jednu ingredienci</Text>
                    </Animatable.View> : null
                }
                <TouchableOpacity style={{ paddingBottom: SPACING.large, paddingTop: SPACING.small }} onPress={onAddIngredientRowPress}>
                    <Text style={styles.addMoreIngredients}>Přidat řádek</Text>
                </TouchableOpacity>

                <Text style={styles.labelStyle}>Postup</Text>
                <View style={[styles.textArea_container, { borderColor: showErrorMessages && data.description.length < 1 ? COLORS.error : 'black' }]} >
                    <TextInput
                        style={[styles.textArea, styles.inputStyle]}
                        underlineColorAndroid="transparent"
                        placeholder="Popis přípravy"
                        placeholderTextColor={COLORS.placeholder}
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(val) => onDataChange('description', val)}
                        maxLength={1000}
                    />
                </View>
                {data.description.length < 1 && showErrorMessages ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error_message}>Vyplňte popis přípravy</Text>
                    </Animatable.View> : null
                }

                <View style={[styles.ingredientRow, { paddingTop: SPACING.large, borderBottomWidth: 1, borderBottomColor: (showErrorMessages && !data.duration) ? COLORS.error : COLORS.placeholder }]}>
                    <View style={[styles.ingredient, { justifyContent: 'center' }]}>
                        <Text style={styles.labelStyle}>Doba přípravy (min)</Text>
                    </View>
                    <Input
                        placeholder="0"
                        label=''
                        inputStyle={styles.inputStyle}
                        containerStyle={[styles.input_wrapper, styles.ingredientAmount, { marginBottom: 0, marginTop: 0 }]}
                        renderErrorMessage={false}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        onChangeText={(val) => onDataChange('duration', val)}
                        keyboardType='numeric'
                    />
                </View>
                {!data.duration && showErrorMessages ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error_message}>Vyplňte dobu přípravy</Text>
                    </Animatable.View> : null
                }

                <View style={[styles.input_container, { paddingTop: SPACING.large, borderBottomWidth: 0 }]}>
                    <Text style={styles.labelStyle}>Nahrát fotku</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar
                            rounded
                            icon={{ name: "add-photo-alternate", type: 'material-icons' }}
                            onPress={() => selectPictureModalRef.current.open()}
                            containerStyle={{
                                backgroundColor: COLORS.darkestBlue,
                                marginVertical: SPACING.small,
                                marginRight: SPACING.small
                            }}
                            size={normalize(45)}
                        />
                        {
                            data.picture && !lottieVisible ? <MaterialIcons name="done" color="green" size={22} style={{ paddingLeft: normalize(8) }} /> :
                                lottieVisible ? <LottieView
                                    style={{ width: 40 }}
                                    autoPlay
                                    loop={false}
                                    onAnimationFinish={() => setLottieVisible(false)}
                                    source={require('../assets/animations/done.json')}
                                /> : null
                        }
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <Modalize ref={selectPictureModalRef} adjustToContentHeight={true}>
                {renderSelectPictureModal()}
            </Modalize>

            {isLoading && <View style={styles.spinner}>
                <ActivityIndicator color='#000' size='large' />
            </View>}
        </>
    )
}

export default connect(null, { saveRecipe })(CreateRecipe)

const styles = StyleSheet.create({
    container: {
        padding: SPACING.medium
    },
    inputStyle: {
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.medium
    },
    labelStyle: {
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.large
    },
    input_wrapper: {
        paddingHorizontal: 0,
        marginTop: SPACING.medium
    },
    input_container: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.placeholder,
    },
    error_message: {
        fontFamily: FONTS.light,
        color: '#FF0000',
        fontSize: FONT_SIZES.x_small,
        marginTop: SPACING.xx_small
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ingredient: {
        flex: 5
    },
    ingredientAmount: {
        flex: 1
    },
    heading: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.medium,
        color: 'black'
    },
    addMoreIngredients: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.small,
        color: COLORS.blue
    },
    textArea_container: {
        borderWidth: 1,
        padding: SPACING.x_small,
        borderRadius: SPACING.small,
        marginTop: SPACING.medium
    },
    textArea: {
        height: normalize(100, 'height'),
        justifyContent: "flex-start"
    },
    panel: {
        padding: SPACING.medium
    },
    button_wrapper: {
        marginBottom: normalize(15, 'height')
    },
    button: {
        //backgroundColor: COLORS.darkBlue,
        height: normalize(38, 'height'),
        borderRadius: normalize(10),
        borderColor: COLORS.darkBlue,
        borderWidth: 1
    },
    spinner: { 
        backgroundColor:'grey', 
        position: 'absolute', 
        top:0, 
        bottom:0, 
        left:0, 
        right: 0, 
        justifyContent: 'center', 
        alignItems: 'center', 
        opacity: 0.3
    }
})