import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import mapMarker from '../images/logo/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../contexts/auth';
import api from '../services/api';

interface Orphanage {
    id: string,
    name: string,
    latitude: number,
    longitude: number
}


export default function OrphanagesMap() {
    const navigation = useNavigation();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    const { signOut, user, location } = useAuth();



    useFocusEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    });

    function handleNavigateToOrphanageDetails(id: string) {
        navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    function handleSignOut() {
        signOut();
    }


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location?.latitude as number,
                    longitude: location?.longitude as number,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >

                {
                    orphanages.map(orphanage => {

                        return (
                            <Marker
                                key={orphanage.id}
                                icon={mapMarker}
                                calloutAnchor={{
                                    x: 2.7,
                                    y: 0.8,
                                }}
                                coordinate={{
                                    latitude: orphanage.latitude,
                                    longitude: orphanage.longitude,
                                }}
                            >
                                <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                                    <View style={styles.calloutContainer}>
                                        <Text style={styles.calloutText}>{orphanage.name}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        );

                    })
                }

            </MapView>

            <View style={styles.header}>
                <RectButton style={styles.logoutButton} onPress={handleSignOut}>
                    <Feather name="log-out" size={20} color="#BD0404" />
                </RectButton>
            </View>

            <View style={styles.footer}>

                <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>



        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 40,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        color: '#0089A5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        color: '#8FA7B3',
        fontFamily: 'Nunito_700Bold',
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15C5D6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        position: 'absolute',
        right: 24,
        top: 32,


        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },

    logoutButton: {
        width: 56,
        height: 56,
        backgroundColor: '#FF669D',
        opacity: 0.95,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    }



});