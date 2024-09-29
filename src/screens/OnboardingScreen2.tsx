import React, { useEffect } from 'react';
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
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
  },
});

export default OnboardingScreen2;
