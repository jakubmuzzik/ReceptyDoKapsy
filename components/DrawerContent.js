import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Drawer, Card } from 'react-native-paper'
import { Avatar, Divider } from 'react-native-elements'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { MaterialIcons, Fontisto, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { firebase } from '../firebase/config'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { normalize } from '../utils'
import { COLORS, FONTS, SPACING } from '../constants'

import { connect } from 'react-redux'

const DrawerContent = (props) => {
    const { navigation } = props
    const insets = useSafeAreaInsets()

    const onNavigateToProfilePress = () => {
        navigation.navigate('MainTabNavigation', {
            screen: 'ProfileStack',
            params: {
                screen: 'Profile'
            },
        })
    }

    const onSearchPress = () => {

    }

    const onCalendarPress = () => {

    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <Drawer.Section>
                    <TouchableWithoutFeedback onPress={onNavigateToProfilePress}>
                        <View style={styles.userInfoSection}>
                            <Card.Title
                                style={styles.card}
                                title={props.currentUser?.name}
                                titleStyle={{ fontFamily: FONTS.bold, paddingLeft: 10 }}
                                subtitle={props.currentUser?.email}
                                subtitleStyle={{ fontFamily: FONTS.light, paddingLeft: 10 }}
                                left={() => 
                                    <Avatar
                                        rounded
                                        source={
                                            props.currentUser?.profilePhoto ? 
                                            { uri: props.currentUser.profilePhoto } : require('../assets/man.png')
                                        }
                                        onPress={onNavigateToProfilePress}
                                        size={normalize(50)}
                                    />
                                }
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Drawer.Section>

                <Drawer.Section>
                    <DrawerItem
                        icon={() => (
                            <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />
                        )}
                        label={() => <Text style={{ fontFamily: FONTS.medium }}>Kategorie receptů</Text>}
                        onPress={onSearchPress}
                    />
                    <DrawerItem
                        icon={() => (
                            <MaterialCommunityIcons name="playlist-check" size={24} color="black" />
                        )}
                        label={() => <Text style={{ fontFamily: FONTS.medium }}>Moje recepty</Text>}
                        onPress={onCalendarPress}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>


            <Drawer.Section style={[styles.bottomDrawerSection, { paddingBottom: insets.bottom }]}>
                <DrawerItem
                    icon={() => (
                        <MaterialIcons name="logout" size={24} color={COLORS.red} />
                    )}
                    label={() => <Text style={{ fontFamily: FONTS.medium, color: COLORS.red }}>Odhlásit se</Text>}
                    onPress={() => firebase.auth().signOut()}
                />
            </Drawer.Section>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps)(DrawerContent)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: normalize(18),
    },
    card: {
        paddingLeft: 0,
        flex: 1,
        flexDirection: 'row',
        marginTop: SPACING.x_small
    },
    bottomDrawerSection: {
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
})