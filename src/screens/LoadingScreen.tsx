import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';  // Importamos el stack

// Definir el tipo de navegación para esta pantalla
type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;

const LoadingScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnboardingScreen1');
    }, 4000); // Simula un tiempo de carga de 4 segundos
  }, []);

  return (
    <View style={styles.container}>
      {/* Efecto de parpadeo */}
      <Animatable.View
  animation="pulse"   // Usa una animación predefinida
  iterationCount="infinite"  // Se repite indefinidamente
  duration={2000}      // Ciclo completo de 2 segundos
  style={styles.pulseEffect}
>
  <View style={styles.circle}>
    <Image
      source={require('../../assets/spoter.png')}
      style={styles.image}
    />
    <Text style={styles.logoText}>Spotter App</Text>
  </View>
</Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Fondo completamente negro
  },
  pulseEffect: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Fondo negro
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,  // Círculo perfecto
    backgroundColor: '#fff',  // Círculo blanco
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',  // Sombra suave alrededor
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },  // Sombra centrada
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,  // Espacio entre la imagen y el texto
  },
  logoText: {
    fontSize: 24,
    color: '#0B235E',  // Color azul oscuro
  },
});

export default LoadingScreen;
