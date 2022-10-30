// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getApps } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function init() {
  if (getApps().length > 1) {
    const [app] = getApps();
    return { app, database: getFirestore(app) };
  }

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const functions = getFunctions(app);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(database, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
  }

  return { app, database };
}

const { database, app } = init();

export { database, app };
