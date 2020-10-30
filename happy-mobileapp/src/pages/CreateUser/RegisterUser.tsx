import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import LogoImg from '../../images/logo/map-marker.png';
import { useAuth } from '../../contexts/auth';


export default function RegisterUser() {
    const [name, setName] = useState('');
    const [wrongName, setWrongName] = useState(false);
    const [email, setEmail] = useState('');
    const [wrongEmail, setWrongEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);

    const { signed, signIn, register } = useAuth();

    const navigation = useNavigation();

    async function handleUserCreation() {

        (name === '' || name.length < 3) && setWrongName(true);
        (email.split('@').length >= 2) ? setWrongEmail(false) : setWrongEmail(true);
        (password === passwordConfirmation) ? setInvalidPassword(false) : setInvalidPassword(true);

        const response = await register(name, email, password);

        console.log(response);
        navigation.navigate('SignIn');
    }

    function handleShowPassword() {

        setHidePass(!hidePass);
    }

    function handleShowPasswordConfirmation() {

        setHidePassConfirm(!hidePassConfirm);
    }

    function handleCloseNameWrongMessage() {
        setName('');
        setWrongName(false);
    }

    function handleCloseEmailWrongMessage() {

        setEmail('');
        setWrongEmail(false);
    }

    function handleCloseInvalidPasswordMessage() {

        setPassword('');
        setPasswordConfirmation('');
        setInvalidPassword(false);
    }

    return (

        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={LogoImg} />
                <Text style={styles.imageText}>Olá! Seja muito bem vindx!</Text>

            </View>

            <View style={styles.userInfoContainer}>
                <TextInput
                    placeholder="Digite o seu nome completo"
                    style={styles.inputName}
                    value={name}
                    onChangeText={text => setName(text)}
                />
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Confirme a sua senha"
                        secureTextEntry={hidePassConfirm ? true : false}
                        style={styles.inputPassword}
                        value={passwordConfirmation}
                        onChangeText={text => setPasswordConfirmation(text)}
                    />
                    <TouchableOpacity style={styles.showPasswordButton} onPress={handleShowPasswordConfirmation}>
                        {hidePassConfirm ? (
                            <Feather style={styles.eye} name="eye-off" size={20} color="grey" />
                        ) : (
                                <Feather style={styles.eye} name="eye" size={20} color="grey" />
                            )

                        }
                    </TouchableOpacity>
                </View>
            </View>
            {
                wrongName && (
                    <View style={styles.erroContainer}>
                        <Text style={styles.erroMessage}>O nome inserido não é válido!</Text>
                        <RectButton onPress={handleCloseNameWrongMessage}>
                            <Feather name="x" size={20} color="#FFF" />
                        </RectButton>

                    </View>
                )
                // mensagens de problemas
            }
            {
                wrongEmail && (
                    <View style={styles.erroContainer}>
                        <Text style={styles.erroMessage}>O email formecido não é válido!</Text>
                        <RectButton onPress={handleCloseEmailWrongMessage}>
                            <Feather name="x" size={20} color="#FFF" />
                        </RectButton>

                    </View>
                )
                // mensagens de problemas
            }
            {
                invalidPassword && (
                    <View style={styles.erroContainer}>
                        <Text style={styles.erroMessage}>As senhas não conferem!</Text>
                        <RectButton onPress={handleCloseInvalidPasswordMessage}>
                            <Feather name="x" size={20} color="#FFF" />
                        </RectButton>

                    </View>
                )
            }

            <RectButton style={styles.createAccountButton} onPress={handleUserCreation}>
                <Text style={styles.createAccountButtonText}>Cadastrar</Text>
            </RectButton>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        height: 88,
        width: 76,

        marginRight: 20
    },

    imageText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 25,
        color: '#fff',

        width: Dimensions.get('window').width - 80 - 96,
    },

    userInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    inputName: {
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

    inputEmail: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        width: Dimensions.get('window').width - 80,
        paddingVertical: 18,
        paddingHorizontal: 24,
        textAlignVertical: 'top',
    },

    passwordContainer: {
        width: Dimensions.get('window').width - 80,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 15
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

    eye: {
        padding: 16,
    },

    showPasswordButton: {
        justifyContent: 'center',
    },

    erroContainer: {
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

    erroMessage: {

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#fff'
    },


    createAccountButton: {
        backgroundColor: '#FFD666',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: 150,
        marginTop: 16,
    },

    createAccountButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#15C3D6',
    }

});