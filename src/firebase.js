import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth, initializeAuth, indexedDBLocalPersistence} from 'firebase/auth';
import {Capacitor} from '@capacitor/core';



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

console.log("Firebase Config:", JSON.stringify(firebaseConfig));
console.log("Firebase App Initialized:", JSON.stringify(app.name));

function whichAuth() {
  let auth;
  if (Capacitor.isNativePlatform()) {
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    auth = getAuth();
  }
  return auth;
}

export const auth = whichAuth();





