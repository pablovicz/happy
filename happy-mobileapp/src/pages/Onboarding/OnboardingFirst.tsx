import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';


import OnboardImage from '../../images/onboard-first/onboard-first-image.png';
import OnboardFooter from '../../components/OnboardFooter';


export default function OrboardingFirst() {

    const navigation = useNavigation();

    function handleNextOnboardingPage() {
        navigation.navigate('OnboardingSecond');
    }

    return (
        <View style={styles.container}>

            <View style={styles.ImageContainer}>
                <Image style={styles.OnboardImage} source={OnboardImage} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Leve felicidade para o mundo</Text>
                <Text style={styles.subtitleText}>Visite orfanatos e mude o dia de muitas crianças</Text>
            </View>
            <View style={styles.footer}>
                <OnboardFooter page={1} />
            </View>


        </View>

    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 40,

        backgroundColor: '#FFFFFF',
    },

    ImageContainer: {
        height: 279,
        paddingTop: 20,

        alignItems: 'center',
    },

    OnboardImage: {
        width: 257,
        height: 279
    },

    textContainer: {
        height: 324,

        paddingTop: 15,
        marginBottom: 80,

    },

    titleText: {
        height: 250,
        width: 217,

        textAlign: 'left',

        color: '#0089A5',
        fontSize: 42,
        fontFamily: 'Nunito_800ExtraBold',
    },

    subtitleText: {
        height: 60,
        width: 234,


        textAlign: 'left',

        color: '#0089A5',
        fontSize: 20,
        fontFamily: 'Nunito_600SemiBold',
    },

    footer: {
        position: 'absolute',
        bottom: -10,
        right: 40,
        left: 40
    }





});

