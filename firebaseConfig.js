import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const db = getFirestore(app);

export { db };
