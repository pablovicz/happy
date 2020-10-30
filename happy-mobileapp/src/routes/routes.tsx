import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';


import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetails from '../pages/OrphanageDetails';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import Header from '../components/header';
import OrphanageCreationDone from '../pages/CreateOrphanage/OrphanageCreationDone';
import OrphanageCreationDimiss from '../pages/CreateOrphanage/OrphanageCreationDimiss';
import SelectMapPositionInstruction from '../pages/CreateOrphanage/SelectMapPositionInstruction';
import OnboardingFirst from '../pages/Onboarding/OnboardingFirst';
import OnboardingSecond from '../pages/Onboarding/OnboardingSecond';
import Intro from '../pages/Intro';
import Splash from '../pages/Splash';

const { Navigator, Screen } = createStackNavigator();


export default function Routes() {

    return (
        <NavigationContainer>

            <Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#F2F3F5' },
                }}
            >
                <Screen
                    name="Intro"
                    component={Intro}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                    }}
                />

                <Screen
                    name="Splash"
                    component={Splash}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }}
                />

                <Screen
                    name="OnboardingFirst"
                    component={OnboardingFirst}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }}

                />

                <Screen
                    name="OnboardingSecond"
                    component={OnboardingSecond}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }}
                />

                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }}
                />

                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />,
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />,
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                    }}
                />

                <Screen
                    name="SelectMapPositionInstruction"
                    component={SelectMapPositionInstruction}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                    }}
                />

                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />,
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid

                    }}
                />

                <Screen
                    name="OrphanageCreationDone"
                    component={OrphanageCreationDone}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                    }}
                />
                <Screen
                    name="OrphanageCreationDimiss"
                    component={OrphanageCreationDimiss}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                    }}
                />

            </Navigator>
        </NavigationContainer>

    );

}



