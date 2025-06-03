
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3ARuMpwliCw7onj5d-CuE1aunp6ouAQg",
  authDomain: "stephanie-hunter.firebaseapp.com",
  projectId: "stephanie-hunter",
  storageBucket: "stephanie-hunter.firebasestorage.app",
  messagingSenderId: "714943100226",
  appId: "1:714943100226:web:85e28886cae8bd6af244db"
  // measurementId is optional, so we can omit it if not provided or needed
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
