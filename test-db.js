import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAP-oCkkrZSvrrkeK9z8nlTkiyqIXYENZ4",
  authDomain: "propertyvisadubai-web.firebaseapp.com",
  projectId: "propertyvisadubai-web",
  storageBucket: "propertyvisadubai-web.firebasestorage.app",
  messagingSenderId: "959687147450",
  appId: "1:959687147450:web:e59845719d500fa4f6e783",
  databaseURL: "https://propertyvisadubai-web-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function testConnection() {
  const testRef = ref(db, 'system/test_connection');
  try {
    await set(testRef, {
      status: "SUCCESS",
      timestamp: Date.now()
    });
    console.log("Write successful!");
    
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
      console.log("Read successful! Data:", snapshot.val());
    } else {
      console.log("No data found after write.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
