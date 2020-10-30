import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function UserRegisterDimiss() {

    const navigation = useNavigation();

    function handleOrphaneCreationDimiss() {

        navigation.navigate('Splash');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.DimissLogo} >
                <Feather name="x" size={36} color="#FF669D" />
            </TouchableOpacity>

            <Text style={styles.TitleContainer}>Cancelar cadastro</Text>

            <Text style={styles.SubtitleContainer}>Tem certeza que quer cancelar seu cadastro?</Text>

            <View style={styles.OptionsContainer}>
                <RectButton style={styles.NoButton} onPress={navigation.goBack}>
                    <Text style={styles.ButtonText}>Não</Text>
                </RectButton>
                <RectButton style={styles.YesButton} onPress={handleOrphaneCreationDimiss}>
                    <Text style={styles.ButtonText}>Sim</Text>
                </RectButton>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FF669D',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    DimissLogo: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 5,

        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    TitleContainer: {

        marginBottom: 5,

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 32,
        color: '#FFF',
    },

    SubtitleContainer: {
        width: 213,
        height: 60,
        marginBottom: 5,

        textAlign: 'center',

        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        color: '#FFF',
    },

    OptionsContainer: {

        flexDirection: 'row',

    },

    YesButton: {
        width: 128,
        height: 56,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',

        marginLeft: 8,

        backgroundColor: '#D6487B',
    },

    NoButton: {
        width: 128,
        height: 56,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#D6487B',
        opacity: 0.8
    },

    ButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 15,
        color: '#FFF',
        opacity: 1
    }


});