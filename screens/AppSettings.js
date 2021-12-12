import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { Switch } from 'react-native-paper'
import { connect } from 'react-redux'
import { changeAppSettings } from '../redux/actions'

const AppSettings = ({ appSettings, changeAppSettings }) => {
    const onSwitchChange = (name) => {
        changeAppSettings(name, !appSettings[name])
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', paddingTop:SPACING.x_large, alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.heading}>Zobrazovat notifikace</Text>
                <Switch value={appSettings?.showNotifications} onValueChange={() => onSwitchChange('showNotifications')} color={COLORS.turquoise} />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    appSettings: store.appState.appSettings
})

export default connect(mapStateToProps, { changeAppSettings })(AppSettings)

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: SPACING.small 
    },
    heading: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.medium,
    },
})