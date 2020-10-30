import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text, Image } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../contexts/auth';
import LogoImg from '../../images/logo/map-marker.png';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [countWrongPassword, setCountWrongPassword] = useState(0);
    const { signed, signIn, location, errorMessage, errorAccept } = useAuth();


    console.log(signed);

    function handleSignIn() {

        signIn(email, password);
    }

    function handleShowPassword() {
        setHidePass(!hidePass);
    }

    function handleCloseErrorMessage() {

        errorMessage === "Senha inválida!" && setCountWrongPassword(countWrongPassword + 1);
        console.log(countWrongPassword);
        errorAccept();
    }

    function handleToForgotPassword() {
        alert('Um email foi enviado para resetar sua senha :)');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={LogoImg} />

            <View >
                <Text style={styles.appName}>happy</Text>
            </View>
            <View style={styles.loginContainer}>
                <TextInput
                    placeholder="Digite o seu email"
                    style={styles.inputEmail}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Digite a sua senha"
                        secureTextEntry={hidePass ? true : false}
                        style={styles.inputPassword}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.showPasswordButton} onPress={handleShowPassword}>
                        {hidePass ? (
                            <Feather style={styles.eye} name="eye-off" size={20} color="grey" />
                        ) : (
                                <Feather style={styles.eye} name="eye" size={20} color="grey" />
                            )

                        }
                    </TouchableOpacity>
                </View>
                {
                    errorMessage !== null && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                            <RectButton onPress={handleCloseErrorMessage}>
                                <Feather name="x" size={20} color="#FFF" />
                            </RectButton>

                        </View>

                    )
                }

                {
                    countWrongPassword > 2 && (
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText} onPress={handleToForgotPassword}>Esqueceu sua senha?</Text>
                            <RectButton onPress={() => { setCountWrongPassword(countWrongPassword - 1) }}>
                                <Feather name="x" size={20} color="#FFF" />
                            </RectButton>

                        </View>

                    )
                }


                <RectButton style={styles.loginButton} onPress={handleSignIn}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
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
};



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


    inputEmail: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        width: Dimensions.get('window').width - 80,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    inputPassword: {
        backgroundColor: '#fff',
        height: 56,
        borderRadius: 20,
        width: Dimensions.get('window').width - 130,
        paddingVertical: 18,
        paddingHorizontal: 24,
        textAlignVertical: 'top',
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
        textAlign: 'center'
    },

    stateName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center'

    },

    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    passwordContainer: {
        width: Dimensions.get('window').width - 80,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        flexDirection: 'row',
        alignContent: 'center'
    },

    eye: {
        padding: 16,
    },

    showPasswordButton: {
        justifyContent: 'center',
    },

    errorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF669D',

        marginTop: 15,
        width: Dimensions.get('window').width - 80,
        height: 40,
        borderRadius: 20,
        padding: 15

    },

    errorText: {

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#fff'
    },

    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF669D',

        marginTop: 15,
        width: Dimensions.get('window').width - 80,
        height: 40,
        borderRadius: 20,
        padding: 15

    },

    forgotPasswordText: {

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#fff'
    },



    loginButton: {
        backgroundColor: '#FFD666',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: 150,
        marginTop: 16,
    },

    loginButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }

});