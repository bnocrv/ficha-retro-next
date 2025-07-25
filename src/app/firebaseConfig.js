// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7nJQLCvji-C_TF-NwXYgnnrQX5oBl_X4",
  authDomain: "formulario-1036a.firebaseapp.com",
  projectId: "formulario-1036a",
  storageBucket: "formulario-1036a.appspot.com",  // Corrigido aqui
  messagingSenderId: "725203625130",
  appId: "1:725203625130:web:5e59138ae92446bbc51cd3",
  measurementId: "G-Q1KHL3M3S5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
