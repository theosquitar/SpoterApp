import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Estacionamiento {
  id: string;
  nombre: string;
  direccion: string;
  coordenadaX: number;
  coordenadaY: number;
}

interface TrackStopModalProps {
  visible: boolean;
  estacionamiento: Estacionamiento | null;
  onCancel: () => void;
}

const TrackStopModal: React.FC<TrackStopModalProps> = ({ visible, estacionamiento, onCancel }) => {
  if (!visible || !estacionamiento) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.zoneTitle}>Zona</Text>
        <Text style={styles.zone}>{estacionamiento?.nombre}</Text>
        <View style={styles.mapIconContainer}>
          <Image source={require('../../assets/location.png')} style={styles.mapIcon} />
        </View>
      </View>

      <TouchableOpacity style={styles.trackButton} onPress={onCancel}>
        <Text style={styles.trackButtonText}>Canelar Viaje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  zoneTitle: {
    fontSize: 14,
    color: '#999',
  },
  zone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  mapIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    width: 50,
    height: 50,
  },
  trackButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TrackStopModal;
