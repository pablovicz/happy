import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import LogoImg from '../images/logo/map-marker.png';
import { useAuth } from '../contexts/auth';

export default function Splash() {

    const navigation = useNavigation();

    const [hideSplash, setHideSplash] = useState(false);
    const [skipOnboarding, setSkipOnboarding] = useState(false);

    const { location } = useAuth();

    useEffect(() => {
        // !skipOnboarding && (
        //     setTimeout(() => {
        //     setHideSplash(true);
        // }, 10000))

    }, []);

    useEffect(() => {
        hideSplash && navigation.navigate('OnboardingFirst');
    }, [hideSplash]);

    function handleToLoginPage() {

        setSkipOnboarding(true);
        navigation.navigate('SignIn');
    }


    function handleToRegisterUserPage() {
        setSkipOnboarding(true);
        navigation.navigate('RegisterUser');
    }



    return (

        <View style={styles.container}>

            <Image style={styles.image} source={LogoImg} />

            <View style={styles.titleContainer}>
                <Text style={styles.appName}>happy</Text>
            </View>
            <View style={styles.actionsContainer}>
                <RectButton style={styles.loginButton} onPress={handleToLoginPage}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </RectButton>
                <RectButton style={styles.signInButton} onPress={handleToRegisterUserPage}>
                    <Text style={styles.signInButtonText}>Cadastrar</Text>
                </RectButton>
            </View>

            <View style={styles.locationContainer}>
                <Feather style={styles.locationIcon} name="map-pin" size={30} color="#FFF" />
                <View>
                    <Text style={styles.cityName}>{location?.city}</Text>
                    <Text style={styles.stateName}>{location?.state}</Text>
                </View>

            </View>

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

    imageContainer: {
        justifyContent: 'center',
    },

    image: {
        height: 88,
        width: 76,

    },

    appName: {
        color: '#FFFFFF',
        fontSize: 47,
        fontFamily: 'Nunito_800ExtraBold',
    },

    titleContainer: {

    },

    actionsContainer: {
        paddingTop: 40
    },

    loginButton: {
        backgroundColor: '#D1EDF2',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: 200,
        marginTop: 16,
    },

    loginButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#15C3D6',
    },


    signInButton: {
        backgroundColor: '#FFD666',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: 200,
        marginTop: 16,
    },

    signInButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#15C3D6',
    },


    locationContainer: {
        marginTop: 100,
        flexDirection: "row",
        alignItems: 'center',
    },

    locationIcon: {
        marginRight: 10
    },

    cityName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },

    stateName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Nunito_600SemiBold',

    },


});