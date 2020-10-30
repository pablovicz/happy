import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStrorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import * as auth from '../services/auth';
import * as reg from '../services/register';
import api from '../services/api'


import { LocationObject } from 'expo-location';


interface User {
    name: string;
    email: string;
}

interface Location {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
}


interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    location: Location | null;
    errorMessage: string | null;
    errorAccept(): void;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
    register(name: string, email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {

        async function getUserLocation() {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                console.log('localizacao não permitida');
                const userLocation = {
                    latitude: -25.4253475,
                    longitude: -49.2674245,
                    city: "Curitiba",
                    state: "Paraná"
                } as Location;

                setLocation(userLocation);
            }

            let location = await Location.getCurrentPositionAsync({});

            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;

            let geoLocation = await Location.reverseGeocodeAsync(
                {
                    latitude: latitude,
                    longitude: longitude
                });

            console.log(geoLocation);

            const userCity = geoLocation[0].subregion;
            const userState = geoLocation[0].region;

            var userLocation = {
                latitude: latitude,
                longitude: longitude,
                city: userCity,
                state: userState,
            } as Location;

            setLocation(userLocation);
        }


        async function loadStoragedData() {
            const storagedUser = await AsyncStrorage.getItem('@Happy:user');
            const storagedToken = await AsyncStrorage.getItem('@Happy:token');

            if (storagedToken && storagedUser) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }

        getUserLocation();

        loadStoragedData();

    }, []);

    async function signIn(email: string, password: string) {

        console.log(`o email é ${email} e a senha é ${password}`);

        try {

            const response = await auth.signIn(email.toLowerCase(), password);

            console.log(response);

            setUser(response.user);

            const token = response.token.split(' ')[1];

            if (token) {

                api.defaults.headers['Authorization'] = `Bearer ${token}`;
            } else {

                api.defaults.headers['Authorization'] = `Bearer `;
            }

            console.log(response);

            await AsyncStrorage.multiSet([
                ['@Happy:user', JSON.stringify(response.user)],
                ['@Happy:token', response.token]
            ]);

        } catch (error) {

            console.log('entrou cahtch')
            console.log(error.response.data.error);
            setErrorMessage(error.response.data.error);
        }


    }


    function errorAccept() {

        setErrorMessage(null)
    }




    function signOut() {
        AsyncStrorage.clear().then(() => {
            setUser(null);
        });

    }

    async function register(name: string, email: string, password: string) {


        const response = await reg.register(name, email.toLowerCase(), password);

        console.log(`user criado ${response}`);

    }

    return (
        <AuthContext.Provider value={{
            signed:
                !!user,
            user,
            loading,
            signIn,
            signOut,
            register,
            location,
            errorMessage,
            errorAccept
        }}>
            {children}
        </AuthContext.Provider>

    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};

export default AuthContext;