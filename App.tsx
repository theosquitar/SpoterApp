import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import OnboardingScreen1 from './src/screens/OnboardingScreen1';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { Easing } from 'react-native-reanimated';
import { TransitionSpecs } from '@react-navigation/stack';

export type UserData = {
  id: string;
  Dni: string;
  Nombre: string;
  FotoDni: string;
  Password: string;
};

export type RootStackParamList = {
  Loading: { user: UserData };
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  OnboardingScreen1: { user: UserData };
  OnboardingScreen2: { user: UserData };
  HomeScreen: { user: UserData };
  MapScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,  // Habilitar gestos
        }}
      >
        {/* Pantalla de bienvenida */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Login con la transición personalizada de absorción */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 700,
                  easing: Easing.out(Easing.circle),
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 500,
                  easing: Easing.out(Easing.circle),
                },
              },
            },
          }} 
        />

        {/* Pantalla de registro */}
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Loading con desabsorción */}
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
            transitionSpec: {
              open: TransitionSpecs.RevealFromBottomAndroidSpec,
              close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            },
          }}
        />

        {/* Onboarding con movimiento deslizante */}
        <Stack.Screen 
          name="OnboardingScreen1" 
          component={OnboardingScreen1} 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen 
          name="OnboardingScreen2" 
          component={OnboardingScreen2} 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        {/* Home y Mapa con transición por defecto */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
