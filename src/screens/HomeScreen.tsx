import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, UserData } from '../../App';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Asegúrate de tener Firebase configurado correctamente

// Definir el tipo de navegación para esta pantalla
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  // Obtener el usuario del payload
  const user: UserData | undefined = route.params?.user;

  const [selectedVehicle, setSelectedVehicle] = useState<string>('Auto');
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false); // Para controlar el estado de enfoque del input
  const animatedValue = new Animated.Value(1); // Valor para la animación de hover

  // Animación de hover para el input
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1.1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Función para obtener los primeros dos nombres
  const getFirstTwoNames = (fullName: string): string => {
    const namesArray = fullName.split(' ');
    return namesArray.slice(0, 2).join(' ');
  };

  // Función para guardar los datos en Firebase
  const handleSaveVehicle = async () => {
    if (user && plateNumber.length <= 6) {
      try {
        await setDoc(doc(db, 'Cliente', user.id, 'Vehiculo', 'Detalles'), {
          tipoVehiculo: selectedVehicle,
          placa: plateNumber,
        });
        Alert.alert('Éxito', 'Vehículo registrado correctamente.');
        navigation.navigate('MapScreen'); // Navegar a la pantalla de mapa
      } catch (error) {
        console.error('Error al guardar los datos: ', error);
        Alert.alert('Error', 'No se pudo guardar el vehículo.');
      }
    } else {
      Alert.alert('Error', 'Por favor ingrese una placa válida (máximo 6 caracteres).');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con el nombre del usuario */}
      <View style={styles.header}>
        <Image source={{ uri: user?.FotoDni }} style={styles.avatar} />
        <Text style={styles.greetingText}>
          {`Hola, ${user ? getFirstTwoNames(user.Nombre) : 'Usuario'}`}
        </Text>
        <TouchableOpacity style={styles.locationButton}>
          <Image source={require('../../assets/location.png')} style={styles.locationIcon} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Facilita el</Text>
        <Text style={styles.titleBold}>Estacionarte</Text>
      </View>

      {/* Selección del tipo de vehículo */}
      <View style={styles.vehicleSelectionContainer}>
        <TouchableOpacity
          style={[styles.vehicleOption, selectedVehicle === 'Auto' && styles.selectedVehicle]}
          onPress={() => setSelectedVehicle('Auto')}
        >
          <Image source={require('../../assets/car-icon.png')} style={styles.vehicleIcon} />
          <Text style={[styles.vehicleText, selectedVehicle === 'Auto' && styles.selectedVehicleText]}>Auto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.vehicleOption, selectedVehicle === 'Moto' && styles.selectedVehicle]}
          onPress={() => setSelectedVehicle('Moto')}
        >
          <Image source={require('../../assets/ñoto.jpg')} style={styles.vehicleIcon} />
          <Text style={[styles.vehicleText, selectedVehicle === 'Moto' && styles.selectedVehicleText]}>Moto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.vehicleOption, selectedVehicle === 'Camioneta' && styles.selectedVehicle]}
          onPress={() => setSelectedVehicle('Camioneta')}
        >
          <Image source={require('../../assets/estacionado.png')} style={styles.vehicleIcon} />
          <Text style={[styles.vehicleText, selectedVehicle === 'Camioneta' && styles.selectedVehicleText]}>Camioneta</Text>
        </TouchableOpacity>
      </View>

      {/* Campo para la placa con animación */}
      <Animated.View style={[styles.inputContainer, { transform: [{ scale: animatedValue }] }]}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          placeholder="Ingrese la placa del vehículo"
          value={plateNumber}
          onChangeText={(text) => setPlateNumber(text.slice(0, 6))} // Limitar la placa a 6 caracteres
          maxLength={6}
          onFocus={handleFocus} // Llamar la función cuando el input recibe foco
          onBlur={handleBlur}   // Llamar la función cuando el input pierde foco
        />
      </Animated.View>

      {/* Imagen del vehículo con botón para guardar */}
      <View style={styles.carContainer}>
        <Image source={require('../../assets/estacionado.png')} style={styles.carImage} />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveVehicle}
        >
          <Text style={styles.saveButtonText}>Añade tu {selectedVehicle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greetingText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    opacity: 0.7,
  },
  locationButton: {
    marginLeft: 'auto',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
  },
  titleBold: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  vehicleSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  vehicleOption: {
    backgroundColor: '#333',
    borderRadius: 20,
    width: '30%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  selectedVehicle: {
    backgroundColor: '#FFD700',
  },
  vehicleIcon: {
    width: 40,
    height: 40,
  },
  vehicleText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  selectedVehicleText: {
    color: '#000',
  },
  inputContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  inputFocused: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  carContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  carImage: {
    width: 280,
    height: 200,
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default HomeScreen;
