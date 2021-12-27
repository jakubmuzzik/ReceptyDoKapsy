import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'

const AppInfo = () => {

    return (
        <View style={styles.container}>
            <Text style={[styles.header, {paddingBottom: SPACING.xx_large}]}>
                Aplikace byla vytvořena v rámci semestrálního projektu předmětu Internetové technologie.
            </Text>
            <Text style={[styles.body, {paddingBottom: SPACING.medium}]}>
                Tvůrci:
            </Text>
            <Text style={styles.body}>
                Jakub Mužík
            </Text>
            <Text style={styles.body}>
                Ondřej Procházka
            </Text>
            <Text style={styles.body}>
                Dominik Truksa
            </Text>
            <Text style={[styles.body, {paddingBottom: SPACING.medium}]}>
                Petr Hošek
            </Text>

            <Text style={styles.footer}>
                ČZU
            </Text>
            <Text style={styles.footer}>
                2021
            </Text>
        </View>
    )
}

export default AppInfo

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: SPACING.medium,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.large,
    },
    body: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.medium,
    },
    footer: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
    }
})