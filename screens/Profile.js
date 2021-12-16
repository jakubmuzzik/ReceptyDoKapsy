import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { connect } from 'react-redux'
import { Avatar, Divider } from 'react-native-elements'
import { normalize, getDate } from '../utils'
import { FONTS, FONT_SIZES, COLORS, SPACING } from '../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

const Profile = ({ currentUser, navigation }) => {
    const headerHeight = useHeaderHeight()
    const insets = useSafeAreaInsets()

    const onEditPhotoPress = () => {
        
    }

    const onPersonalDetailsPress = () => {
        navigation.navigate('PersonalDetails')
    }

    const onAppSettingsPress = () => {
        navigation.navigate('AppSettings')
    }

    return (
        <View style={{ 
            flex: 1, 
            flexDirection: 'center', 
            alignItems: 'center', 
            marginTop: headerHeight,
            paddingHorizontal: SPACING.small
        }}>
            <Avatar
                rounded
                source={
                    currentUser?.profilePhoto ?
                        { uri: props.currentUser.profilePhoto } : require('../assets/man.png')
                }
                size={normalize(80)}
            />
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
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps)(Profile)

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
    }
})