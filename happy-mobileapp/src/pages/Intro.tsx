import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import LogoImg from '../images/logo/map-marker.png';
import { useAuth } from '../contexts/auth'

export default function Intro() {

    const navigation = useNavigation();

    const [hideIntro, setHideIntro] = React.useState(false);

    const { signed } = useAuth();

    React.useEffect(() => {
        setTimeout(() => {
            setHideIntro(true);
        }, 3000);
    }, []);

    React.useEffect(() => {

        signed ? hideIntro && navigation.navigate('SignIn') : hideIntro && navigation.navigate('Splash');

    }, [hideIntro]);

    return (

        <View style={styles.container} >

            <Image style={styles.image} source={LogoImg} />

            <ActivityIndicator size="large" color='#FFD666' />


        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 40,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#15C3D6',
    },

    image: {
        height: 140,
        width: 120.9,

        marginBottom: 50
    }
});
