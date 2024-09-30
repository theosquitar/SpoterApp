import React, { useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

// Definir el tipo de navegación para esta pantalla
type OnboardingScreen2NavigationProp = StackNavigationProp<
  RootStackParamList,
  'OnboardingScreen2'
>;

const OnboardingScreen2 = () => {
  const navigation = useNavigation<OnboardingScreen2NavigationProp>();

  // Animación de entrada
  const translateY = useSharedValue(500); // Empieza fuera de la pantalla

  useEffect(() => {
    // Animación suave hacia la posición original
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  // Estilo animado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, styles.animatedContainer]}>
        <Image source={require('../../assets/car1.png')} style={styles.image} />
        <Text style={styles.title}>Cargando</Text>
        <Text style={styles.text}>Vamos a vivir una experiencia impresionante 🔋</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.skipButtonContainer}>
              <Text style={styles.skipButton}>Atras</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.nextButtonContainer}>
              <Text style={styles.nextButton}>Safo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
=======
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

      {/* Texto superior con ícono de estacionamiento */}
      <Text style={styles.chargeText}>⚡ La mejor App de Estacionamiento</Text>

      {/* Texto principal */}
      <Text style={styles.title}>
        Todos <Text style={{ color: '#FF0000' }}>🚗</Text> buscan un lugar y un lugar los busca a todos
      </Text>

      {/* Contenedor de botones */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={() => navigation.navigate('OnboardingScreen1', { user })}>
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate('HomeScreen', { user })}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#1C1C1E', // Fondo oscuro
=======
    backgroundColor: '#1C1C1E',
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
<<<<<<< HEAD
  animatedContainer: {
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 30,
    borderRadius: 200,
  },
  title: {
    color: '#FFD700',
    fontSize: 34, // Tamaño mayor para el título
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 22, // Tamaño mayor para el texto
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    width: '80%',
  },
  skipButtonContainer: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  nextButtonContainer: {
    backgroundColor: '#7B68EE',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  skipButton: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextButton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
=======
  image: {
    width: 280, // Ajustar tamaño de la imagen
    height: 280,
    marginBottom: 20,
  },
  chargeText: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    color: '#fff',
    fontSize: 18,
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
    paddingVertical: 20,
    paddingHorizontal: 40,
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
    fontSize: 16,
    fontWeight: '600',
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
  },
});

export default OnboardingScreen2;
