import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAlJvN2v-PLfKQeSXQO1FPp4j98BAlKbg",
  authDomain: "homemade-a724b.firebaseapp.com",
  projectId: "homemade-a724b",
  storageBucket: "homemade-a724b.appspot.com",
  messagingSenderId: "1077004511519",
  appId: "1:1077004511519:web:841051ace5339dbad4682a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();