import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export type UserData = {
  id: string;
  Dni: string;
  Nombre: string;
  FotoDni: string;
  Password: string;
};

const LoginScreen = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const imageAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de la imagen de entrada
    Animated.timing(imageAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, 'Cliente'),
        where('Dni', '==', dni),
        where('Password', '==', password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const userPayload: UserData = {
          id: userDoc.id,
          Dni: userData.Dni,
          Nombre: userData.Nombre,
          FotoDni: userData.FotoDni,
          Password: userData.Password,
        };

        navigation.navigate('Loading', { user: userPayload });
      } else {
        alert('DNI o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión: ', error);
      alert('Hubo un problema durante el inicio de sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.imageContainer, opacity: imageAnimation }}>
        <Image source={require('../../assets/spoter.png')} style={styles.image} />
      </Animated.View>

      <Text style={styles.title}>Bienvenido a Spotter App</Text>

      <TextInput
        placeholder="Introduce tu Dni"
        value={dni}
        onChangeText={setDni}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          No tienes cuenta ?{' '}
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            Registrate aqui!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFE',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 1,
  },
  button: {
    backgroundColor: '#5563F7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotText: {
    color: '#B0B3C7',
    fontSize: 14,
  },
  registerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  registerText: {
    color: '#333',
    fontSize: 14,
  },
  registerLink: {
    color: '#5563F7',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
