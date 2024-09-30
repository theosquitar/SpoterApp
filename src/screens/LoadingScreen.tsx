import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, UserData } from '../../App';

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;

type LoadingScreenRouteProp = RouteProp<RootStackParamList, 'Loading'>;

const LoadingScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const route = useRoute<LoadingScreenRouteProp>(); // Obtenemos los parámetros de la ruta
  const user: UserData | undefined = route.params?.user; // Accedemos al usuario autenticado

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        // Navegamos a OnboardingScreen1 con los datos del usuario
        navigation.navigate('OnboardingScreen1', { user });
      }, 4000); // Simula un tiempo de carga de 4 segundos
    } else {
      Alert.alert('Error', 'No se pudo obtener la información del usuario.');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={2000}
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
    backgroundColor: '#000',
  },
  pulseEffect: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    color: '#0B235E',
  },
});

export default LoadingScreen;
