import React, { useState, useRef } from 'react'
import { View, TouchableOpacity, StyleSheet, Platform, FlatList, Image, Pressable, Keyboard, Text, useWindowDimensions } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { normalize } from '../utils'
import { FONTS, COLORS, FONT_SIZES } from '../constants'
import { firebase } from '../firebase/config'
import { ListItem } from 'react-native-elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'

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

    const renderItem = ({ item }) => {
        const onUserPress = () => {
            //navigation.navigate("UserProfile", { user: item })
        }

        return (
            <TouchableOpacity onPress={onUserPress}>
                <ListItem bottomDivider>
                    <Avatar
                        rounded
                        source={ require('../assets/man.png') }
                        size={normalize(80)}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontFamily: FONTS.medium }}>{item.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: 'white', paddingTop: insets.top }]}>
            <View style={styles.tabSearch} zIndex="3">
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
        paddingHorizontal: normalize(5)
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