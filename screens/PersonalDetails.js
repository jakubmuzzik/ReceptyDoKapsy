import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { connect } from 'react-redux'
import { saveProfile } from '../redux/actions'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import Toast from 'react-native-root-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'

const PersonalDetails = ({ currentUser, saveProfile, navigation }) => {
    const [userData, setUserData] = useState(currentUser)
    const [isLoading, setIsLoading] = useState(false)
    const [showErrorMessages, setShowErrorMessages] = useState(false)

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
    }, [userData])

    const showToast = (message, variant) => {
        Toast.show(<Text style={{ fontFamily: FONTS.medium }}>
            {message}
        </Text>, {
            duration: 2500,
            position: Toast.positions.TOP + insets.top,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            opacity: 0.9,
            backgroundColor: variant === 'error' ? COLORS.error : COLORS.darkestBlue
        })
    }

    const onSavePress = async () => {
        if (!userData.name || userData.name.length < 1) {
            setShowErrorMessages(true)
            return
        }

        try {
            setIsLoading(true)
            await saveProfile(userData)
            showToast('Profil byl aktualizován.')
        } catch(e) {
            console.error(e)
            showToast('Při ukládání profilu se vyskytla chyba.', 'error')
        } finally {
            setIsLoading(false)
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Jméno"
                leftIcon={
                    <AntDesign
                        name="user"
                        size={20}
                        color={COLORS.black}
                    />
                }
                label='Jméno'
                inputStyle={styles.input}
                labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
                containerStyle={styles.input_wrapper}
                renderErrorMessage={false}
                inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !userData.name) ? COLORS.error : 'black' }]}
                onChangeText={(val) => setUserData({ ...userData, name: val })}
                value={userData.name}
            />
            {!userData.name && showErrorMessages ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.error_message}>Jméno nemůže být prázdné</Text>
                </Animatable.View> : null
            }
            {isLoading && <View style={styles.spinner}>
                <ActivityIndicator color='#000' size='large' />
            </View>}
         </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, { saveProfile })(PersonalDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: SPACING.small 
    },
    input: {
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.medium,
    },
    input_wrapper: {
        paddingHorizontal: 0,
        marginTop: SPACING.medium
    },
    input_container: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,
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
    error_message: {
        fontFamily: FONTS.light,
        color: '#FF0000',
        fontSize: FONT_SIZES.x_small,
        marginTop: SPACING.xx_small
    },
})