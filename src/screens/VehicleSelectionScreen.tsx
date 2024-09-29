import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const VehicleSelectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Made easy Parking</Text>

      <Animatable.View animation="bounceIn" delay={300}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../../assets/splash.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Car</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="bounceIn" delay={600}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../../assets/splash.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Bike</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="bounceIn" delay={900}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../../assets/splash.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Bus</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B235E',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#0B235E',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default VehicleSelectionScreen;
