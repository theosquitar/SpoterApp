import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, UserData } from '../../App';

type OnboardingScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen2'>;
type OnboardingScreen2RouteProp = RouteProp<RootStackParamList, 'OnboardingScreen2'>;

const OnboardingScreen2 = () => {
  const navigation = useNavigation<OnboardingScreen2NavigationProp>();
  const route = useRoute<OnboardingScreen2RouteProp>();
  const user: UserData | undefined = route.params?.user;

  useEffect(() => {
    if (!user) {
      Alert.alert('Error', 'No se pudo obtener la información del usuario.');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Imagen del auto */}
      <Image source={require('../../assets/yara.png')} style={styles.image} />

      {/* Texto superior con ícono de carga */}
      <Text style={styles.chargeText}>⚡ La mejor App de Estacionamiento</Text>

      {/* Texto principal */}
      <Text style={styles.title}>
        Todos <Text style={{ color: '#00FF00' }}>🚗</Text> buscan un lugar y un lugar los busca a todos
      </Text>

      {/* Contenedor de botones */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={() => navigation.navigate('OnboardingScreen1', { user })}>
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate('OnboardingScreen2', { user })}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250, // Ajustar tamaño de la imagen
    height: 250,
    marginBottom: 40,
  },
  chargeText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40, // Ajustado para menor distancia entre texto y botones
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30, // Mueve los botones más cerca del cuerpo principal
  },
  button: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 2,
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10, // Para Android
    marginHorizontal: 10, // Separación entre los botones
  },
  skipButton: {
    backgroundColor: '#fff',
    borderColor: '#FFFFFF', // Borde blanco
    shadowColor: '#FFFFFF', // Luz blanca para el botón blanco
  },
  nextButton: {
    backgroundColor: '#5A4FFF',
    borderColor: '#5A4FFF', // Borde morado
    shadowColor: '#5A4FFF', // Luz morada para el botón morado
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen2;
