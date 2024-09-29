import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWFxqBcty_vP4gXgegt7Eraf3B7OukL34",
  authDomain: "spotterapp-454ec.firebaseapp.com",
  projectId: "spotterapp-454ec",
  storageBucket: "spotterapp-454ec.appspot.com",
  messagingSenderId: "964483713206",
  appId: "1:964483713206:web:3887a52dfa80648adf7e17",
  measurementId: "G-3J19CNTP1T"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Auth con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };
