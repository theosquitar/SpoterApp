import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface FloatingWindowProps {
  zone: string;
  address: string;
  onCancel: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ zone, address, onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <Text style={styles.title}>Estás yendo a:</Text>
        <Text style={styles.zone}>Zona: {zone}</Text>
        <Text style={styles.address}>Dirección: {address}</Text>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar viaje</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  window: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  zone: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  address: {
    fontSize: 14,
    marginBottom: 15,
    color: '#666',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FloatingWindow;
