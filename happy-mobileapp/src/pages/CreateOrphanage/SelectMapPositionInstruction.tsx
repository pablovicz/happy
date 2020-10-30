import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

import PointerImg from '../../images/pointer-instruction/pointer-instruction-logo.png';


export default function SelectMapPositionInstruction() {

    const navigation = useNavigation();

    function handleToSelectMapPosition() {
        navigation.navigate('SelectMapPosition');
    }

    return (

        <View style={styles.container}>




            <View style={styles.mapContainer}>
                <MapView
                    initialRegion={{
                        latitude: -25.4253475,
                        longitude: -49.2674245,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    style={styles.mapStyle}
                />
            </View>

            <TouchableOpacity style={styles.instructionsContainer} onPress={handleToSelectMapPosition}>
                <Image style={styles.pointer} source={PointerImg} />
                <Text style={styles.instructionText}>Toque no mapa para adicionar um orfanato</Text>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 40,
    },

    mapContainer: {

    },

    instructionsContainer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 40,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#15C3D6',

        opacity: 0.78
    },

    pointer: {

        height: 100,
        width: 67,

        paddingBottom: 34
    },

    instructionText: {
        width: 203,
        height: 150,

        textAlign: 'center',

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 24,
        color: '#FFFFFF',

        paddingBottom: 10
    }

});