import React, { useState, useRef } from 'react'
import { 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Platform, 
    FlatList, 
    Image, 
    Pressable, 
    Keyboard, 
    Text, 
    useWindowDimensions 
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { normalize } from '../utils'
import { FONTS, COLORS, FONT_SIZES, CATEGORIES } from '../constants'
import { firebase } from '../firebase/config'
import { ListItem, Avatar } from 'react-native-elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Setting a timer'])

export const Search = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState([])
    const [showEmptyScreen, setShowEmptyScreen] = useState(false)

    const searchValue = useRef('')
    const searchTimeout = useRef()

    const insets = useSafeAreaInsets()
    const layout = useWindowDimensions()

    const onSearch = async (search) => {
        searchValue.current = search
        if (!search || search.length < 1) {
            clearTimeout(searchTimeout.current)
            setIsLoading(false)
            setResults([])
            return
        }

        setIsLoading(true)
        clearTimeout(searchTimeout.current)

        searchTimeout.current = setTimeout(() => {
            fetchRecipes(search)
        }, 200)
    }

    const fetchRecipes = (search) => {
        console.log('fetching recipes...')
        firebase.firestore()
            .collection('recipes')
            .orderBy('name')
            .startAt(search)
            .endAt(search + '\uf8ff')
            //.where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let recipes = snapshot.docs
                    .map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return { id, ...data }
                    })
                setResults(recipes)
                setShowEmptyScreen(recipes.length < 1)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const getCategorylabel = (value) => CATEGORIES.find(c => c.value === value).label

    const renderItem = ({ item }) => {
        const onRecipePress = () => {
            navigation.navigate("RecipeScreen", { recipe: item })
        }

        return (
            <TouchableOpacity onPress={onRecipePress}>
                <ListItem bottomDivider>
                    <Image
                        source={ item.picture ? {uri: item.picture} : require('../assets/adaptive-icon.png')}
                        resizeMode="contain"
                        style={{
                            alignSelf: 'center',
                            height: normalize(90),
                            width: normalize(90),
                            borderRadius: normalize(5)
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={{ fontFamily: FONTS.medium }}>{getCategorylabel(item.category)}</ListItem.Subtitle>
                        <ListItem.Subtitle style={{ fontFamily: FONTS.medium }}>Délka přípravy: {item.duration} min</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: 'white', paddingTop: insets.top }]}>
            <View style={styles.tabSearch}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={onSearch}
                    value={null}
                    inputStyle={styles.searchBar_input}
                    containerStyle={styles.searchBar_container}
                    inputContainerStyle={styles.searchBar_inputContainer}
                    platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                    showLoading={isLoading}
                    onFocus={() => setShowEmptyScreen(false)}
                />
            </View>

            {results.length > 0 &&
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    keyboardShouldPersistTaps='always'
                />
            }
            {showEmptyScreen && !isLoading && searchValue.current.length !== 0 &&
                <Pressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => Keyboard.dismiss()}>
                    <Text style={{ fontFamily: FONTS.bold, color: COLORS.grey, position: 'absolute', top: layout.height * 0.20 }}>Žádné výsledky...</Text>
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
                </Pressable>
            }
            {isLoading && <View style={styles.spinner}>
                <ActivityIndicator color='#000' size='large' />
            </View>}
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabSearch: {
        paddingHorizontal: normalize(5),
        zIndex: 3
    },
    tabItems: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: normalize(8),
    },
    searchBar_input: {
        fontFamily: FONTS.light,
        fontSize: FONT_SIZES.medium,
    },
    searchBar_inputContainer: {
        backgroundColor: '#e8e8e8',
        height: normalize(25, 'height')
    },
    searchBar_container: {
        backgroundColor: 'transparent'
    },
    tabItem_text: {
        fontFamily: FONTS.bold,
        color: COLORS.darkBlue
    },
    tabItem_border: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.darkBlue
    },
    spinner: {
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