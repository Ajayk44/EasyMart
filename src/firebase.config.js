import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDf4gUtLJS4OcUCWDu0FsDuFFybr9G586c",
  authDomain: "easymart-fa8b1.firebaseapp.com",
  projectId: "easymart-fa8b1",
  storageBucket: "easymart-fa8b1.appspot.com",
  messagingSenderId: "371743712565",
  appId: "1:371743712565:web:3d9bdfc232f1e9494f187c",
  measurementId: "G-ZEB1C827HT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
