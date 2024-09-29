import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const LoginScreen = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      // Consulta Firestore para verificar el DNI y la contraseña
      const q = query(
        collection(db, 'Cliente'),
        where('Dni', '==', dni),
        where('Password', '==', password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Usuario encontrado
        const userDoc = querySnapshot.docs[0]; // El primer documento coincidente
        const userData = userDoc.data();

        console.log('Usuario autenticado: ', userData);
        navigation.navigate('Loading'); // Navegar al Loading Screen después del login
      } else {
        // Si no se encuentra el usuario
        Alert.alert('Error', 'DNI o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión: ', error);
      Alert.alert('Error', 'Hubo un problema durante el inicio de sesión. Inténtalo nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        style={styles.input}
        keyboardType="numeric"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
