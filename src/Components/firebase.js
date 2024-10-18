import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
  appId: process.env.REACT_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

console.log("Database URL:", process.env.REACT_APP_FIREBASE_DATABASE_URL);

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase Config:", firebaseConfig);
console.log("Database initialized:", database);

export const auth = getAuth(app);
export { database, ref, set, push, onValue, remove };

export default app;
