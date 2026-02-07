import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ඔයාගේ Firebase Configuration එක
const firebaseConfig = {
  apiKey: "AIzaSyCDtSsH6QmzR_djd-BJiFYa-ErpSOYf7xs",
  authDomain: "user-manegment-system.firebaseapp.com",
  projectId: "user-manegment-system",
  storageBucket: "user-manegment-system.firebasestorage.app",
  messagingSenderId: "1072987069659",
  appId: "1:1072987069659:web:55376f944cc399f14500fe",
  measurementId: "G-SDR44WZ1ZJ"
};

// Firebase Initialize කිරීම
const app = initializeApp(firebaseConfig);

// අපිට අවශ්‍ය සේවාවන් Export කිරීම (එතකොට වෙනත් ෆයිල් වල පාවිච්චි කරන්න පුළුවන්)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;