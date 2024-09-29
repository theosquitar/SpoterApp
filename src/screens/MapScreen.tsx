import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import ParkingModal from './ParkingModal';
import { collection, onSnapshot } from 'firebase/firestore'; // Importa onSnapshot para tiempo real
import { db } from '../../firebaseConfig';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface Estacionamiento {
  id: string;
  nombre: string;
  direccion: string;
  coordenadaX: number;
  coordenadaY: number;
  price?: string;
}

const MapScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [estacionamientos, setEstacionamientos] = useState<Estacionamiento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEstacionamiento, setSelectedEstacionamiento] = useState<Estacionamiento | null>(null);
  const [showRoute, setShowRoute] = useState<boolean>(false);
  const webViewRef = useRef<WebView | null>(null);

  // Obtener ubicación actual del usuario
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permiso denegado", "No se pudo obtener acceso a la ubicación.");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        const { latitude, longitude } = currentLocation.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la ubicación.");
      }
    })();
  }, []);

  // Obtener puntos de estacionamiento en tiempo real desde Firestore
  useEffect(() => {
    const estacionamientosCollection = collection(db, 'Estacionamiento');
    
    const unsubscribe = onSnapshot(estacionamientosCollection, (snapshot) => {
      const estacionamientosData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          nombre: data.Nombre,
          direccion: data.Direccion,
          coordenadaX: parseFloat(data.CoordenadaX),
          coordenadaY: parseFloat(data.CoordenadaY),
          price: data.price || 'N/A',
        };
      }) as Estacionamiento[];

      setEstacionamientos(estacionamientosData);
    }, (error) => {
      console.error("Error obteniendo estacionamientos: ", error);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  // Función para manejar selección de estacionamiento
  const handleMessage = (event: any) => {
    const estacionamientoId = event.nativeEvent.data;
    const estacionamiento = estacionamientos.find(est => est.id === estacionamientoId);
    if (estacionamiento) {
      setSelectedEstacionamiento(estacionamiento);
      setModalVisible(true);
    }
  };

  const generateMapHTML = () => {
    if (!location) return '';

    const estacionamientosMarkers = estacionamientos.map(est => {
      return `
        L.marker([${est.coordenadaX}, ${est.coordenadaY}], { icon: parkingIcon })
          .addTo(map)
          .bindPopup('<b>${est.nombre}</b><br>${est.direccion}<br><button id="select-${est.id}">Seleccionar</button>')
          .on('popupopen', function() {
            document.getElementById('select-${est.id}').onclick = function() {
              window.ReactNativeWebView.postMessage('${est.id}');
            };
          });
      `;
    }).join('');

    const routingScript = showRoute && selectedEstacionamiento
      ? `
        L.Routing.control({
          waypoints: [
            L.latLng(${location?.latitude}, ${location?.longitude}),
            L.latLng(${selectedEstacionamiento.coordenadaX}, ${selectedEstacionamiento.coordenadaY})
          ],
          lineOptions: { styles: [{ color: 'purple', weight: 5 }] },
          createMarker: function() { return null; } 
        }).addTo(map);
      `
      : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Parking Map</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
            #map { height: 100vh; width: 100vw; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map').setView([${location?.latitude}, ${location?.longitude}], 15);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
            var parkingIcon = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [30, 30] });
            var userIcon = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [30, 30] });

            L.marker([${location?.latitude}, ${location?.longitude}], { icon: userIcon }).addTo(map).bindPopup('Tu ubicación actual').openPopup();
            ${estacionamientosMarkers}
            ${routingScript}
          </script>
        </body>
      </html>
    `;
  };

  const handleRouteRequest = () => {
    setModalVisible(false);
    setShowRoute(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : location ? (
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: generateMapHTML() }}
          style={styles.webview}
          onMessage={handleMessage}
        />
      ) : (
        <Text style={styles.errorText}>Obteniendo tu ubicación...</Text>
      )}

      <ParkingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        estacionamiento={selectedEstacionamiento}
        onConfirm={handleRouteRequest}
      />

      {showRoute && (
        <View style={styles.floatingModal}>
          <Text style={styles.directionsText}>Sigue recto por 7 km</Text>
          <TouchableOpacity style={styles.finalizarButton} onPress={() => setShowRoute(false)}>
            <Text style={styles.finalizarButtonText}>Finalizar viaje</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#2E2E2E' 
  },
  webview: { 
    width: '100%', 
    height: '100%' 
  },
  floatingModal: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  directionsText: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  finalizarButton: { 
    marginTop: 10, 
    backgroundColor: '#FF6347', 
    padding: 10, 
    borderRadius: 5 
  },
  finalizarButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default MapScreen;
