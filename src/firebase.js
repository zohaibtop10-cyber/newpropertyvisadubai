import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAP-oCkkrZSvrrkeK9z8nlTkiyqIXYENZ4",
  authDomain: "propertyvisadubai-web.firebaseapp.com",
  projectId: "propertyvisadubai-web",
  storageBucket: "propertyvisadubai-web.firebasestorage.app",
  messagingSenderId: "959687147450",
  appId: "1:959687147450:web:e59845719d500fa4f6e783",
  measurementId: "G-DN1ZMS4GP9",
  databaseURL: "https://propertyvisadubai-web-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Analytics is only available in browser environments
// export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
