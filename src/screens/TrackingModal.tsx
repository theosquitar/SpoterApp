import React from 'react';
<<<<<<< HEAD
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface TrackingModalProps {
  visible: boolean;
  onClose: () => void;
  onProceed?: () => void;
  message: string;
}

const TrackingModal: React.FC<TrackingModalProps> = ({ visible, onClose, onProceed, message }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>{message}</Text>
          {onProceed && (
            <TouchableOpacity style={styles.button} onPress={onProceed}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
=======
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
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
  );
};

const styles = StyleSheet.create({
  modalContainer: {
<<<<<<< HEAD
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#2D2D2D',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  messageText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default TrackingModal;
=======
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
>>>>>>> 2e4868ce7457dc0e4d43ccce64f2cc6c75bdc2b2
