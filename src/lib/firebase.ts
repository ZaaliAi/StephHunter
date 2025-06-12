
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3ARuMpwliCw7onj5d-CuE1aunp6ouAQg",
  authDomain: "stephanie-hunter.firebaseapp.com",
  projectId: "stephanie-hunter",
  storageBucket: "stephanie-hunter.firebasestorage.app",
  messagingSenderId: "714943100226",
  appId: "1:714943100226:web:85e28886cae8bd6af244db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };
