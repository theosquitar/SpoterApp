import React from 'react';
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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
