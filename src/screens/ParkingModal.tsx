import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Estacionamiento {
  id: string;
  nombre: string;
  direccion: string;
  coordenadaX: number;
  coordenadaY: number;
  price?: string; // Hacer que price sea opcional
}

interface ParkingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  estacionamiento: Estacionamiento | null;
}

const ParkingModal: React.FC<ParkingModalProps> = ({ visible, onClose, onConfirm, estacionamiento }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image
            source={require('../../assets/arrow-left.png')} 
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        
        <View style={styles.modalContent}>
          <Text style={styles.title}>Book your car</Text>
          <View style={styles.card}>
            <Text style={styles.zone}>Zona</Text>
            <Text style={styles.zoneInfo}>{estacionamiento?.nombre}</Text>
            <Image 
              source={require('../../assets/estacionado.png')}
              style={styles.parkingImage}
            />
            <Text style={styles.timeSlot}>Tiempo por hora</Text>
            <Text style={styles.price}>{estacionamiento?.price || 'N/A'}/hora</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>Ir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  modalContent: {
    backgroundColor: '#1D1D1D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2D2D2D',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  zone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  zoneInfo: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  parkingImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  timeSlot: {
    fontSize: 16,
    color: '#A9A9A9',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default ParkingModal;
