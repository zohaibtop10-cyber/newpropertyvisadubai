import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAP-oCkkrZSvrrkeK9z8nlTkiyqIXYENZ4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "propertyvisadubai-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "propertyvisadubai-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "propertyvisadubai-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "959687147450",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:959687147450:web:e59845719d500fa4f6e783",
  databaseURL: "https://propertyvisadubai-web-default-rtdb.firebaseio.com"
};

// Initialize Firebase App safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const firestore = getFirestore(app);

let authInstance: any;
try {
  authInstance = getAuth(app);
} catch (e) {
  console.warn("Firebase Auth init note:", e);
  authInstance = { onAuthStateChanged: (_cb: any) => () => {} };
}
export const auth = authInstance;

let storageInstance: any;
try {
  storageInstance = getStorage(app);
} catch (e) {
  console.warn("Firebase Storage init note:", e);
  storageInstance = {};
}
export const storage = storageInstance;
