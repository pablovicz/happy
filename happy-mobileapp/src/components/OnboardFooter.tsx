import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import CarRollFirst from '../images/onboard-first/Carro.png';
import CarRollSecond from '../images/onboard-second/Carro.png';

interface FooterProps {
    page: number;
}


export default function OnboardFooter({ page }: FooterProps) {

    const navigation = useNavigation();

    function handleToNextOnboardingPage() {
        navigation.navigate('OnboardingSecond');
    }

    function handleToOrphanagesMap() {
        navigation.navigate('SignIn');


    }


    return (

        <View style={styles.Container}>
            { page === 1 ?
                (
                    <View style={styles.RoolPageContainer}>
                        <Image style={styles.CarRoll} source={CarRollFirst} />
                        <RectButton style={styles.NextOnboardButton} onPress={handleToNextOnboardingPage}>
                            <Feather name="arrow-right" size={25} color="#15B6D6" />
                        </RectButton>
                    </View>
                ) : (
                    <View style={styles.RoolPageContainer}>
                        <Image style={styles.CarRoll} source={CarRollSecond} />
                        <RectButton style={styles.NextOnboardButton} onPress={handleToOrphanagesMap}>
                            <Feather name="arrow-right" size={25} color="#15B6D6" />
                        </RectButton>
                    </View>
                )
            }

        </View>


    );
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
    },

    CarRoll: {
        width: 30,
        height: 4
    },

    RoolPageContainer: {

        flexDirection: 'row',

        width: Dimensions.get('window').width - 80,

        marginTop: 25,
        marginBottom: 25,

        justifyContent: 'space-between',
        alignItems: 'center'

    },

    NextOnboardButton: {

        width: 56,
        height: 56,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#D1EDF2',

    }

});