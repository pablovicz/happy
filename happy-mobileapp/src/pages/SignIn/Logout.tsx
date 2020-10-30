import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';


import { useAuth } from '../../contexts/auth';


export default function Logout() {

    const { signOut, user } = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <View style={styles.container}>
            <Text>{user?.name}</Text>
            <Button title="Log out" onPress={handleSignOut} />
        </View>
    );
};



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});