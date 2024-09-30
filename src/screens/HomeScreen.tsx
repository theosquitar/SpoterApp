import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';  // Asegúrate de tener el stack correcto

// Definir el tipo de navegación para esta pantalla
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MapScreen'  // Cambiamos 'HomeScreen' por 'MapScreen' para que navegue al mapa
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Estado para manejar el vehículo seleccionado
  const [selectedVehicle, setSelectedVehicle] = useState('Auto');

  // Cambiar el texto del botón según el vehículo seleccionado
  const getButtonText = () => {
    switch (selectedVehicle) {
      case 'Auto':
        return 'Empieza si tienes un auto';
      case 'Moto':
        return 'Empieza si tienes una moto';
      case 'Camioneta':
        return 'Empieza si tienes una camioneta';
      default:
        return 'Empezar';
=======
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
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://img.wattpad.com/cover/265935822-256-k301491.jpg' }} style={styles.avatar} />
        <Text style={styles.greeting}>Hola, Osquitar</Text>
=======
      {/* Header con el nombre del usuario */}
      <View style={styles.header}>
        <Image source={{ uri: user?.FotoDni }} style={styles.avatar} />
        <Text style={styles.greetingText}>
          {`Hola, ${user ? getFirstTwoNames(user.Nombre) : 'Usuario'}`}
        </Text>
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
        <TouchableOpacity style={styles.locationButton}>
          <Image source={require('../../assets/location.png')} style={styles.locationIcon} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
<<<<<<< HEAD
        <Text style={styles.title}>Has facil el</Text>
        <Text style={styles.titleBold}>Estacionar</Text>
      </View>

      {/* Selección de vehículo */}
      <View style={styles.vehicleSelectionContainer}>
        <TouchableOpacity 
          style={[styles.vehicleOption, selectedVehicle === 'Auto' && styles.selectedVehicle]}
          onPress={() => setSelectedVehicle('Auto')}>
          <Image source={require('../../assets/car-icon.png')} style={styles.vehicleIcon} />
          <Text style={[styles.vehicleText, selectedVehicle === 'Auto' && styles.selectedVehicleText]}>Auto</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.vehicleOption, selectedVehicle === 'Moto' && styles.selectedVehicle]}
          onPress={() => setSelectedVehicle('Moto')}>
          <Image source={require('../../assets/car-icon.png')} style={styles.vehicleIcon} />
          <Text style={[styles.vehicleText, selectedVehicle === 'Moto' && styles.selectedVehicleText]}>Moto</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.vehicleOption, selectedVehicle === 'Camioneta' && styles.selectedVehicle]}
          onPress={() => setSelectedVehicle('Camioneta')}>
          <Image source={require('../../assets/car-icon.png')} style={styles.vehicleIcon} />
=======
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
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
          <Text style={[styles.vehicleText, selectedVehicle === 'Camioneta' && styles.selectedVehicleText]}>Camioneta</Text>
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
      {/* Imagen del vehículo con botón */}
      <View style={styles.carContainer}>
        <Image source={require('../../assets/estacionado.png')} style={styles.carImage} />
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('MapScreen')} // Navegamos al mapa cuando se presiona el botón
        >
          <Text style={styles.startButtonText}>{getButtonText()}</Text>
=======
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
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#000',  // Fondo negro
=======
    backgroundColor: '#000',
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
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
<<<<<<< HEAD
  greeting: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    opacity: 0.7,  // Hacemos el texto más transparente
=======
  greetingText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    opacity: 0.7,
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
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
<<<<<<< HEAD
    marginTop: 20, // Ajustamos el margen
  },
  title: {
    color: '#fff',
    fontSize: 28, // Reducimos ligeramente el tamaño del texto
=======
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
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
<<<<<<< HEAD
  carContainer: {
    alignItems: 'center',
    justifyContent: 'center',  // Alinea verticalmente la imagen y el botón
    marginTop: 20, // Reducimos el margen superior
  },
  carImage: {
    width: 280,  // Aumentamos el tamaño de la imagen
    height: 200,
    resizeMode: 'contain',  // Asegura que la imagen no se recorte
  },
  startButton: {
=======
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
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
    backgroundColor: '#FFD700',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    position: 'absolute',
<<<<<<< HEAD
    bottom: 20,  // Ajustamos la posición para que esté justo encima del coche
  },
  startButtonText: {
=======
    bottom: 20,
  },
  saveButtonText: {
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
    color: '#000',
    fontSize: 16,
  },
});

export default HomeScreen;
