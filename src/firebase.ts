import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNr1z_KY6tfxCIXPuDkqsGFKnAa1OEw-s",
  authDomain: "bedhane-cosmetics-system.firebaseapp.com",
  projectId: "bedhane-cosmetics-system",
  storageBucket: "bedhane-cosmetics-system.firebasestorage.app",
  messagingSenderId: "475640113186",
  appId: "1:475640113186:web:bfbd7f1608cec399c1c27b",
  measurementId: "G-YC9978KPLV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
export const analyticsPromise = typeof window !== 'undefined' 
  ? isSupported().then(supported => supported ? getAnalytics(app) : null).catch(() => null)
  : Promise.resolve(null);
