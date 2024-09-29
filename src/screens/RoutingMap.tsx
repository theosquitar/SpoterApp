import React, { useRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const RoutingMap = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [instruction, setInstruction] = useState<string | null>(null); // Instrucción actual
  const [modalVisible, setModalVisible] = useState(false);
  const [routeEnded, setRouteEnded] = useState(false); // Estado para el final de la ruta
  const webViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const generateMapHTML = () => {
    if (!location) return '';

    const destinationLat = -11.999571;  // Coordenada de destino: ejemplo SENATI
    const destinationLng = -77.061828;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Routing Map</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
            #map { height: 100vh; width: 100vw; }
            .leaflet-routing-alt { display: none; }  /* Ocultar el panel de instrucciones */
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 14);

            // Cargar el mapa
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Añadir la ruta usando leaflet-routing-machine
            var control = L.Routing.control({
              waypoints: [
                L.latLng(${location.latitude}, ${location.longitude}),
                L.latLng(${destinationLat}, ${destinationLng})
              ],
              lineOptions: {
                styles: [{ color: 'purple', weight: 5 }]
              },
              routeWhileDragging: true,
              language: 'es',
            }).addTo(map);

            control.on('routesfound', function(e) {
              var instrIndex = 0;
              var instructions = e.routes[0].instructions;

              // Actualizar la instrucción cada 5 segundos
              setInterval(function() {
                if (instrIndex < instructions.length) {
                  var nextInstruction = instructions[instrIndex].text;
                  window.ReactNativeWebView.postMessage(nextInstruction);
                  instrIndex++;
                } else {
                  window.ReactNativeWebView.postMessage("Finalizar ruta");  // Indicar que la ruta ha terminado
                }
              }, 5000); 
            });
          </script>
        </body>
      </html>
    `;
  };

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === "Finalizar ruta") {
      setRouteEnded(true);  // Indicar que la ruta ha terminado
    } else {
      setInstruction(message);
      setModalVisible(true);
    }
  };

  const handleCancelRoute = () => {
    setRouteEnded(false);
    setModalVisible(false);
    // Aquí puedes agregar lógica para detener el seguimiento
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: generateMapHTML() }}
            style={styles.map}
            onMessage={handleMessage}
          />

          {/* Modal para mostrar instrucciones */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {instruction ? (
                  <Text style={styles.instructionText}>{instruction}</Text>
                ) : (
                  <Text style={styles.instructionText}>Esperando instrucción...</Text>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Botón de cancelar viaje */}
          {routeEnded ? (
            <View style={styles.cancelButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRoute}>
                <Text style={styles.cancelButtonText}>Cancelar Viaje</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      ) : (
        <Text>Cargando ubicación...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1D1D1D',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoutingMap;
