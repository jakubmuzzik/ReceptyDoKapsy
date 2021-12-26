import React, { useRef, useCallback, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { connect } from 'react-redux'
import { Avatar, Divider, Button } from 'react-native-elements'
import { normalize, getDate } from '../utils'
import { FONTS, FONT_SIZES, COLORS, SPACING } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import * as ImagePicker from 'expo-image-picker'
import { saveProfile } from '../redux/actions'
import { ActivityIndicator } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Profile = ({ currentUser, navigation, saveProfile }) => {
    const [isSaving, setIsSaving] = useState(false)

    const editPhotoSheetRef = useRef()

    const headerHeight = useHeaderHeight()
    const insets = useSafeAreaInsets()

    const onEditPhotoPress = () => {
        editPhotoSheetRef.current.open()
    }

    const onPersonalDetailsPress = () => {
        navigation.navigate('PersonalDetails')
    }

    const onAppSettingsPress = () => {
        navigation.navigate('AppSettings')
    }

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
                editPhotoSheetRef.current.close()
                setIsSaving(true)
                await saveProfile({ ...currentUser, profilePhotoUri: result.uri })
                setIsSaving(false)
                showToast('Profilová fotka byla aktualizována.')
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
                editPhotoSheetRef.current.close()
                setIsSaving(true)
                await saveProfile({ ...currentUser, profilePhotoUri: result.uri })
                setIsSaving(false)
                showToast('Profilová fotka byla aktualizována.')
            } catch (e) {
                console.error(e)
            }
        }
    }

    const renderEditPhotoSheetContent = useCallback(() => (
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
        <View style={{ 
            flex: 1, 
            flexDirection: 'center', 
            alignItems: 'center', 
            marginTop: headerHeight,
            paddingHorizontal: SPACING.small
        }}>
            {isSaving ? <Avatar
                ImageComponent={() => 
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey', height: normalize(80)}}>
                        <ActivityIndicator color='#000' />
                    </View>}
                rounded
                size={normalize(80)}
            /> : <Avatar
                rounded
                source={
                    currentUser?.profilePhoto ?
                        { uri: currentUser.profilePhoto } : require('../assets/man.png')
                }
                size={normalize(80)}
                onPress={onEditPhotoPress}
            />}
            <Text onPress={onEditPhotoPress} style={styles.editProfilePhotoText}>Upravit profilový obrázek</Text>
            <Divider orientation="vertical" width={2} style={{marginVertical: SPACING.small}}/>
            <View style={styles.userInfoSection}>
                <Text style={{fontFamily: FONTS.bold, fontSize: FONT_SIZES.large, color: '#FFF'}}>{currentUser.name}</Text>
                <Text style={{fontFamily: FONTS.light, paddingVertical: SPACING.xx_small, color: '#FFF'}}>
                    Registrován: {getDate(currentUser.createdDate, false, true)}
                </Text>
                <Text style={{fontFamily: FONTS.light, color: '#FFF'}}>
                    Vytvořeno receptů: {currentUser.createdRecipes.length}
                </Text>
            </View>

            <View style={styles.scrollableContent}>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                >
                    <Text onPress={onPersonalDetailsPress} style={styles.listItem}>
                        Osobní údaje
                    </Text>
                    <Text onPress={onAppSettingsPress} style={styles.listItem}>
                        Nastavení aplikace
                    </Text>
                </ScrollView>
                <View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => firebase.auth().signOut()}>
                        <MaterialIcons name="logout" size={24} color={COLORS.red} />
                        <Text style={{ fontFamily: FONTS.medium, color: COLORS.red, paddingLeft: SPACING.xx_small }}>Odhlásit se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Portal>
                <Modalize ref={editPhotoSheetRef} adjustToContentHeight={true}>
                    {renderEditPhotoSheetContent()}
                </Modalize>
            </Portal>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, { saveProfile })(Profile)

const styles = StyleSheet.create({
    editProfilePhotoText: {
        textDecorationLine: 'underline',
        fontFamily: FONTS.medium,
        color: COLORS.blue,
        paddingTop: SPACING.small
    },
    userInfoSection: {
        backgroundColor: COLORS.blue,
        width: '100%',
        padding: SPACING.small,
        borderRadius: SPACING.x_small
    },
    scrollableContent: {
        flex:1,
        padding: SPACING.small,
        width:'100%'
    },
    listItem: {
        fontFamily: FONTS.medium, 
        color: COLORS.blue, 
        fontSize: FONT_SIZES.medium,
        paddingVertical: SPACING.xx_small
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
})