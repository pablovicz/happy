import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Intro from '../pages/Intro';
import Splash from '../pages/Splash';
import OnboardingFirst from '../pages/Onboarding/OnboardingFirst';
import OnboardingSecond from '../pages/Onboarding/OnboardingSecond';
import SignIn from '../pages/SignIn/SignIn';
import RegisterUser from '../pages/CreateUser/RegisterUser';
import Header from '../components/header';
import OrphanageCreationDone from '../pages/CreateOrphanage/OrphanageCreationDone';
import UserRegisterDimiss from '../pages/CreateUser/UserRegisterDimiss';
import UserRegisterDone from '../pages/CreateUser/UserRegisterDone';



const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#F2F3F5' },
            }}
        >
            <AuthStack.Screen
                name="Intro"
                component={Intro}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />

            <AuthStack.Screen
                name="Splash"
                component={Splash}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />

            <AuthStack.Screen
                name="OnboardingFirst"
                component={OnboardingFirst}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                }}

            />

            <AuthStack.Screen
                name="OnboardingSecond"
                component={OnboardingSecond}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <AuthStack.Screen
                name="RegisterUser"
                component={RegisterUser}
                options={{
                    header: () => <Header title="Cadastro" />,
                    headerShown: true,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />

            <AuthStack.Screen
                name="UserRegisterDone"
                component={UserRegisterDone}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />
            <AuthStack.Screen
                name="OrphanageCreationDimiss"
                component={UserRegisterDimiss}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                }}
            />



            <AuthStack.Screen name="SignIn" component={SignIn} />


        </AuthStack.Navigator>
    );
}

