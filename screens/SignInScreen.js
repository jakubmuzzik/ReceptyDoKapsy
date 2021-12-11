import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  KeyboardAvoidingView
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { normalize } from '../utils'

import { firebase } from '../firebase/config'

import { FONTS, COLORS, FONT_SIZES, SPACING } from '../constants'

const SignInScreen = ({ navigation }) => {
  const { width: windowWidth } = useWindowDimensions()

  const [data, setData] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    buttonLoading: false
  })
  const [showErrorMessages, setShowErrorMessages] = useState(false)

  const onEmailChange = val => {
    setData({
      ...data,
      email: val
    })
  }

  const onPasswordChange = val => {
    setData({
      ...data,
      password: val
    })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const onClickLogin = () => {
    if (!data.email || !data.password) {
      setShowErrorMessages(true)
      return
    }

    setData({
      ...data,
      buttonLoading: true
    })

    const { email, password } = data

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        Alert.alert(error.message)
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
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={normalize(-100, 'height')}
        >
          <Animatable.View style={styles.header} animation="fadeInDownBig">
            <Image
              resizeMode='contain'
              source={require('../assets/icon.png')}
              style={{ width: windowWidth * 0.5 }}
            />
          </Animatable.View>

          <Animatable.View
            animation="fadeInUpBig"
            style={styles.content}
          >
            <Input
              placeholder="Email"
              leftIcon={
                <AntDesign
                  name="user"
                  size={20}
                  color={COLORS.black}
                />
              }
              label='Email'
              inputStyle={[styles.input, { color: '#FFF' }]}
              labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
              containerStyle={{ paddingHorizontal: 0 }}
              renderErrorMessage={false}
              inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !data.email) ? COLORS.error : 'black' }]}
              onChangeText={val => onEmailChange(val)}
              placeholderTextColor={COLORS.placeholder}
            />
            {
              showErrorMessages && !data.email ?
                <Animatable.Text animation="bounceInLeft" style={styles.errorMessage}>Enter Email</Animatable.Text>
                :
                null
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
                    <Entypo name="eye-with-line" size={20} color="#05375a" />
                    :
                    <Entypo name="eye" size={20} color="#05375a" />
                  }
                </TouchableOpacity>
              }
              label='Password'
              inputStyle={[styles.input, { color: '#FFF' }]}
              labelStyle={[styles.input, { fontSize: FONT_SIZES.large }]}
              containerStyle={styles.input_wrapper}
              inputContainerStyle={[styles.input_container, { borderBottomColor: (showErrorMessages && !data.password) ? COLORS.error : 'black' }]}
              renderErrorMessage={false}
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={val => onPasswordChange(val)}
              placeholderTextColor={COLORS.placeholder}
            />
            {
              showErrorMessages && !data.password ?
                <Animatable.Text animation="bounceInLeft" style={styles.errorMessage}>Enter Password</Animatable.Text>
                :
                null
            }

            <View style={{ alignItems: 'flex-end', paddingTop: 5 }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={{
                color: '#fff',
                paddingHorizontal: 5,
                paddingVertical: 10,
                fontFamily: FONTS.medium,
                fontSize: FONT_SIZES.x_small
              }}
                onPress={() => navigation.navigate('SignUpScreen')}
              > Forgot Password?</Text>
            </View>

            <View style={styles.button_wrapper}>
              <Button
                buttonStyle={styles.button}
                titleStyle={{ fontFamily: FONTS.bold }}
                title="Sign In"
                loading={data.buttonLoading}
                onPress={onClickLogin}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>
                Don't have an account?
              </Text>
              <Text
                style={[styles.footer_text, { color: '#FFF', paddingHorizontal: 5, paddingVertical: 10 }]}
                onPress={() => { navigation.navigate('SignUpScreen') }}
              >
                Sign Up
              </Text>
            </View>

          </Animatable.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )

}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.large
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 3
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
  errorMessage: {
    fontFamily: FONTS.medium,
    color: COLORS.error,
    fontSize: FONT_SIZES.x_small,
    paddingTop: SPACING.x_small
  },
})