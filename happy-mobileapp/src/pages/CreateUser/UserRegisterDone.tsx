import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import ObaImage from '../../images/oba-logo/oba-logo.png';


export default function UserRegisterDone() {

    const navigation = useNavigation();

    function handleToSignIn() {
        navigation.navigate('SignIn');
    }


    return (
        <View style={styles.container}>
            <Image style={styles.ImageContainer} source={ObaImage} />
            <Text style={styles.EbaText}>Ebaaa!</Text>
            <Text style={styles.NoteText}>O cadastro deu certo!</Text>
            <RectButton style={styles.okButton} onPress={handleToSignIn}>
                <Text style={styles.okButtonText}>OK</Text>
            </RectButton>

        </View>
    );



};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#39CC83',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingBottom: 25.88
    },

    ImageContainer: {
        width: 250,
        height: 306,
        paddingLeft: Dimensions.get('window').width / 2.5,
    },

    EbaText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 40,
        color: '#FFFFFF',
        paddingBottom: 20,
        paddingTop: 20
    },

    NoteText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        color: '#FFFFFF',
    },

    okButton: {
        backgroundColor: '#19C06D',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: 120,
        marginTop: 32,
    },

    okButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }

});