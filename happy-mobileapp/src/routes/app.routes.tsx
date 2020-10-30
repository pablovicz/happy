import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Button } from 'react-native';

import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetails from '../pages/OrphanageDetails';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import Header from '../components/header';
import OrphanageCreationDone from '../pages/CreateOrphanage/OrphanageCreationDone';
import OrphanageCreationDimiss from '../pages/CreateOrphanage/OrphanageCreationDimiss';
import SelectMapPositionInstruction from '../pages/CreateOrphanage/SelectMapPositionInstruction';
import Logout from '../pages/SignIn/Logout';



const AuthStack = createStackNavigator();

export default function AppRoutes() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#F2F3F5' },
            }}
        >

            <AuthStack.Screen
                name="OrphanagesMap"
                component={OrphanagesMap}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                }}
            />

            <AuthStack.Screen name="Logout" component={Logout} />

            <AuthStack.Screen
                name="OrphanageDetails"
                component={OrphanageDetails}
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />,
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />

            <AuthStack.Screen
                name="SelectMapPosition"
                component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />,
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />

            <AuthStack.Screen
                name="SelectMapPositionInstruction"
                component={SelectMapPositionInstruction}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />

            <AuthStack.Screen
                name="OrphanageData"
                component={OrphanageData}
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os dados" />,
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid

                }}
            />

            <AuthStack.Screen
                name="OrphanageCreationDone"
                component={OrphanageCreationDone}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />
            <AuthStack.Screen
                name="OrphanageCreationDimiss"
                component={OrphanageCreationDimiss}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />

        </AuthStack.Navigator>
    );
}
