import React, { useState, useEffect } from 'react';
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
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://img.wattpad.com/cover/265935822-256-k301491.jpg' }} style={styles.avatar} />
        <Text style={styles.greeting}>Hola, Osquitar</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Image source={require('../../assets/location.png')} style={styles.locationIcon} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
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
          <Text style={[styles.vehicleText, selectedVehicle === 'Camioneta' && styles.selectedVehicleText]}>Camioneta</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen del vehículo con botón */}
      <View style={styles.carContainer}>
        <Image source={require('../../assets/estacionado.png')} style={styles.carImage} />
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('MapScreen')} // Navegamos al mapa cuando se presiona el botón
        >
          <Text style={styles.startButtonText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  // Fondo negro
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
  greeting: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    opacity: 0.7,  // Hacemos el texto más transparente
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
    marginTop: 20, // Ajustamos el margen
  },
  title: {
    color: '#fff',
    fontSize: 28, // Reducimos ligeramente el tamaño del texto
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
    backgroundColor: '#FFD700',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 20,  // Ajustamos la posición para que esté justo encima del coche
  },
  startButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default HomeScreen;
