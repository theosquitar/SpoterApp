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
        <View style={styles.textAndIconContainer}>
          <View>
            <Text style={styles.zoneTitle}>Estacionamiento</Text>
            <Text style={styles.zone}>{estacionamiento?.nombre || 'A-013'}</Text>
          </View>
          <Image source={require('../../assets/location.png')} style={styles.mapIcon} />
        </View>
      </View>

      <TouchableOpacity style={styles.trackButton} onPress={onCancel}>
        <Text style={styles.trackButtonText}>Cancelar Viaje</Text>
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
    padding: 15,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Sombra para Android
  },
  textAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  zoneTitle: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '300',
  },
  zone: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  mapIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  trackButton: {
    backgroundColor: '#FFD54F', // Amarillo claro
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Texto negro
  },
});

export default TrackStopModal;
