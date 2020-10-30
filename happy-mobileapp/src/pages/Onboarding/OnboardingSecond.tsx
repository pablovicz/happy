import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import ImageOnboard from '../../images/onboard-second/onboard-second-image.png';
import OnboardFooter from '../../components/OnboardFooter';

export default function OrboardingFirst() {

    const navigation = useNavigation();

    function handleToOrphanageMapPage() {

        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>

            <Image style={styles.ImageContainer} source={ImageOnboard} />

            <Text style={styles.TextContainer}>Escolha um orfanato no mapa e faça uma visita</Text>

            <View style={styles.footer}>
                <OnboardFooter page={2} />
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

        backgroundColor: '#FFFFFF'
    },

    ImageContainer: {
        width: 295,
        height: 427,

        marginTop: 45,
        paddingTop: 20,


    },

    TextContainer: {
        height: 130,
        width: 300,

        paddingTop: 15,
        marginBottom: 90,

        textAlign: 'right',

        color: '#0089A5',
        fontSize: 30,
        fontFamily: 'Nunito_800ExtraBold',
    },

    footer: {
        position: 'absolute',
        bottom: -10,
        right: 40,
        left: 40,

    }






});

