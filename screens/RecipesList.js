import React, { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    useWindowDimensions
} from 'react-native'
import { FONTS, FONT_SIZES, COLORS, SPACING, CATEGORIES, CUISINES } from '../constants'
import { normalize, getDateObject } from '../utils'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { EvilIcons , FontAwesome } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native-paper'
import { firebase } from '../firebase/config'
import { Picker } from 'react-native-woodpicker'
import ListRecipe from '../components/ListRecipe'

const SORT_BY_FILTERS = [
    { label: "Nejrychlejších receptů", value: 'fastest' },
    { label: "Nejnovějších receptů", value: 'newest' }
]

const DATE_FILTERS = [
    { label: "Poslední měsíc", value: 'last_month' },
    { label: "Poslední týden", value: 'last_week' },
    { label: "Posledních 24 hodin", value: 'last_day' }
]

const RecipesList = ({ route, navigation }) => {
    const { label, selection, selectionType } = route.params

    const [isLoading, setIsLoading] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [filters, setFilters] = useState({})

    const filtersModalRef = useRef()
    const sortByPickerRef = useRef()
    const datesPickerRef = useRef()
    const sortByFilterLast = useRef()
    const datesFilterLast = useRef()

    const layout = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: label,
            headerRight: () => (
                <TouchableOpacity onPress={openFiltersModal}
                    style={{ marginRight: SPACING.medium }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <FontAwesome name="filter" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    }, [route.params])

    useEffect(() => {
        firebase.firestore()
            .collection('recipes')
            .where(selectionType, '==', selection)
            .get()
            .then((snapshot) => {
                let recipes = snapshot.docs
                    .map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return { id, ...data }
                    })
                setRecipes(recipes)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [route.params])

    const openFiltersModal = () => {
        filtersModalRef.current?.open();
    }

    const onResetFiltersPress = () => {
        setFilters({})
    }

    const onRemoveSortByFilter = () => {
        sortByFilterLast.current = null
        setFilters(f => f = {
            ...f,
            sortBy: null
        })
    }

    const onRemoveDatesFilter = () => {
        datesFilterLast.current = null
        setFilters(f => f = {
            ...f,
            dates: null
        })
    }

    const onSortByFilterChange = ({ value, label }) => {
        sortByFilterLast.current = { value, label }
    }

    const onDatesFilterChange = ({ value, label }) => {
        datesFilterLast.current = { value, label }
    }

    const onDatesFilterClose = () => {
        setFilters(f => f = {
            ...f,
            dates: datesFilterLast.current
        })
    }

    const onSortByFilterClose = () => {
        setFilters(f => f = {
            ...f,
            sortBy: sortByFilterLast.current
        })
    }

    const filterRecipes = () => {
        if (recipes.length < 1) {
            return []
        }

        const { sortBy, dates } = filters
        let out = JSON.parse(JSON.stringify(recipes))

        switch (sortBy?.value) {
            case 'fastest':
                out = out.sort((a, b) => a.duration - b.duration)
                break
            case 'newest':
                out = out.sort((a, b) => a.createdDate - b.createdDate)
                break
        }

        const today = new Date()
        switch (dates?.value) {
            case 'last_month':
                const monthAgo = new Date(today.getFullYear(), today.getMonth()-1, today.getDate())
                out = out.filter(r => getDateObject(r.createdDate) >= monthAgo)
                break
            case 'last_week':
                const weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7)
                out = out.filter(r => getDateObject(r.createdDate) >= weekAgo)
                break
            case 'last_day':
                const dayAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7)
                out = out.filter(r => getDateObject(r.createdDate) >= dayAgo)
                break
        }

        return out
    }

    const renderFiltersModalContent = useCallback(() => (
        <>
            <View style={styles.panelHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.headerText, { fontSize: FONT_SIZES.large, fontFamily: FONTS.bold }]}>Filtry</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={onResetFiltersPress}>
                    <Text style={[styles.headerText, { color: COLORS.red }]}>Reset</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.panel}>
                <View style={styles.filter}>
                    <View style={styles.filterRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.filterHeader} onPress={() => sortByPickerRef.current.open()}>
                                Seřadit podle:
                            </Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Picker
                                ref={sortByPickerRef}
                                item={null}
                                items={SORT_BY_FILTERS}
                                onItemChange={onSortByFilterChange}
                                title="Seřadit podle"
                                doneButtonLabel="Hotovo"
                                placeholder="Vybrat"
                                textInputStyle={{ fontFamily: FONTS.medium, color: COLORS.blue }}
                                isNullable={true}
                                style={{ height: normalize(20), fontFamily: FONTS.medium }}
                                onClose={onSortByFilterClose}
                            />
                        </View>
                    </View>
                    {filters?.sortBy &&
                        <EvilIcons.Button name="close" backgroundColor="white" color="#000" activeOpacity={1} onPress={onRemoveSortByFilter}>
                            <Text style={styles.filterValue} >
                                {filters.sortBy?.label}
                            </Text>
                        </EvilIcons.Button>
                    }
                </View>

                <View style={styles.filter}>
                    <View style={styles.filterRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.filterHeader} onPress={() => datesPickerRef.current.open()}>
                                Datum vytvoření:
                            </Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Picker
                                ref={datesPickerRef}
                                item={null}
                                items={DATE_FILTERS}
                                onItemChange={onDatesFilterChange}
                                title="Datum přidání"
                                doneButtonLabel="Hotovo"
                                placeholder="Vybrat"
                                textInputStyle={{ fontFamily: FONTS.medium, color: COLORS.blue }}
                                isNullable={true}
                                style={{ height: normalize(20), fontFamily: FONTS.medium }}
                                onClose={onDatesFilterClose}
                            />
                        </View>
                    </View>
                    {filters?.dates &&
                        <EvilIcons.Button name="close" backgroundColor="white" color="#000" activeOpacity={1} onPress={onRemoveDatesFilter}>
                            <Text style={styles.filterValue} >
                                {filters.dates?.label}
                            </Text>
                        </EvilIcons.Button>
                    }
                </View>
            </View>
        </>
    ))

    return (
        <>
            {recipes.length > 0 ? <FlatList
                data={filterRecipes()}
                renderItem={({ item }) => ListRecipe({ recipe: item, navigation })}
                keyExtractor={item => item.id}
            /> : !isLoading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} >
                    <Text style={{ fontFamily: FONTS.bold, color: COLORS.grey, position: 'absolute', top: layout.height * 0.20 }}>Žádné recepty...</Text>
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
                </View> : null}

            <Portal>
                <Modalize ref={filtersModalRef} adjustToContentHeight={true}>
                    {renderFiltersModalContent()}
                </Modalize>
            </Portal>

            {isLoading && <View style={styles.spinner}>
                <ActivityIndicator color='#000' size='large' />
            </View>}
        </>
    )
}

export default RecipesList

const styles = StyleSheet.create({
    panel: {
        padding: SPACING.medium
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
    },
    filterHeader: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.large
    },
    filterValue: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        color: COLORS.green
    }, 
    panelHeader: {
        paddingHorizontal: SPACING.medium,
        paddingVertical: SPACING.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.placeholder
    },
    headerText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium
    },
    filter: {
        paddingBottom: SPACING.large
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})