import { Asset } from "expo-asset"
import * as SplashScreen from "expo-splash-screen"
import React, { useEffect, useMemo, useState } from "react"
import {
    Animated,
    StyleSheet,
    View,
} from "react-native"

import * as Font from 'expo-font'

const AnimatedAppLoader = ({ children, loggedIn }) => {
    const animation = useMemo(() => new Animated.Value(1), [])
    const [isAppReady, setAppReady] = useState(false)
    const [isSplashAnimationComplete, setAnimationComplete] = useState(
        false
    )

    useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true))
        }
    }, [isAppReady])

    const onImageLoaded = useMemo(() => async () => {
        try {            
            await Promise.all([
                //pre-load and cache assets
                Asset.loadAsync([
                    require('../assets/man.png'),
                    require('../assets/woman.png'),
                    require('../assets/icon.png'),
                    require('../assets/cuisines/asian.jpg'),
                    require('../assets/cuisines/czech.jpg'),
                    require('../assets/cuisines/indian.jpg'),
                    require('../assets/cuisines/mexican.jpg'),
                    require('../assets/cuisines/italian.jpg')
                ]),
                Font.loadAsync({
                    'MontserratAlternates-Bold': require('../assets/fonts/MontserratAlternates-Bold.ttf'),
                    'MontserratAlternates-Medium': require('../assets/fonts/MontserratAlternates-Medium.ttf'),
                    'MontserratAlternates-Light': require('../assets/fonts/MontserratAlternates-Light.ttf')
                }),
            ])

            await SplashScreen.hideAsync()
        } catch (e) {
            // handle errors
        } finally {
            setAppReady(true)
        }
    });

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: '#FFF',
                            opacity: animation,
                        },
                    ]}
                >
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={require('../assets/splash.png')}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}

export default AnimatedAppLoader