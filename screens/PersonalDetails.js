import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { connect } from 'react-redux'
import { saveProfile } from '../redux/actions'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { user } from '../redux/reducers/user'

const PersonalDetails = ({ currentUser, saveProfile, navigation }) => {
    const [userData, setUserData] = useState(currentUser)
    const [showErrorMessages, setShowErrorMessages] = useState(false)

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
    }, [])

    const onSavePress = () => {
        console.log(userData.name)
        if (!userData.name || userData.length < 1) {
            console.log('empry')
            setShowErrorMessages(true)
            return
        }
        //saveProfile(userData)
        //navigation.goBack()
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
})