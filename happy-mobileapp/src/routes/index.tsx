import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAuth } from '../contexts/auth';



export default function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }
    console.log(signed);

    return signed ? <AppRoutes /> : <AuthRoutes />;
}