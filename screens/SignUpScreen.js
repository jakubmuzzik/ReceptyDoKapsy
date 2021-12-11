import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    SafeAreaView
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Entypo } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { normalize } from '../utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { firebase } from '../firebase/config'

import { FONTS, COLORS, FONT_SIZES, SPACING } from '../constants'

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isEmailCorrect: false,
        isNameCorrect: false,
        isPasswordCorrect: false,
        isConfirmPasswordCorrect: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        buttonLoading: false
    })
    const [showErrorMessages, setShowErrorMessages] = useState(false)

    const onNameChange = val => {
        setData({
            ...data,
            name: val,
            isNameCorrect: val.length > 0 ? true : false
        })
    }

    const onEmailChange = val => {
        setData({
            ...data,
            email: val,
            isEmailCorrect: val.length > 0 ? true : false
        })
    }

    const onPasswordChange = val => {
        setData({
            ...data,
            password: val,
            isPasswordCorrect: val.length > 7 ? true : false
        })
    }

    const onConfirmPasswordChange = val => {
        setData({
            ...data,
            confirmPassword: val,
            isConfirmPasswordCorrect: val.length > 7 ? true : false
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        })
    }

    const onClickSignUp = () => {
        if (!data.isEmailCorrect || !data.isNameCorrect || !data.isPasswordCorrect) {
            setShowErrorMessages(true)
            return
        }

        if (data.password !== data.confirmPassword) {
            Alert.alert('Provided passwords do not match.')
            return
        }

        setData({
            ...data,
            buttonLoading: true
        })

        const { email, name, password } = data

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                firebase.firestore().collection('users')
                    .doc(response.user.uid)
                    .set({
                        id: response.user.uid,
                        name,
                        email,
                        createdDate: new Date()
                    })
                    .catch((error) => {
                        Alert.alert(error)
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!')
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!')
                }
            })
            .finally(() => {
                setData({
                    ...data,
                    buttonLoading: false
                })
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={['#61E2FE', '#5A79E8']}
                style={styles.container}
            >
                <KeyboardAwareScrollView style={{ overflow: 'visible' }}>
                    <SafeAreaView>
                        <View style={styles.header}>
                            <Text style={styles.text_header}>Create an account</Text>
                        </View>

                        <Animatable.View
                            animation="fadeInUpBig"
                            style={styles.content}
                        >
                            <Input
                                placeholder="Full name"
                                leftIcon={
                                    <AntDesign
                                        name="user"
                                        size={20}
                                        color={COLORS.black}
                                    />
                                }
                                rightIcon={data.isNameCorrect ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <AntDesign name="checkcircleo" size={20} color="green" />
                                    </Animatable.View>
                                    : null
                                }
                                label='Full name'
                                inputStyle={[styles.input, { color: '#FFF' }]}
                                labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
                                containerStyle={{ paddingHorizontal: 0 }}
                                renderErrorMessage={false}
                                inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !data.isNameCorrect) ? COLORS.error: 'black'}]}
                                onChangeText={onNameChange}
                            />
                            {!data.isNameCorrect && showErrorMessages ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.error_message}>Enter your Name</Text>
                                </Animatable.View> : null
                            }

                            <Input
                                placeholder="Email"
                                leftIcon={
                                    <AntDesign
                                        name="user"
                                        size={20}
                                        color={COLORS.black}
                                    />
                                }
                                rightIcon={data.isEmailCorrect ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <AntDesign name="checkcircleo" size={20} color="green" />
                                    </Animatable.View>
                                    : null
                                }
                                label='Email'
                                inputStyle={[styles.input, { color: '#FFF' }]}
                                labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
                                containerStyle={styles.input_wrapper}
                                inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !data.isEmailCorrect) ? COLORS.error: 'black'}]}
                                renderErrorMessage={false}
                                onChangeText={onEmailChange}
                            />
                            {!data.isEmailCorrect && showErrorMessages ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.error_message}>Enter your Email</Text>
                                </Animatable.View> : null
                            }

                            <Input
                                placeholder="Type Password"
                                leftIcon={
                                    <AntDesign
                                        name="lock"
                                        size={20}
                                        color={COLORS.black}
                                    />
                                }
                                rightIcon={
                                    <TouchableOpacity onPress={updateSecureTextEntry}>
                                        {data.secureTextEntry ?
                                            <Entypo name="eye-with-line" size={20} color={COLORS.black} />
                                            :
                                            <Entypo name="eye" size={20} color={COLORS.black} />
                                        }
                                    </TouchableOpacity>
                                }
                                label='Password'
                                inputStyle={[styles.input, { color: '#FFF' }]}
                                labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
                                containerStyle={styles.input_wrapper}
                                inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !data.isPasswordCorrect) ? COLORS.error: 'black'}]}
                                renderErrorMessage={false}
                                secureTextEntry={data.secureTextEntry ? true : false}
                                onChangeText={onPasswordChange}
                            />
                            {!data.isPasswordCorrect && showErrorMessages ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.error_message}>Password must be at least 8 characters long</Text>
                                </Animatable.View> : null
                            }

                            <Input
                                placeholder="Confirm Your Password"
                                leftIcon={
                                    <AntDesign
                                        name="lock"
                                        size={20}
                                        color={COLORS.black}
                                    />
                                }
                                rightIcon={
                                    <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                                        {data.confirmSecureTextEntry ?
                                            <Entypo name="eye-with-line" size={20} color={COLORS.black} />
                                            :
                                            <Entypo name="eye" size={20} color={COLORS.black} />
                                        }
                                    </TouchableOpacity>
                                }
                                label='Confirm Password'
                                inputStyle={[styles.input, { color: '#FFF' }]}
                                labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
                                containerStyle={styles.input_wrapper}
                                inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !data.isConfirmPasswordCorrect) ? COLORS.error: 'black'}]}
                                renderErrorMessage={false}
                                secureTextEntry={data.confirmSecureTextEntry ? true : false}
                                onChangeText={onConfirmPasswordChange}
                            />
                            {!data.isConfirmPasswordCorrect && showErrorMessages ?
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.error_message}>Password must be at least 8 characters long</Text>
                                </Animatable.View>
                                : null
                            }


                            <View style={styles.button_wrapper}>
                                <Button
                                    buttonStyle={styles.button}
                                    titleStyle={{ fontFamily: FONTS.bold }}
                                    title="Sign Up"
                                    loading={data.buttonLoading}
                                    onPress={onClickSignUp}
                                />
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.footer_text}>
                                    Already have an account?
                                </Text>
                                <Text
                                    style={[styles.footer_text, { color: '#FFF', paddingHorizontal: 5, paddingVertical: 10 }]}
                                    onPress={() => { navigation.navigate('SignInScreen') }}
                                >
                                    Sign In
                                </Text>
                            </View>
                        </Animatable.View>
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SPACING.large
    },
    header: {
        justifyContent: 'flex-end',
        paddingTop: normalize(50),
        paddingBottom: SPACING.xx_large
    },
    content: {
        paddingVertical: SPACING.xx_large
    },
    text_header: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SPACING.xxx_large,
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
    button_wrapper: {
        marginTop: SPACING.xxx_large,
        shadowColor: COLORS.green,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4.65,

        elevation: 8,
    },
    button: {
        backgroundColor: COLORS.green,
        height: SPACING.button,
        borderRadius: SPACING.medium,
    },
    footer: {
        paddingTop: SPACING.large,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    footer_text: {
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZES.x_small,
        color: COLORS.black
    },
    error_message: {
        fontFamily: FONTS.light,
        color: '#FF0000',
        fontSize: FONT_SIZES.x_small,
        marginTop: SPACING.xx_small
    },
})