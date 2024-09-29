import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import OnboardingScreen1 from './src/screens/OnboardingScreen1';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

// Definimos el tipo de rutas y parámetros
export type RootStackParamList = {
  Loading: undefined;
  OnboardingScreen1: undefined;
  OnboardingScreen2: undefined;
  HomeScreen: undefined;
  MapScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,  // No mostrar el encabezado en todas las pantallas
          gestureEnabled: true, // Permitir gestos para volver
          cardOverlayEnabled: true, // Habilitar una superposición durante la transición
        }}
      >
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen} 
          options={{ 
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, // Desvanecimiento suave para pantallas de carga
          }} 
        />
        <Stack.Screen 
          name="OnboardingScreen1" 
          component={OnboardingScreen1} 
          options={{ 
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizante lateral
          }} 
        />
        <Stack.Screen 
          name="OnboardingScreen2" 
          component={OnboardingScreen2} 
          options={{ 
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizante lateral
          }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ 
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizante lateral
          }} 
        />
        <Stack.Screen 
          name="MapScreen" 
          component={MapScreen} 
          options={{ 
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizante lateral
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
